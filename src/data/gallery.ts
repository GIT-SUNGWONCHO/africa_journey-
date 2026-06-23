// 최상단 히어로에 깔리는 메인 사진 몇 장 (자동 전환 슬라이드쇼).
// 진입하자마자 'TANZANIA' 뒤로 흐르는 핵심 컷. public/assets/hero/ 에 넣고 src 채우기.
export interface Photo {
  src: string | null;   // 예: '/assets/hero/01.jpg' (CDN URL도 가능)
  alt: string;
  tone?: 'savanna' | 'ocean'; // 자리표시자 색감 (사진 넣으면 무시됨)
}

export const heroPhotos: Photo[] = [
  { src: null, alt: '세렝게티 초원과 아카시아', tone: 'savanna' },
  { src: null, alt: '게임드라이브의 사자', tone: 'savanna' },
  { src: null, alt: '잔지바르 능귀 해변', tone: 'ocean' },
  { src: null, alt: '다우선과 석양', tone: 'ocean' },
  { src: null, alt: '초원의 코끼리 가족', tone: 'savanna' },
];
