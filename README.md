# 🦁 탄자니아 여행 가이드 (세렝게티 + 잔지바르)

직접 다녀온 신혼여행 경험을 바탕으로 만든 탄자니아 여행 가이드 사이트.
감성(매거진) + 실용(가이드)을 섞은 하이브리드 톤. Astro 기반 정적 사이트.

## 시작하기

> Node.js가 필요합니다. 설치 안 돼 있으면 https://nodejs.org 에서 **LTS** 설치.

```bash
npm install      # 최초 1회 (의존성 설치)
npm run dev      # 개발 서버 → http://localhost:4321
npm run build    # 배포용 빌드 → dist/
npm run preview  # 빌드 결과 미리보기
```

## 폴더 구조

```
src/
  pages/index.astro      ← 메인 한 페이지 (모든 섹션 조립)
  layouts/BaseLayout.astro
  components/Nav.astro
  styles/
    tokens.css           ← ★ 색·폰트 한 곳에서 관리
    global.css
  data/                  ← 일정·견적·요약·갤러리 데이터 (여기 수정)
    summary.ts
    itinerary.ts
    costs.ts
    gallery.ts
  content/tips/*.md       ← ★ 실전 꿀팁 (1파일 = 1꿀팁, 커뮤니티 확장 시 DB가 됨)
  content.config.ts       ← 꿀팁 스키마 정의
public/assets/            ← 사진/영상 (README 참고)
```

## 콘텐츠 채우는 법

| 무엇을 | 어디서 |
|---|---|
| 요약 숫자·인트로 | `src/data/summary.ts` |
| Day-by-day 일정 / 코스 옵션 | `src/data/itinerary.ts` |
| 항목별 견적 | `src/data/costs.ts` |
| 사진 갤러리 | `public/assets/` 에 사진 + `src/data/gallery.ts` 경로 |
| 실전 꿀팁 | `src/content/tips/` 에 `.md` 추가 |
| 날씨·문화 | `src/pages/index.astro` 의 `#prep` 섹션 |
| 색/폰트 | `src/styles/tokens.css` |

## 새 꿀팁 추가 예시

`src/content/tips/내용.md`:
```markdown
---
title: 제목
category: transport   # transport|haggle|food|money|prep|etc
summary: 한 줄 요약
price: 실제 가격(선택)
contact: 왓츠앱 번호 등(선택)
location: 위치(선택)
order: 10
---
본문 (마크다운)
```

## 로드맵
- **Phase 1 (현재):** 몰입형 단일 가이드 페이지
- **Phase 2:** 꿀팁 검색/필터 + 일정 담아가기
- **Phase 3:** 로그인 + 사용자 꿀팁 기여(커뮤니티)
- **Phase 4:** 다른 여행지로 확장 → 앱
