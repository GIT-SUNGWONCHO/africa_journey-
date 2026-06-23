// "스토리" — 인스타 하이라이트 모델. 주제/지역별로 잘게 쪼개 카드 여러 개.
// 카드 1개 = 하나의 하이라이트(주제). 카드 누르면 그 안의 스토리들을 인스타처럼 탭으로 넘김.
//
// 두 가지 방식 지원:
//  (B) reel.video 에 화면녹화 통영상 1개 + 각 segment.t(시작 초) → 영상 안에서 탭으로 점프  ★추천
//  (A) reel.video 없이 각 segment.media 에 개별 클립/사진 → 하나씩 넘김
//
// 지금은 자리표시자(영상 없음 = 캡션 카드 자동재생). 아래 주제 분류는 예시이니 실제 하이라이트에 맞게 조정.

export interface Segment {
  t?: number;             // (방식 B) reel.video 안에서 이 스토리 시작 초
  media?: string | null;  // (방식 A) 개별 사진/클립 경로
  type?: 'image' | 'video';
  caption?: string;       // 그때 스토리에 쓴 문구
  sticker?: string;       // 스티커/한마디
}

export interface Reel {
  id: string;
  title: string;
  tone?: 'savanna' | 'ocean';
  cover?: string | null;
  video?: string | null;  // (방식 B) 하이라이트 통영상 1개
  segments: Segment[];
}

export const reels: Reel[] = [
  // ▼ 테스트용 — 실제 화면녹화 영상 + 자동추출 구간(t). 검증 후 제거/교체.
  {
    id: 'test', title: '탄자니아 도착', tone: 'savanna',
    video: '/assets/stories/test-web.mp4?v=3', cover: '/assets/stories/covers/test.jpg?v=3',
    segments: [
      { t: 0 }, { t: 4.25 }, { t: 9.33 },
      { t: 14.42, caption: '타잔' }, { t: 23.55, caption: '일반인' }, { t: 28.09, caption: '개고수' },
      { t: 44.68 }, { t: 49.92 }, { t: 55.83 }, { t: 60.92 }, { t: 88.63 }, { t: 93.7 },
      { t: 98.73 }, { t: 103.8 }, { t: 108.85 }, { t: 113.92 }, { t: 119.98 },
      { t: 125.03 }, { t: 130.1 }, { t: 136.68 }, { t: 176.2 }, { t: 181.27 },
      { t: 214.07 },
    ],
  },
  {
    id: 'going', title: '가는 길', tone: 'savanna', video: null,
    segments: [
      { sticker: '✈️ 출발', caption: '인천공항 새벽, 설렘 반 긴장 반. 진짜 아프리카 가는 거야?' },
      { sticker: '🛬 도착', caption: '비행 20시간… 문 열자마자 공기부터 다름. 아 여기 진짜구나' },
      { sticker: '🚙 사파리 시작', caption: '지프 천장 열고 출발. 흙길 먼지 풀풀, 이게 시작이라니' },
    ],
  },
  {
    id: 'serengeti', title: '세렝게티', tone: 'savanna', video: null,
    segments: [
      { sticker: '🦁 실화냐', caption: '차 바로 옆에 사자가 누워있음 우리 둘 다 숨도 못 쉬는 중' },
      { sticker: '🐆 표범 발견', caption: '나무 위 표범! 가이드 눈썰미 미쳤다' },
      { sticker: '🦓 대이동', caption: '얼룩말 누 떼가 끝도 없이… 지평선까지 동물' },
      { sticker: '🌅 새벽 5시', caption: '졸려 죽겠는데 이 일출 보려고 일어난 거 1초도 안 아까움' },
    ],
  },
  {
    id: 'ngorongoro', title: '응고롱고로', tone: 'savanna', video: null,
    segments: [
      { sticker: '🌋 분화구', caption: '바닥으로 쭉 내려가는데 풍경이 비현실적' },
      { sticker: '🦏 빅5 완성', caption: '멀리 코뿔소! 이걸로 빅5 다 봄 ㅋㅋ' },
      { sticker: '🦩 홍학 호수', caption: '핑크빛 호수… 사진이 다 못 담아' },
    ],
  },
  {
    id: 'camp', title: '캠프 & 밤하늘', tone: 'savanna', video: null,
    segments: [
      { sticker: '⛺ 사파리 캠프', caption: '전기도 약한데 그게 또 낭만. 밤엔 동물 소리만' },
      { sticker: '🌌 은하수', caption: '고개 들었더니 별이 쏟아짐. 인생 밤하늘 갱신' },
      { sticker: '🔥 모닥불', caption: '불 앞에서 와인 한 잔. 오늘 본 거 곱씹는 시간' },
    ],
  },
  {
    id: 'to-zanzibar', title: '잔지바르로', tone: 'ocean', video: null,
    segments: [
      { sticker: '🛩️ 경비행기', caption: '작은 비행기 타고 섬으로. 창밖이 점점 파래짐' },
      { sticker: '🏝️ 첫 바다', caption: '사파리로 방전됐다가 이 바다 보고 충전 1000%' },
    ],
  },
  {
    id: 'beach', title: '능귀 해변', tone: 'ocean', video: null,
    segments: [
      { sticker: '🌊 에메랄드', caption: '물 색깔 실화? 보정 1도 안 함' },
      { sticker: '🤿 스노클링', caption: '물 안이 더 난리. 물고기 떼 사이로 둥둥' },
      { sticker: '⛵ 석양 다우선', caption: '말이 필요없는 장면. 이 색을 폰이 다 못 담아' },
    ],
  },
  {
    id: 'stonetown', title: '스톤타운', tone: 'ocean', video: null,
    segments: [
      { sticker: '🌆 골목 탐험', caption: '향신료 냄새 가득한 골목, 길 잃는 게 여행인 동네' },
      { sticker: '🚪 잔지바르 문', caption: '조각 새겨진 나무문마다 사진 찍게 됨' },
      { sticker: '🌶️ 향신료 투어', caption: '계피를 나무에서 직접 긁어 먹어봄. 향이 미쳤어' },
    ],
  },
  {
    id: 'food', title: '먹킷리스트', tone: 'ocean', video: null,
    segments: [
      { sticker: '🍤 The Rock', caption: '바다 위 식당, 밀물이라 배 타고 들어감 ㅋㅋ 위치가 미쳤다' },
      { sticker: '🦞 해산물', caption: '랍스터 문어 다 신선하고 쌈. 매일 바다 먹는 중' },
      { sticker: '☕ 잔지바르 커피', caption: '향신료 넣은 커피. 기념품으로도 한 봉지 사옴' },
    ],
  },
];
