// 실제 일정 (11박 13일): 세렝게티 사파리 6일 + 잔지바르 7일.
// 사파리 구간은 Meru Slopes Tours 견적서 기준, 잔지바르는 구글시트 기준.
export type Region = 'move' | 'safari' | 'zanzibar';

export interface Day {
  day: number;
  date: string;
  region: Region;
  place: string;
  desc: string;
  hotel?: string;
}

export const regionLabel: Record<Region, string> = {
  move: '이동',
  safari: '사파리',
  zanzibar: '잔지바르',
};

export const itinerary: Day[] = [
  { day: 1, date: '6/7 (일)', region: 'move', place: '인천공항 출국', desc: '저녁 출국 수속·라운지, 심야 출발 (인천→아디스아바바, ET673).' },
  { day: 2, date: '6/8 (월)', region: 'safari', place: '킬리만자로 도착 → 첨카온천 → 아루샤', desc: '아디스아바바 경유 후 킬리만자로(JRO) 도착. 공항에서 환전(USD→실링)·가이드 미팅, 첨카온천 물놀이.', hotel: 'Forest Hill Hotel' },
  { day: 3, date: '6/9 (화)', region: 'safari', place: '타랑기레 국립공원', desc: '아침 2.5시간 이동 후 게임드라이브. 바오밥과 코끼리, 건강한 사자 개체군. 사자·치타.', hotel: 'Lemala Mpingo Ridge' },
  { day: 4, date: '6/10 (수)', region: 'safari', place: '세렝게티 국립공원', desc: '응고롱고로 고원 경유, 마사이 보마 방문. 끝없는 초원에서 빅5 탐색, 저녁 게임드라이브.', hotel: 'Anantya Camp' },
  { day: 5, date: '6/11 (목)', region: 'safari', place: '세렝게티 국립공원', desc: '종일 게임드라이브 (열기구 사파리 옵션 가능).', hotel: 'Kubu Kubu Tented Lodge' },
  { day: 6, date: '6/12 (금)', region: 'safari', place: '응고롱고로 분화구', desc: '분화구 바닥으로 하강, 6~7시간 사파리. 흑코뿔소·사자·하마. 저녁 아루샤 복귀.', hotel: 'Forest Hill Hotel' },
  { day: 7, date: '6/13 (토)', region: 'move', place: '아루샤 → 잔지바르 (스톤타운)', desc: '오전 국내선으로 섬 이동(아루샤→잔지바르). 스톤타운 도착, 재정비·ATM, 야시장.', hotel: 'Kisiwa House' },
  { day: 8, date: '6/14 (일)', region: 'zanzibar', place: '스톤타운', desc: '유네스코 구시가지 구경·쇼핑·기념품, 향신료 투어, 마사지.', hotel: 'Kisiwa House' },
  { day: 9, date: '6/15 (월)', region: 'zanzibar', place: '능귀(Nungwi) 이동', desc: '북부 해변 리조트로 이동. 숙소 즐기기·수영·테니스.', hotel: 'the mora zanzibar' },
  { day: 10, date: '6/16 (화)', region: 'zanzibar', place: '능귀', desc: '돌고래 투어, 수영·테니스.', hotel: 'the mora zanzibar' },
  { day: 11, date: '6/17 (수)', region: 'zanzibar', place: '파제(Paje) 당일치기', desc: '동부 해변, 마알럼 동굴, 바다·카페. 저녁 더 락(The Rock) 레스토랑.', hotel: 'the mora zanzibar' },
  { day: 12, date: '6/18 (목)', region: 'zanzibar', place: '능귀', desc: '스카이다이빙(오전), 승마(오후).', hotel: 'the mora zanzibar' },
  { day: 13, date: '6/19 (금)', region: 'move', place: '능귀 → 잔지바르 공항', desc: '체크아웃 후 짐 맡기고 자유시간. 저녁 비행으로 귀국길(잔지바르→아디스아바바).' },
  { day: 14, date: '6/20 (토)', region: 'move', place: '인천 도착', desc: '아디스아바바 경유 후 인천 도착, 여행 종료.' },
];

// 코스 옵션 (취향대로)
export interface Option {
  name: string;
  days: string;
  desc: string;
  best: string;
}

export const options: Option[] = [
  { name: '세렝게티 사파리 집중', days: '5박 6일', desc: '타랑기레+세렝게티+응고롱고로 빅5 사파리. (우리가 한 Meru Slopes 코스)', best: '야생 동물이 주 목적' },
  { name: '사파리 + 잔지바르 (우리 코스)', days: '11박 13일', desc: '사파리 6일 후 잔지바르 7일 휴양. 가장 균형 잡힌 허니문.', best: '액티브 + 휴양 둘 다' },
  { name: '잔지바르 휴양 중심', days: '5박 6일', desc: '섬 위주, 사파리는 당일/1박 옵션.', best: '휴양이 주 목적' },
];
