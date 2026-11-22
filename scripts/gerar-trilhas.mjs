// Compõe as trilhas dos Reels (originais, geradas por código: sem direitos de terceiros).
// Uso: node scripts/gerar-trilhas.mjs  (precisa do ffmpeg no PATH ou em FFMPEG)
// Saída: src/assets/audio/trilha-<n>.m4a, ~15 s cada, 96 BPM, estilo pop leve.
import { writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';

const SR = 44100, DUR = 15.5, BPM = 96, BEAT = 60 / BPM, BAR = BEAT * 4;
const N = Math.floor(SR * DUR);
const ffmpeg = process.env.FFMPEG || 'ffmpeg';
const out = join(process.cwd(), 'src/assets/audio');
mkdirSync(out, { recursive: true });

const nota = (n) => 440 * 2 ** ((n - 69) / 12); // MIDI -> Hz
// Progressões (MIDI das notas do acorde). Cada uma vira uma trilha.
const trilhas = [
  { nome: 'trilha-1', acordes: [[48, 52, 55, 59], [45, 48, 52, 55], [41, 45, 48, 52], [43, 47, 50, 52]] }, // Cmaj7 Am7 Fmaj7 G6
  { nome: 'trilha-2', acordes: [[45, 48, 52, 55], [41, 45, 48, 52], [48, 52, 55, 59], [43, 47, 50, 55]] }, // Am7 Fmaj7 Cmaj7 G
  { nome: 'trilha-3', acordes: [[50, 53, 57, 60], [43, 47, 50, 53], [48, 52, 55, 59], [45, 48, 52, 55]] }, // Dm7 G7 Cmaj7 Am7
];

let semente = 7;
const ruido = () => { semente = (semente * 1103515245 + 12345) & 0x7fffffff; return semente / 0x3fffffff - 1; };

function render({ acordes }) {
  const L = new Float32Array(N), R = new Float32Array(N);
  const add = (buf, i, v) => { if (i >= 0 && i < N) buf[i] += v; };
  const acordeEm = (t) => acordes[Math.floor(t / BAR) % acordes.length];

  // Pad: notas do acorde com ataque lento, levemente desafinadas entre os canais.
  for (let i = 0; i < N; i++) {
    const t = i / SR, ac = acordeEm(t), tb = t % BAR;
    const env = Math.min(1, tb / 0.35) * (0.75 + 0.25 * Math.cos((tb / BAR) * Math.PI));
    let l = 0, r = 0;
    for (const n of ac) {
      const f = nota(n + 12);
      l += Math.sin(2 * Math.PI * f * 1.002 * t) + 0.25 * Math.sin(4 * Math.PI * f * t);
      r += Math.sin(2 * Math.PI * f * 0.998 * t) + 0.25 * Math.sin(4 * Math.PI * f * t);
    }
    L[i] += 0.035 * env * l; R[i] += 0.035 * env * r;
  }

  // Arpejo em colcheias com corda dedilhada (Karplus-Strong).
  const passo = BEAT / 2;
  for (let k = 0; k * passo < DUR - 0.2; k++) {
    const t0 = k * passo, ac = acordeEm(t0), n = ac[[0, 2, 1, 3, 2, 1, 3, 2][k % 8]] + 24;
    const per = Math.round(SR / nota(n)), linha = Float32Array.from({ length: per }, () => ruido() * 0.5);
    const i0 = Math.floor(t0 * SR), len = Math.floor(SR * 1.2), pan = k % 2 ? 0.7 : 1;
    let p = 0, prev = 0;
    for (let j = 0; j < len; j++) {
      const v = linha[p]; const novo = 0.996 * 0.5 * (v + prev); prev = v; linha[p] = novo; p = (p + 1) % per;
      add(L, i0 + j, 0.22 * v * pan); add(R, i0 + j, 0.22 * v * (1.7 - pan));
    }
  }

  // Baixo: fundamental em semínimas, com decaimento.
  for (let k = 0; k * BEAT < DUR; k++) {
    const t0 = k * BEAT, f = nota(acordeEm(t0)[0] - 12), i0 = Math.floor(t0 * SR);
    for (let j = 0; j < SR * BEAT; j++) {
      const tt = j / SR, v = 0.16 * Math.sin(2 * Math.PI * f * tt) * Math.exp(-tt * 3.2) * Math.min(1, tt / 0.01);
      add(L, i0 + j, v); add(R, i0 + j, v);
    }
  }

  // Bateria leve: bumbo nos tempos 1 e 3, palma no 2 e 4, chimbal nos contratempos (entra no 2º compasso).
  for (let k = 0; k * BEAT < DUR; k++) {
    const t0 = k * BEAT, i0 = Math.floor(t0 * SR), tempo = k % 4;
    if (tempo === 0 || tempo === 2) {
      let fase = 0;
      for (let j = 0; j < SR * 0.35; j++) {
        const tt = j / SR, f = 50 + 70 * Math.exp(-tt * 30); fase += (2 * Math.PI * f) / SR;
        const v = 0.42 * Math.sin(fase) * Math.exp(-tt * 9); add(L, i0 + j, v); add(R, i0 + j, v);
      }
    }
    if (t0 >= BAR && (tempo === 1 || tempo === 3)) {
      let lp = 0;
      for (let j = 0; j < SR * 0.18; j++) {
        const tt = j / SR, x = ruido(); lp += 0.35 * (x - lp);
        const v = 0.12 * (x - lp) * Math.exp(-tt * 22); add(L, i0 + j, v); add(R, i0 + j, v);
      }
    }
    if (t0 >= BAR) {
      const ih = Math.floor((t0 + BEAT / 2) * SR); let prev = 0;
      for (let j = 0; j < SR * 0.05; j++) {
        const x = ruido(), hp = x - prev; prev = x;
        const v = 0.035 * hp * Math.exp(-(j / SR) * 80); add(L, ih + j, v * 0.8); add(R, ih + j, v);
      }
    }
  }

  // Reverb simples (ecos com realimentação) e masterização.
  for (const [buf, atrasos] of [[L, [0.031, 0.047, 0.061]], [R, [0.037, 0.053, 0.067]]]) {
    const seco = Float32Array.from(buf);
    for (const a of atrasos) {
      const d = Math.floor(a * SR), eco = new Float32Array(N);
      for (let i = d; i < N; i++) eco[i] = seco[i - d] + 0.55 * eco[i - d];
      for (let i = 0; i < N; i++) buf[i] += 0.12 * eco[i];
    }
  }
  let pico = 0;
  for (let i = 0; i < N; i++) pico = Math.max(pico, Math.abs(L[i]), Math.abs(R[i]));
  const ganho = 0.85 / pico, fadeIn = SR * 0.15, fadeOut = SR * 1.8;
  const pcm = Buffer.alloc(N * 4);
  for (let i = 0; i < N; i++) {
    const f = Math.min(1, i / fadeIn, (N - i) / fadeOut);
    const s = (x) => Math.max(-1, Math.min(1, Math.tanh(x * ganho * 1.1) * f));
    pcm.writeInt16LE(Math.round(s(L[i]) * 32767), i * 4);
    pcm.writeInt16LE(Math.round(s(R[i]) * 32767), i * 4 + 2);
  }
  return pcm;
}

function wav(pcm) {
  const h = Buffer.alloc(44);
  h.write('RIFF', 0); h.writeUInt32LE(36 + pcm.length, 4); h.write('WAVE', 8); h.write('fmt ', 12);
  h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(2, 22); h.writeUInt32LE(SR, 24);
  h.writeUInt32LE(SR * 4, 28); h.writeUInt16LE(4, 32); h.writeUInt16LE(16, 34); h.write('data', 36); h.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([h, pcm]);
}

for (const t of trilhas) {
  const tmp = join(out, `${t.nome}.wav`);
  writeFileSync(tmp, wav(render(t)));
  const r = spawnSync(ffmpeg, ['-y', '-loglevel', 'error', '-i', tmp, '-c:a', 'aac', '-b:a', '128k', join(out, `${t.nome}.m4a`)], { encoding: 'utf8' });
  rmSync(tmp);
  if (r.status !== 0) throw new Error(r.stderr);
  console.log('ok', t.nome);
}
