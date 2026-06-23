# 📂 자산(사진/영상) 넣는 곳

여기에 사진·영상을 넣고, 코드에서 `/assets/...` 경로로 참조합니다.
(예: `public/assets/serengeti/lion-01.jpg` → 코드에서 `/assets/serengeti/lion-01.jpg`)

## 권장 폴더 구조
```
public/assets/
  hero/        ← 메인 상단 대표 사진/영상 (가로 긴 컷)
  serengeti/   ← 세렝게티 사파리 사진
  zanzibar/    ← 잔지바르 해변/스톤타운 사진
  food/        ← 음식 사진
  souvenir/    ← 기념품 사진
```

## 사진 넣은 뒤 할 일
1. 파일을 위 폴더에 복사
2. `src/data/gallery.ts` 에서 `src: null` 을 실제 경로로 교체
   - 예: `{ src: '/assets/serengeti/lion-01.jpg', alt: '사자 무리', span: 'wide' }`
3. 히어로 배경 사진은 `src/pages/index.astro` 의 `.hero__bg` 주석 참고

## 팁
- 웹용으로 너무 큰 원본(10MB+)은 **긴 변 2000px / 80% 품질** 정도로 줄이면 로딩이 빨라요.
- 원본 대용량/영상 백업은 git에 올리지 않습니다(.gitignore 처리됨). 최적화본만 커밋.
