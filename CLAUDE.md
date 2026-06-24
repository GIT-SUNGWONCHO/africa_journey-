# CLAUDE.md — 탄자니아 여행 후기 사이트

> 이 파일을 먼저 읽고 작업을 이어가세요. 프로젝트 맥락·규칙·다음 할 일이 들어있습니다.
> (집↔회사 두 PC에서 작업하므로 맥락은 이 저장소 안에 둡니다.)

## 프로젝트
- 탄자니아(세렝게티 + 잔지바르) 신혼여행 후기 **웹 쇼케이스**.
- **확정 방향**: 지인에게 "와 가보고 싶다" 흥미를 유발하는 **스토리/사진/영상 중심 웹**. (정보 PDF 판매는 보류)
- 마지막에 **커뮤니티 플랫폼(별도 신규 프로젝트, 예정)** 으로 넘기는 공유 CTA. 사진·영상뿐 아니라 일정·예산·준비물·연락처·꿀팁까지 나누는 여행 커뮤니티가 목표.

## 톤 / 디자인 규칙 (중요 — 어기지 말 것)
- **힙하게.** 인스타 스토리 / 브이로그 / 애플 홈페이지 감성. 공감·공유.
- ❌ 친절한 제목·설명·서사 카피 금지("~에서 ~까지", "백 마디보다 사진 한 장" 류). 소제목은 **영어 한 단어**로 짧게(STORIES, WHAT'S THERE…).
- **콘텐츠(사진·영상)가 바로 나오게.** 라벨/설명 최소화.
- 색·폰트는 `src/styles/tokens.css` 한 곳에서 관리.

## 실행
- Node LTS + npm. `npm install` 후 `npm run dev`(http://localhost:4321) / `npm run build`.
- ⚠️ 회사 PC는 node가 PATH에 없어 PowerShell에서 `$env:Path = "C:\Program Files\nodejs;" + $env:Path` 선행 필요. 집 PC는 보통 그냥 됨.
- ffmpeg는 `ffmpeg-static`(devDependency)로 자동 — 시스템 설치 불필요.

## 페이지 구조 (src/pages/index.astro 가 조립)
1. **히어로** — `HeroVideo.astro`: 풀스크린 시네마틱 영상(자동재생·무음·루프) + `TANZANIA` 워드마크
2. **ABOUT** — 풀스크린 붙박이 사진 위로 메인카피+Q&A가 스크롤되는 애플식(스크롤 리빌). 카피 "인생에 한 번, 대자연을 만나다"
3. **지도(WHAT'S THERE)** — `PlacesMap.astro`: AI 일러스트 지도 배경 + 클릭 핀 6개 → 장소 상세 카드
4. **스토리(STORIES)** — `StoryGallery.astro`: 인스타식 하이라이트 탭 뷰어 (지도 아래)
5. **공유 CTA** — 커뮤니티 플랫폼(예정)으로 넘기는 버튼

## 컴포넌트 / 데이터
- `components/`: HeroVideo, PlacesMap, StoryGallery(⚠️ `<style is:global>` 필수 — 영상/바/캡션 JS 동적삽입), Nav, (HeroMosaic = 현재 미사용 보존)
- `data/`: `magazine.ts`(intro 카피 + qna), `places.ts`(지도 핀 x/y%·아이콘·상세), `stories.ts`(reels), `hero.ts`(heroHook 텍스트만 사용)
  - `itinerary.ts` `costs.ts` `summary.ts` `gallery.ts` — **현재 미사용(보존)**. 상세 일정/견적 되살릴 때.
- `content/tips/*.md` + `content.config.ts` — 꿀팁(현재 미렌더, 보존)

## 자산(이미지/영상) 넣는 곳 — 폴더에 넣으면 자동 인식
- `src/assets/hero-media/` → 히어로 영상 `hero.mp4` (HeroVideo 자동 사용)
- `src/assets/about/` → ABOUT 붙박이 사진 (자동 사용, 없으면 그라데이션)
- `src/assets/map/` → 지도 일러스트 이미지 (PlacesMap 자동 사용, 없으면 SVG 폴백)
- `public/assets/stories/` → 스토리 영상 압축본(`*-web.mp4`)
- `media-raw/` → 영상 원본 (gitignore, 동기화 안 됨). 히어로 클립은 `media-raw/hero/`

## 영상 파이프라인 (scripts/)
- **히어로 몽타주**: 클립을 `media-raw/hero/`에 파일명 순으로 → `node scripts/hero-montage.mjs [클립길이=3.2] [페이드=0.6] [trim=0.2] [반시계90회전할파일들]`
  - 예) `node scripts/hero-montage.mjs 3.2 0.6 0.2 1.mp4,2.mp4,4.mp4` (가로/세로 섞여도 블러배경 채우기로 16:9 통일) → `src/assets/hero-media/hero.mp4`
- **스토리 영상**: `node scripts/compress-story.mjs <영상> 1280 26 1.0 0.065 0.15`(트림1s/상단6.5%/하단15% 크롭) → `node scripts/story-segments.mjs <web.mp4>`(구간 t[] 자동감지) → `src/data/stories.ts` 채우기
- **지도 이미지**: AI로 일러스트 지도 생성(프롬프트는 `src/assets/map/README.md`) → 폴더에 넣고 핀 좌표(`places.ts` x/y%) 조정

## 배포 & Git (집 ↔ 회사)
- 저장소: https://github.com/GIT-SUNGWONCHO/africa_journey-
- **Vercel 연결됨** → `git push` 하면 자동 빌드·배포. (push만 하면 사이트 자동 갱신)
- **영상은 일반 git 파일**(LFS 사용 안 함 — Vercel이 LFS를 못 받아와서 해제함). 100MB 미만이면 그대로 커밋 OK.
  - ⚠️ 스토리 영상 많아져 repo가 무거워지면 → 영상만 **CDN(Cloudflare Stream 등)** 으로 이전.
- 작업 시작 `git pull` / 끝 `git add -A && git commit -m "..." && git push`. 자세한 건 `WORKFLOW.md`.

## 현재 상태 (2026-06-24)
- 히어로 영상(테스트 클립 4개 몽타주), ABOUT 애플식, 일러스트 지도+핀, 스토리 뷰어(테스트 영상 1개), 공유 CTA — **골격 완성, 콘텐츠는 대부분 자리표시자/테스트**.
- Vercel 배포 작동(영상 포함 정상 표시 확인).

## 다음 할 일 (TODO)
- [ ] 히어로 몽타주에 **진짜 베스트 클립** 더 넣고 순서·길이 다듬기
- [ ] ABOUT 붙박이 사진을 **세로~정방형 대자연 사진**으로 교체(`src/assets/about/`)
- [ ] 지도 장소 상세 카드에 **실제 사진**(`places.ts` img)
- [ ] 실제 인스타 하이라이트로 **스토리 릴** 채우기(파이프라인대로)
- [ ] 영상 늘면 **CDN 이전** 검토
- [ ] (별도 프로젝트) **여행 공유 커뮤니티 플랫폼**
