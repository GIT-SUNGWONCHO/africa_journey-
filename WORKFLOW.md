# 🔄 집 ↔ 회사 작업 동기화 가이드

코드·사진·영상 모두 GitHub로 동기화한다. **영상(mp4)은 Git LFS로 관리**된다.

## 처음 한 번만 (각 PC에서)
1. **Node.js LTS** 설치 (https://nodejs.org)
2. **Git** + **Git LFS** 설치 (https://git-scm.com , https://git-lfs.com)
   - 설치 후 한 번: `git lfs install`
3. 저장소 받기:
   ```bash
   git clone <저장소 주소>
   cd africa_journey
   npm install
   ```

## 매일 작업 흐름
**작업 시작할 때 (받기):**
```bash
git pull
```
> 영상까지 자동으로 최신화됨 (LFS).

**작업하기:**
```bash
npm run dev      # http://localhost:4321 에서 미리보기
```
- 사진: `src/assets/hero/` 에 넣기 (히어로 슬라이드쇼 자동 반영)
- 스토리 영상: `public/assets/stories/` 에 넣고 압축/구간추출 → `src/data/stories.ts` 작성
  - 압축+크롭: `node scripts/compress-story.mjs <영상> 1280 26 1.0 0.065 0.15`
  - 구간추출: `node scripts/story-segments.mjs <영상>`
- 글/꿀팁/일정/견적: `src/data/`, `src/content/tips/` 수정

**작업 끝낼 때 (올리기):**
```bash
git add -A
git commit -m "오늘 한 일 요약"
git push
```

## 주의
- **영상 원본(폰 화면녹화 raw)은 `media-raw/` 에** 두기 → git에 안 올라감(용량 큼). 압축본(`*-web.mp4`)만 `public/assets/stories/`에 두고 동기화.
- LFS 무료 용량은 1GB. 영상이 많아지면 한도 초과될 수 있음 → 그때 데이터팩($5/50GB) 또는 영상 CDN(Cloudflare Stream)으로 이전.
- `node_modules`, `dist`, `.astro` 는 동기화 안 됨(각 PC에서 `npm install`/빌드로 생성).
