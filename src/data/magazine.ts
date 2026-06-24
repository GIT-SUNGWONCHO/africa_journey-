// 스토리 아래 잡지형 섹션 콘텐츠.
export const why = {
  kicker: 'WHAT IS TANZANIA',
  line: '다큐에서 보던 그 세렝게티,\n그 절반이 탄자니아예요.',
  sub: '요즘 신혼여행으로 급부상. 대자연 사파리 + 인도양 휴양을 한 번에, 평생 한 번 맘먹고 가는 곳.',
};

// 핵심 칩 (한눈에)
export const chips = [
  { k: '적정 기간', v: '10~13박' },
  { k: '베스트 시즌', v: '6~10월 건기' },
  { k: '대표 코스', v: '세렝게티 + 잔지바르' },
  { k: '누구에게', v: '신혼·인생여행' },
];

// 걱정 해소 (아프리카=위험/고생 편견 깨기)
export interface Concern { q: string; a: string; }
export const concerns: Concern[] = [
  { q: '아프리카라 위험하지 않아?', a: '사파리는 가이드가 전 일정 동행하고, 잔지바르 리조트존은 휴양지예요. 체감 위험은 일반 해외여행 수준.' },
  { q: '많이 힘들지 않아?', a: '사파리는 차 안에서 보는 거라 체력 부담 적어요. 말라리아약·생수만 챙기면 OK.' },
  { q: '영어 안 되는데 괜찮아?', a: '투어·리조트는 영어로 충분. 택시·예약도 왓츠앱으로 술술 조율돼요.' },
  { q: '유일한 단점은?', a: '멀다는 것(비행 20시간+경유). 그래서 "평생 한 번 맘먹고" 가는 여행이에요.' },
];

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
