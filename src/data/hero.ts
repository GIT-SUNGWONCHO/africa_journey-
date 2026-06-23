// 히어로 "킬러 미디어 월" 타일. 사진/영상 + 가로/세로 섞어서 한눈에 임팩트.
// 영상은 public/assets/hero-media/ 에 넣고 경로 지정 (자동재생·무음·루프).
// span: big(2x2) / wide(2x1) / tall(1x2) / sq(1x1) — 가로컷은 wide, 세로컷은 tall, 대표는 big.
export type TileSpan = 'big' | 'wide' | 'tall' | 'sq';
export interface Tile {
  type: 'video' | 'image';
  src: string | null;      // 예: '/assets/hero-media/lion.mp4' 또는 '/assets/hero-media/savanna.jpg'
  alt: string;
  span: TileSpan;
  tone?: 'savanna' | 'ocean';
}

// 네가 꼽은 킬러 컷들 (지금은 자리표시자). 실제 파일 넣고 src 채우면 살아남.
export const featured: Tile[] = [
  { type: 'video', src: null, alt: '사자가 누를 사냥해 뜯어먹는 순간', span: 'big', tone: 'savanna' },
  { type: 'image', src: null, alt: '끝없는 누떼 이동', span: 'wide', tone: 'savanna' },
  { type: 'image', src: null, alt: '레게머리 인증샷', span: 'tall', tone: 'ocean' },
  { type: 'image', src: null, alt: '광활한 세렝게티 초원', span: 'wide', tone: 'savanna' },
  { type: 'image', src: null, alt: '버팔로 (빅5)', span: 'sq', tone: 'savanna' },
  { type: 'video', src: null, alt: '잔지바르 플스방 승리 영상', span: 'sq', tone: 'ocean' },
  { type: 'image', src: null, alt: '잔지바르 석양', span: 'wide', tone: 'ocean' },
];

export const heroHook = {
  title: 'TANZANIA',
  line: '이게 우리가 본 아프리카.',
};
