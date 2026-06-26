// 자료 폴더의 섞인 확장자를 미리보기 가능하게 일괄 변환.
//  - 영상(mov/mp4/m4v/webm/mkv/avi/3gp) → mp4 (H.264, 회전 자동보정, 최대 1920)
//  - 사진(heic/heif/jpg/jpeg/png/webp/tif) → jpg (EXIF 회전 보정)
//  - 결과는 <폴더>/변환/ 에 모음. (한글 경로 회피 위해 경로는 이 파일 안에 둠)
// 사용법: node scripts/convert-assets.mjs

import { spawn } from 'node:child_process';
import { readdirSync, mkdirSync, statSync, existsSync } from 'node:fs';
import { join, extname, basename, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import ffmpegPath from 'ffmpeg-static';
import sharp from 'sharp';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'materials');
const OUT = join(SRC, 'converted');
const VIDEO = new Set(['.mov', '.mp4', '.m4v', '.webm', '.mkv', '.avi', '.3gp']);
const IMAGE = new Set(['.heic', '.heif', '.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff']);

mkdirSync(OUT, { recursive: true });
const files = readdirSync(SRC).filter((f) => {
  try { return statSync(join(SRC, f)).isFile(); } catch { return false; }
});

function runFfmpeg(args) {
  return new Promise((res) => {
    const p = spawn(ffmpegPath, args, { stdio: ['ignore', 'ignore', 'ignore'] });
    p.on('close', (c) => res(c));
  });
}

let okV = 0, okI = 0, skip = 0, fail = [];
for (const f of files) {
  const ext = extname(f).toLowerCase();
  const base = basename(f, extname(f));
  const inPath = join(SRC, f);
  const outExt = VIDEO.has(ext) ? '.mp4' : IMAGE.has(ext) ? '.jpg' : null;
  if (outExt && existsSync(join(OUT, base + outExt))) { skip++; continue; } // 이미 변환됨 → 건너뜀
  try {
    if (VIDEO.has(ext)) {
      const out = join(OUT, base + '.mp4');
      const code = await runFfmpeg([
        '-y', '-i', inPath,
        '-vf', "scale='min(1920,iw)':'min(1920,ih)':force_original_aspect_ratio=decrease",
        '-c:v', 'libx264', '-crf', '21', '-preset', 'veryfast', '-pix_fmt', 'yuv420p',
        '-movflags', '+faststart', '-c:a', 'aac', '-b:a', '128k', out,
      ]);
      if (code === 0) { okV++; console.log('🎬', f, '→', base + '.mp4'); }
      else fail.push(f + ' (ffmpeg code ' + code + ')');
    } else if (IMAGE.has(ext)) {
      const out = join(OUT, base + '.jpg');
      await sharp(inPath).rotate().jpeg({ quality: 90 }).toFile(out);
      okI++; console.log('🖼️ ', f, '→', base + '.jpg');
    }
  } catch (e) {
    fail.push(f + ' (' + e.message + ')');
  }
}
console.log(`\n✅ 영상 ${okV} / 사진 ${okI} 변환, ${skip}개 건너뜀(이미 변환됨) → ${OUT}`);
if (fail.length) console.log('❌ 실패:\n  ' + fail.join('\n  '));
