// 하이라이트 화면녹화 영상에서 "스토리가 바뀌는 컷"을 자동 감지해 구간 시작시간(t)을 뽑는다.
//
// 사용법:
//   node scripts/story-segments.mjs <영상경로> [임계값 0~1, 기본 0.35]
//   예) node scripts/story-segments.mjs public/assets/stories/serengeti.mp4
//
// 출력: stories.ts 에 붙여넣을 segments 스켈레톤(t 채워진) + 감지된 컷 개수.
// 임계값을 낮추면 더 잘게(컷 많이), 높이면 더 굵게 감지.

import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import ffmpegPath from 'ffmpeg-static';

const input = process.argv[2];
const threshold = Number(process.argv[3] ?? 0.35);

if (!input || !existsSync(input)) {
  console.error('❌ 영상 경로를 확인하세요. 예: node scripts/story-segments.mjs public/assets/stories/serengeti.mp4');
  process.exit(1);
}

const args = ['-i', input, '-vf', `select='gt(scene,${threshold})',showinfo`, '-an', '-f', 'null', '-'];
const ff = spawn(ffmpegPath, args);

let buf = '';
ff.stderr.on('data', (d) => (buf += d.toString()));

ff.on('close', () => {
  // showinfo 가 출력하는 각 선택 프레임의 pts_time = 컷 지점
  const times = [...buf.matchAll(/pts_time:([\d.]+)/g)].map((m) => Number(m[1]));
  // 0초 시작 + 너무 가까운 컷(0.4초 미만 간격) 병합
  const cuts = [0];
  for (const t of times) {
    if (t - cuts[cuts.length - 1] > 0.4) cuts.push(Number(t.toFixed(2)));
  }

  console.log(`\n✅ 감지된 구간(스토리) 수: ${cuts.length}  (임계값 ${threshold})`);
  console.log('   너무 많/적으면 임계값 조절: 예) node scripts/story-segments.mjs <영상> 0.5\n');
  console.log('── stories.ts 의 해당 reel.segments 에 붙여넣기 ──\n');
  const lines = cuts.map(
    (t) => `      { t: ${t}, sticker: '', caption: '' },`
  );
  console.log('    segments: [\n' + lines.join('\n') + '\n    ],');
  console.log('\n(각 구간의 sticker/caption 은 그때 스토리 문구로 채우면 됩니다.)');
});
