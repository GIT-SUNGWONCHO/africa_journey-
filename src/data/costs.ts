// 실제 견적 (러프 초안 — 수정 예정). 2인 기준.
// 사파리는 Meru Slopes 견적서($5,940/2인 + 팁), 나머지는 예산 시트 기준.
export interface CostItem {
  category: string;
  item: string;
  amount: string;
  note?: string;
}

export const costMeta = {
  basis: '2인 기준 · 2026년 6월 · 러프 초안(수정 예정)',
  currency: 'KRW (현지 지출은 USD 환산)',
};

export const costs: CostItem[] = [
  { category: '항공', item: '국제선 (인천↔킬리만자로, 경유)', amount: '₩4,430,000', note: '2인 합산' },
  { category: '항공', item: '국내선 (아루샤↔잔지바르)', amount: '₩402,600', note: '2인 합산' },
  { category: '사파리', item: '세렝게티 6일 빅5 (가이드·차량·숙소·식사·입장료·팁)', amount: '₩8,700,000', note: '2인 · Meru Slopes $5,940 + 팁' },
  { category: '잔지바르', item: '숙소 (스톤타운 2박 + 능귀 리조트 4박)', amount: '₩2,500,000', note: '2인' },
  { category: '잔지바르', item: '투어 (돌고래·향신료 등)', amount: '₩800,000' },
  { category: '잔지바르', item: '스카이다이빙', amount: '₩1,200,000', note: '2인' },
  { category: '잔지바르', item: '식비', amount: '₩300,000', note: '대략' },
  { category: '기타', item: '비자', amount: '₩150,000', note: '1인 $50 × 2' },
];

export const costTotal = { label: '총합 (2인)', amount: '약 ₩18,482,600', perPerson: '1인 약 ₩9,241,300' };
