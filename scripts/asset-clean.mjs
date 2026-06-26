// 이미 프로젝트에 쓴 자료를 materials staging 에서 정리.
//  - src/assets/{places,about} 에 들어간 파일과 "내용(크기)이 같은" converted 파일 삭제
//  - 그리고 그 원본(raw, 같은 이름) 도 materials/ 에서 삭제
//  → materials/converted 에는 "아직 안 쓴 것만" 남음.
// 사용법: node scripts/asset-clean.mjs

import { readdirSync, statSync, existsSync, rmSync } from 'node:fs';
import { join, extname, basename, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const MAT = join(ROOT, 'materials');
const CONV = join(MAT, 'converted');
const USED_DIRS = [join(ROOT, 'src/assets/places'), join(ROOT, 'src/assets/about')];

if (!existsSync(CONV)) { console.log('converted 폴더 없음 — 할 것 없음'); process.exit(0); }

// 이미 쓴 파일들의 크기 집합
const usedSizes = new Map();
for (const d of USED_DIRS) {
  if (!existsSync(d)) continue;
  for (const f of readdirSync(d)) {
    if (/\.(jpg|jpeg|png|webp|mp4)$/i.test(f)) {
      try { usedSizes.set(statSync(join(d, f)).size, f); } catch {}
    }
  }
}

const rawFiles = readdirSync(MAT).filter((r) => r !== 'converted');
const removed = [];
for (const f of readdirSync(CONV)) {
  let sz; try { sz = statSync(join(CONV, f)).size; } catch { continue; }
  if (!usedSizes.has(sz)) continue;
  const base = basename(f, extname(f));
  rmSync(join(CONV, f), { force: true });
  removed.push(`converted/${f}  (사용됨: ${usedSizes.get(sz)})`);
  // 같은 이름의 raw 원본도 삭제
  for (const r of rawFiles) {
    if (basename(r, extname(r)) === base) {
      try { rmSync(join(MAT, r), { force: true }); removed.push(`  └ raw ${r}`); } catch {}
    }
  }
}

console.log(`🧹 정리: ${removed.length}개 삭제`);
removed.forEach((x) => console.log('  -', x));
console.log(`📁 남은 converted(미사용): ${readdirSync(CONV).length}개`);
