// 하이라이트 화면녹화 영상을 웹용으로 압축한다.
//  - 해상도 축소(기본 높이 1280), H.264, faststart(즉시 재생), 잦은 키프레임(빠른 구간 점프)
//  - 결과: 같은 폴더에 <이름>-web.mp4
//
// 사용법:
//   node scripts/compress-story.mjs <영상경로> [최대높이=1280] [crf=26] [시작초=0]
//   예) node scripts/compress-story.mjs public/assets/stories/test.mp4
//   예) node scripts/compress-story.mjs public/assets/stories/test.mp4 1280 26 1.0   ← 앞 1초 잘라내고

import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, basename, extname, join } from 'node:path';
import ffmpegPath from 'ffmpeg-static';

const input = process.argv[2];
const maxH = Number(process.argv[3] ?? 1280);
const crf = Number(process.argv[4] ?? 26);
const startSec = Number(process.argv[5] ?? 0); // 하이라이트 여는 애니메이션 등 앞부분 잘라내기
const cropTop = Number(process.argv[6] ?? 0); // 상단 잘라낼 비율(0~1). 폰 상태바/인스타 진행바 제거용
const cropBot = Number(process.argv[7] ?? 0); // 하단 잘라낼 비율(0~1). 인스타 하단 바 제거용

if (!input || !existsSync(input)) {
  console.error('❌ 영상 경로 확인. 예: node scripts/compress-story.mjs public/assets/stories/test.mp4');
  process.exit(1);
}

const cropFilter = (cropTop > 0 || cropBot > 0)
  ? `crop=in_w:in_h*(1-${cropTop}-${cropBot}):0:in_h*${cropTop},`
  : '';

const out = join(dirname(input), basename(input, extname(input)) + '-web.mp4');
const args = [
  '-y',
  ...(startSec > 0 ? ['-ss', String(startSec)] : []),
  '-i', input,
  '-vf', `${cropFilter}scale=-2:'min(${maxH},ih)'`,
  '-c:v', 'libx264', '-crf', String(crf), '-preset', 'veryfast',
  '-profile:v', 'high', '-pix_fmt', 'yuv420p',
  '-g', '30', '-keyint_min', '30',          // 잦은 키프레임 → 구간 점프 빠름
  '-movflags', '+faststart',                 // moov 앞으로 → 즉시 재생/seek
  '-c:a', 'aac', '-b:a', '128k',
  out,
];

console.log(`🎬 압축 시작: ${input}\n   → ${out}  (높이≤${maxH}, crf ${crf})\n`);
const ff = spawn(ffmpegPath, args, { stdio: ['ignore', 'inherit', 'inherit'] });
ff.on('close', (code) => {
  if (code === 0) console.log(`\n✅ 완료 → ${out}`);
  else console.error(`\n❌ 실패 (code ${code})`);
});
