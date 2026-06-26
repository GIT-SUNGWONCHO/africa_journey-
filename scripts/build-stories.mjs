// 원본 하이라이트 영상 4개를 "스토리 5개"로 자르고 이어붙여 압축.
//  - 스토리가 여러 원본에 걸쳐 있어도 구간을 잘라 concat
//  - 상/하단 불필요 영역 크롭(상 6.5% / 하 15%), 720~1080 세로, H.264 압축
//  - 결과: materials/stories-out/storyN.mp4  (→ R2 업로드용)
//
// 준비: materials/stories-raw/ 에 원본을 1,2,3,4 로 넣기 (.mp4 또는 .mov)
// 실행: node scripts/build-stories.mjs

import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import ffmpegPath from 'ffmpeg-static';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'materials/stories-raw');
const OUT = join(ROOT, 'materials/stories-out');
const CROP_TOP = 0.065, CROP_BOT = 0.15, MAXH = 1080, CRF = 28;

// 원본 파일 경로 찾기 (1.mp4 또는 1.mov ...)
function srcPath(n) {
  for (const ext of ['.mp4', '.mov', '.MOV', '.MP4']) {
    const p = join(SRC, n + ext);
    if (existsSync(p)) return p;
  }
  return null;
}

// 스토리 정의 — { 출력파일, 구간[ {v:원본번호, ss:시작초, to:끝초(없으면 끝까지)} ] }
// 시간(초): 1:59=119, 8:20=500, 14:31=871, 3:25=205
const STORIES = [
  { file: 'story1.mp4', title: '탄자니아 도착 & 쳄카온천', segs: [{ v: 1, ss: 0, to: 119 }] },
  { file: 'story2.mp4', title: '세렝게티', segs: [{ v: 1, ss: 119 }, { v: 2, ss: 0, to: 500 }] },
  { file: 'story3.mp4', title: '응고롱고로', segs: [{ v: 2, ss: 500, to: 871 }] },
  { file: 'story4.mp4', title: '스톤타운', segs: [{ v: 2, ss: 871 }, { v: 3, ss: 0, to: 205 }] },
  { file: 'story5.mp4', title: '능위 & 파제', segs: [{ v: 3, ss: 205 }, { v: 4, ss: 0 }] },
];

function run(args) {
  return new Promise((res) => { spawn(ffmpegPath, args, { stdio: ['ignore', 'inherit', 'inherit'] }).on('close', res); });
}

if (!existsSync(SRC)) { console.error(`❌ ${SRC} 없음. 원본을 1~4로 넣어줘.`); process.exit(1); }
mkdirSync(OUT, { recursive: true });

const cropH = `in_h*${(1 - CROP_TOP - CROP_BOT).toFixed(3)}`;
const vf = `crop=in_w:${cropH}:0:in_h*${CROP_TOP},scale=-2:'min(${MAXH},ih)',fps=30,setsar=1,format=yuv420p`;

for (const s of STORIES) {
  // 입력 인자 + 필터 구성
  const inputs = [];
  let fc = '';
  let missing = false;
  s.segs.forEach((seg, i) => {
    const p = srcPath(seg.v);
    if (!p) { missing = true; return; }
    inputs.push('-ss', String(seg.ss));
    if (seg.to != null) inputs.push('-t', String(seg.to - seg.ss));
    inputs.push('-i', p);
    fc += `[${i}:v]${vf}[v${i}];`;
  });
  if (missing) { console.log(`⏭️  ${s.file} 건너뜀 (원본 없음)`); continue; }
  const labels = s.segs.map((_, i) => `[v${i}]`).join('');
  fc += `${labels}concat=n=${s.segs.length}:v=1:a=0[vout]`;

  const out = join(OUT, s.file);
  console.log(`\n🎬 ${s.file}  (${s.title})  구간 ${s.segs.length}개`);
  const code = await run([
    '-y', ...inputs, '-filter_complex', fc, '-map', '[vout]', '-an',
    '-c:v', 'libx264', '-crf', String(CRF), '-preset', 'veryfast',
    '-movflags', '+faststart', out,
  ]);
  console.log(code === 0 ? `✅ ${s.file}` : `❌ ${s.file} 실패(code ${code})`);
}
console.log(`\n완료 → ${OUT}\n다음: 구간 자동추출(story-segments) → R2 업로드 → stories.ts 연결`);
