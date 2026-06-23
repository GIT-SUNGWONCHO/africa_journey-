// 상단 "한눈에 보기" 요약 카드. 실제 수치로 교체하세요.
export interface Stat {
  value: string;
  label: string;
  sub?: string;
}

export const summary: Stat[] = [
  { value: '11박 13일', label: '총 여행 기간', sub: '세렝게티 사파리 6일 + 잔지바르 7일' },
  { value: '1인 약 ₩920만', label: '총 견적 (러프)', sub: '2인 약 ₩1,850만 · 항공·사파리·숙소 포함' },
  { value: '6월 (건기)', label: '다녀온 시기', sub: '동물 관찰 최적, 일교차 큼' },
  { value: '신혼·허니문', label: '추천 대상', sub: '사파리 + 휴양을 한 번에' },
];

// 여행 한 줄 소개 (히어로 아래 인트로)
export const intro =
  '광활한 세렝게티에서 야생을 만나고, 인도양의 잔지바르에서 쉬어가는 여행. ' +
  '아직 한국엔 정보가 많지 않은 탄자니아를, 우리가 직접 발로 뛴 일정·견적·꿀팁으로 정리했습니다.';
