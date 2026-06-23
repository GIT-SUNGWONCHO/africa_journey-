# CLAUDE.md — 탄자니아 여행 후기 사이트

> 이 파일을 먼저 읽고 작업을 이어가세요. 프로젝트 맥락·규칙·다음 할 일이 들어있습니다.
> (집↔회사 두 PC에서 작업하므로 맥락은 이 저장소 안에 둡니다.)

## 프로젝트
- 탄자니아(세렝게티 + 잔지바르) 신혼여행 후기 **웹 쇼케이스**.
- **확정 방향**: 지인에게 "와 가보고 싶다" 흥미를 유발하는 **스토리/사진 중심 웹**.
  (정보 꿀팁을 PDF로 판매하는 안은 **보류**. 단, 나중에 같은 콘텐츠에서 스토리 빼고 PDF로 뽑을 수 있게 데이터는 모듈식 유지.)
- 장기 비전: 트리플 같은 여행 커뮤니티/앱으로 확장 여지 (지금은 단일 페이지).

## 톤 / 디자인 규칙 (중요 — 어기지 말 것)
- **힙하게.** 인스타 스토리 / 브이로그 감성. 공감·공유되는 느낌.
- ❌ 친절한 제목·설명·서사 카피 금지: "~에서 ~까지", "백 마디보다 사진 한 장", "스토리로 보는 OO" 같은 아재틱 카피 X.
- **콘텐츠(사진·영상)가 바로 나오게.** 라벨/설명 최소화.
- 팔레트·폰트는 `src/styles/tokens.css` 한 곳에서 관리 (세렝게티 골드 + 잔지바르 틸).

## 실행
- Node LTS + npm 필요. `npm install` 후:
  - `npm run dev` → http://localhost:4321
  - `npm run build` (검증), `npm run preview`
- ⚠️ 회사 PC는 node가 PATH에 없어 PowerShell에서 `$env:Path = "C:\Program Files\nodejs;" + $env:Path` 선행 필요. **집 PC는 보통 그냥 `npm`이 됨.**
- 영상 처리용 **ffmpeg는 `ffmpeg-static`(devDependency)** 로 자동 — 시스템 설치 불필요.

## 폴더 구조
- `src/pages/index.astro` — 메인 페이지 (모든 섹션 조립)
- `src/components/HeroMosaic.astro` — 히어로 "킬러 미디어 월"(모자이크)
- `src/components/StoryGallery.astro` — 인스타식 스토리 뷰어
  - ⚠️ **`<style is:global>` 필수**: 영상/프로그레스바/캡션이 JS로 동적 삽입돼서 Astro 스코프 CSS가 안 먹음.
  - 박스 비율은 영상 실제 비율로 JS가 맞춤(잘림 방지).
- `src/components/Nav.astro`, `src/layouts/BaseLayout.astro`
- `src/styles/tokens.css`(색·폰트), `global.css`
- `src/data/`
  - `hero.ts` — 히어로 모자이크 타일 `featured[]`
  - `stories.ts` — 스토리 하이라이트 `reels[]`
  - `magazine.ts` — 왜/뭘하나/일정 섹션 콘텐츠
  - `itinerary.ts` `costs.ts` `summary.ts` `gallery.ts` — **현재 페이지에서 미사용(보존)**. 상세 일정/견적 되살릴 때 사용.
- `src/content/tips/*.md` + `content.config.ts` — 꿀팁(현재 페이지 미렌더, 보존)
- `public/assets/hero-media/` — 히어로 사진/영상 넣는 곳
- `public/assets/stories/` — 스토리 영상 압축본(`*-web.mp4`, Git LFS)
- `media-raw/` — 영상 원본 (gitignore, 동기화 안 됨)
- `scripts/` — `compress-story.mjs`, `story-segments.mjs`

## 히어로 모자이크 채우는 법
1. 사진/영상을 `public/assets/hero-media/` 에 넣기 (가로/세로/영상 섞여도 OK, 영상은 자동재생·무음·루프)
2. `src/data/hero.ts` 의 각 타일 `src` 채우기 + `span` 으로 크기: `big`(대표) / `wide`(가로) / `tall`(세로) / `sq`
3. 꼽아둔 킬러 컷: 사자가 누 사냥 영상 / 누떼 이동 / 광활한 초원 / 버팔로(빅5) / 레게머리 인증샷 / 잔지바르 플스방 승리 영상

## 스토리 영상 파이프라인
1. 인스타 하이라이트를 처음~끝 **화면 녹화** (스티커·문구 그대로)
2. 압축+크롭: `node scripts/compress-story.mjs <영상> 1280 26 1.0 0.065 0.15`
   - 검증된 값: 앞 1초(여는 애니) 트림, 상단 6.5%(폰 상태바)·하단 15%(인스타 메뉴) 크롭 → `<name>-web.mp4`
3. 구간 추출: `node scripts/story-segments.mjs <web.mp4>` → 스토리 전환 `t[]` 자동 감지
   - ⚠️ 사진 스토리는 잘 잡지만 **영상 스토리 경계는 누락**될 수 있음. 긴 구간은 프레임 떠서 수동 보정.
4. `src/data/stories.ts` 의 해당 reel에 `video`(+`?v=N` 캐시버스트)·`cover`·segment별 `t`/`caption`/`sticker` 채우기
- 영상은 **Git LFS**(`*.mp4 *.webm *.mkv`). 원본 raw는 `media-raw/`(동기화 제외).

## Git 동기화 (집 ↔ 회사)
- 저장소: https://github.com/GIT-SUNGWONCHO/africa_journey-
- **작업 시작**: `git pull`  /  **작업 끝**: `git add -A && git commit -m "..." && git push`
- 자세한 셋업·주의는 `WORKFLOW.md` 참고.

## 현재 상태 (2026-06-23)
- 페이지 구조 새로 잡음: **① 히어로 모자이크 → ② 스토리(부가) → ③ 왜 탄자니아 → ④ 뭘 하나 → ⑤ 일정 흐름 → ⑥ 마무리.**
- 상세 일정표·견적표·꿀팁 8종은 페이지에서 내림(데이터는 보존).
- 콘텐츠 대부분 **자리표시자**. 스토리 테스트 영상 1개(`test-web.mp4`)와 일부 구간만 실제.
- Netlify Drop으로 초안 1회 공유함. Vercel 정식 배포는 보류.

## 다음 할 일 (TODO)
- [ ] **히어로 킬러 미디어 채우기** (사자영상·누떼·초원·버팔로·레게머리·플스방) → `public/assets/hero-media/` + `hero.ts`
- [ ] 실제 인스타 하이라이트 영상들로 **스토리 릴 채우기** (위 파이프라인대로)
- [ ] 잡지 섹션(왜/뭘 하나)에 **실제 사진 + 카피 다듬기**
- [ ] **Vercel 연결** → 배포 URL(와이프 공유)
- [ ] (나중) 영상 늘어 LFS 1GB 한도 넘으면 → **CDN(Cloudflare Stream 등)** 으로 이전
