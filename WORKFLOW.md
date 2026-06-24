# 🔄 집 ↔ 회사 작업 동기화 가이드

코드·사진·영상 모두 GitHub로 동기화한다. **영상은 일반 git 파일**로 커밋된다(LFS 사용 안 함 — Vercel 배포 호환 때문). 100MB 미만이면 그대로 push OK.

## 처음 한 번만 (각 PC에서)
1. **Node.js LTS** 설치 (https://nodejs.org)
2. **Git** 설치 (https://git-scm.com)  *(Git LFS는 이제 필요 없음)*
3. 저장소 받기:
   ```bash
   git clone https://github.com/GIT-SUNGWONCHO/africa_journey-.git
   cd africa_journey-
   npm install
   ```
4. VSCode로 폴더 열고 Claude 실행 → `CLAUDE.md` 자동으로 읽고 맥락 이어받음.

## 매일 작업 흐름
**시작 (받기):** `git pull`
**작업:** `npm run dev` (http://localhost:4321 미리보기)
- 히어로 영상: 클립을 `media-raw/hero/`에 (파일명 순) → `node scripts/hero-montage.mjs` → `src/assets/hero-media/hero.mp4`
- ABOUT 사진: `src/assets/about/` 에 사진 한 장
- 지도 이미지: `src/assets/map/` (없으면 SVG 폴백)
- 스토리 영상: `public/assets/stories/`에 넣고 `compress-story.mjs` → `story-segments.mjs` → `src/data/stories.ts`
- 글/카피/핀: `src/data/`(magazine.ts, places.ts, stories.ts 등)
**끝 (올리기):** `git add -A && git commit -m "..." && git push` → **Vercel이 자동 배포**

## 주의
- **영상 원본(raw)은 `media-raw/`** 에 (gitignore, 동기화 안 됨). 압축/몽타주 결과물만 커밋.
- 영상이 많아져 repo가 무거워지면 → 영상만 **CDN(Cloudflare Stream 등)** 으로 이전.
- `node_modules`, `dist`, `.astro` 는 동기화 안 됨(각 PC에서 `npm install`/빌드로 생성).
- 배포는 **push 하면 Vercel 자동** — 따로 할 것 없음.
