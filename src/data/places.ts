// 인터랙티브 지도(실제 국경 외곽선, 북부 사파리권+잔지바르로 확대)의 장소들.
// x,y 는 지도 박스 기준 % 위치 (left%, top%). 크롭된 viewBox 기준으로 계산됨.
export interface Place {
  id: string;
  name: string;
  tag: string;
  icon: string;
  group: 'mainland' | 'island';
  x: number;
  y: number;
  tone: 'savanna' | 'ocean';
  summary: string;
  highlights: string[];
  img?: string | null;
}

export const places: Place[] = [
  {
    id: 'serengeti', name: '세렝게티', tag: '빅5의 무대', icon: '🦁', group: 'mainland', x: 21, y: 40, tone: 'savanna',
    summary: '끝없는 황금빛 초원. 다큐에서 보던 그 장면이 차 문 밖에서 실시간으로 펼쳐진다.',
    highlights: ['빅5 — 사자·표범·코끼리·버팔로·코뿔소', '사자의 사냥까지, 살아있는 생태계', '누 대이동과 기린·치타·하이에나', '옵션 — 열기구 사파리·나이트 게임드라이브', '풀장 옆 코끼리, 럭셔리 텐티드 롯지'],
    img: null,
  },
  {
    id: 'ngorongoro', name: '응고롱고로', tag: '세계 최대 분화구', icon: '🌋', group: 'mainland', x: 34, y: 40, tone: 'savanna',
    summary: '거대한 화산 분화구 안에 야생이 통째로 모여 사는 비현실적인 생태계.',
    highlights: ['분화구 바닥으로 하강', '흑코뿔소·사자·하마 밀집 야생', '핑크빛 홍학 호수', '비현실적인 분화구 풍경'],
    img: null,
  },
  {
    id: 'arusha', name: '아루샤', tag: '사파리의 관문', icon: '✈️', group: 'mainland', x: 44, y: 35, tone: 'savanna',
    summary: '킬리만자로 공항이 있는 사파리 베이스캠프 도시. 여기서 가이드를 만나 출발한다.',
    highlights: ['킬리만자로 국제공항(JRO)', '첨카온천 물놀이', '환전·가이드 미팅', '사파리의 출발점'],
    img: null,
  },
  {
    id: 'nungwi', name: '능귀', tag: '북부 해변 리조트', icon: '🏖️', group: 'island', x: 85, y: 30, tone: 'ocean',
    summary: '에메랄드빛 인도양. 사파리로 방전된 몸을 충전하는 휴양과 액티비티의 중심.',
    highlights: ['에메랄드빛 해변', '올인클루시브 리조트에서 먹고 놀기', '바다 위 물속 승마', '돌고래 투어 & 스노클링'],
    img: null,
  },
  {
    id: 'stonetown', name: '스톤타운', tag: '유네스코 구시가지', icon: '🕌', group: 'island', x: 77, y: 50, tone: 'ocean',
    summary: '향신료 냄새 가득한 미로 같은 골목. 아랍·인도·아프리카가 섞인 잔지바르의 심장.',
    highlights: ['향신료 투어', '기념품 쇼핑 천국 (향신료·캉가·목각)', '미로 골목과 잔지바르 문', '다우선 타고 석양 크루즈'],
    img: null,
  },
  {
    id: 'paje', name: '파제', tag: '동부 해변', icon: '🪂', group: 'island', x: 90, y: 63, tone: 'ocean',
    summary: '조수 간만이 극적인 동부 해변. 카이트서핑과 바다 위 레스토랑으로 유명.',
    highlights: ['바다 위 더 락(The Rock) 레스토랑', '카이트서핑', '마알럼 동굴', '한적한 백사장'],
    img: null,
  },
];
