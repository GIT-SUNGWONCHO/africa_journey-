// 스토리 아래 잡지형 섹션 콘텐츠.
export const why = {
  kicker: 'WHY TANZANIA',
  line: '다큐에서 보던 장면이,\n차 문을 열면 눈앞에서 펼쳐진다.',
  sub: '세렝게티의 야생과 잔지바르의 바다. 액티브와 휴양을 한 번에 즐기는 곳.',
};

// "여기서 뭘 하나" 카드
export interface DoCard {
  emoji: string;
  title: string;
  copy: string;
  tone: 'savanna' | 'ocean';
  img?: string | null; // 큰 사진 (없으면 그라데이션)
}
export const doCards: DoCard[] = [
  { emoji: '🦁', title: '사파리', copy: '차 문 밖 3미터에 사자. 빅5를 눈앞에서.', tone: 'savanna', img: null },
  { emoji: '🏝️', title: '인도양 휴양', copy: '사파리로 방전됐다 잔지바르 바다에서 충전 1000%.', tone: 'ocean', img: null },
  { emoji: '🪂', title: '액티비티', copy: '스카이다이빙·돌고래 투어·승마. 가만히 못 있는 사람용.', tone: 'ocean', img: null },
  { emoji: '🦞', title: '먹거리', copy: '바다 위 레스토랑에서 매일 신선한 해산물.', tone: 'ocean', img: null },
];

// "일정은 보통 이렇게" — 고수준 2파트 흐름
export interface Phase {
  tag: string;
  title: string;
  days: string;
  desc: string;
  tone: 'savanna' | 'ocean';
}
export const phases: Phase[] = [
  { tag: 'PART 1', title: '세렝게티 사파리', days: '약 5~6일', desc: '아루샤를 거점으로 타랑기레·세렝게티·응고롱고로. 매일 게임드라이브로 빅5를 쫓는다.', tone: 'savanna' },
  { tag: 'PART 2', title: '잔지바르', days: '약 6~7일', desc: '국내선으로 섬 이동. 스톤타운 구경 후 북부 해변에서 휴양과 액티비티.', tone: 'ocean' },
];
