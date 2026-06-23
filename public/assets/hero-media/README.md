# 🎬 히어로 킬러 미디어 넣는 곳

맨 위 모자이크 월에 들어갈 **대표 사진/영상**을 여기 넣습니다.

- 영상(mp4)·사진(jpg/png) 다 가능, 가로/세로 섞여도 OK
- 영상은 자동재생·무음·루프되니 **짧고 임팩트 있는 클립**(5~15초)이 좋아요
- 넣은 뒤 `src/data/hero.ts` 의 각 타일 `src` 에 경로를 채우세요
  - 예: `{ type:'video', src:'/assets/hero-media/lion.mp4', alt:'사자', span:'big' }`
- `span` 으로 타일 크기 조절: `big`(대표 크게) / `wide`(가로컷) / `tall`(세로컷) / `sq`(작게)
- 영상은 용량 크면 `scripts/compress-story.mjs` 로 먼저 압축 권장 (Git LFS로 관리됨)
