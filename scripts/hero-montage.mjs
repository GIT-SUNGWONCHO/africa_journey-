// 히어로용 시네마틱 몽타주 생성.
//  - media-raw/hero/ 의 mp4들을 파일명 순으로 이어붙임
//  - 가로/세로 섞여도 "블러 배경 채우기"로 1920x1080 꽉 채움 (내용 안 잘림)
//  - 크로스페이드 전환, 무음, 웹최적화(faststart)
//  - 결과: src/assets/hero-media/hero.mp4 (HeroVideo가 자동 사용)
//
// 사용법: node scripts/hero-montage.mjs [클립길이=3.2] [크로스페이드=0.6] [시작trim=0.2] [반시계90회전할파일들=쉼표구분]
//   예) node scripts/hero-montage.mjs 3.2 0.6 0.2 1.mp4,2.mp4,4.mp4

import { spawn } from 'node:child_process';
import { readdirSync, mkdirSync, existsSync } from 'node:fs';
import ffmpegPath from 'ffmpeg-static';

const SRC = 'media-raw/hero';
const OUT_DIR = 'src/assets/hero-media';
const OUT = `${OUT_DIR}/hero.mp4`;
const D = Number(process.argv[2] ?? 3.2);   // 클립당 노출 길이
const X = Number(process.argv[3] ?? 0.6);   // 크로스페이드 길이
const ST = Number(process.argv[4] ?? 0.2);  // 각 클립 앞 trim
const ROT = (process.argv[5] ?? '').split(',').map((s) => s.trim()).filter(Boolean); // 반시계 90도 회전할 파일명

if (!existsSync(SRC)) { console.error(`❌ ${SRC} 없음`); process.exit(1); }
const files = readdirSync(SRC)
  .filter((f) => /\.(mp4|webm|mov)$/i.test(f))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true })); // 1,2,…,10 숫자순
if (!files.length) { console.error(`❌ ${SRC} 에 영상 없음`); process.exit(1); }
mkdirSync(OUT_DIR, { recursive: true });

const W = 1280, H = 720, FPS = 30;
const inputs = files.flatMap((f) => ['-i', `${SRC}/${f}`]);

// 각 클립: 앞 trim → 블러배경 채우기 → 1920x1080/30fps 정규화
let fc = '';
files.forEach((f, i) => {
  const rot = ROT.includes(f) ? 'transpose=2,' : ''; // transpose=2 = 반시계 90도
  fc +=
    `[${i}:v]${rot}trim=${ST}:${ST + D},setpts=PTS-STARTPTS,split=2[b${i}][f${i}];` +
    `[b${i}]scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},gblur=sigma=22,eq=brightness=-0.06[bb${i}];` +
    `[f${i}]scale=${W}:${H}:force_original_aspect_ratio=decrease[ff${i}];` +
    `[bb${i}][ff${i}]overlay=(W-w)/2:(H-h)/2,setsar=1,fps=${FPS},format=yuv420p[v${i}];`;
});

// 크로스페이드 체인
let last = 'v0';
if (files.length === 1) {
  fc += `[v0]fade=t=in:st=0:d=0.5[vout];`;
} else {
  for (let k = 1; k < files.length; k++) {
    const off = (k * (D - X)).toFixed(3);
    const out = k === files.length - 1 ? 'vx' : `x${k}`;
    fc += `[${last}][v${k}]xfade=transition=fade:duration=${X}:offset=${off}[${out}];`;
    last = out;
  }
  fc += `[vx]fade=t=in:st=0:d=0.5[vout];`;
}

const args = [
  '-y', ...inputs,
  '-filter_complex', fc,
  '-map', '[vout]', '-an',
  '-c:v', 'libx264', '-crf', '27', '-preset', 'veryfast',
  '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-r', String(FPS),
  OUT,
];

console.log(`🎬 몽타주: ${files.join(', ')}\n   클립 ${D}s · 페이드 ${X}s → ${OUT}\n`);
const ff = spawn(ffmpegPath, args, { stdio: ['ignore', 'inherit', 'inherit'] });
ff.on('close', (c) => console.log(c === 0 ? `\n✅ 완료 → ${OUT}` : `\n❌ 실패 (code ${c})`));
