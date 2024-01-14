// chatList를 기반으로 채팅을 날짜별로 섹션으로 그룹화하는 함수
import dayjs from 'dayjs';

export default function makeSection(chatList) {
  // chatList는 채팅 객체들의 배열로 가정
  const sections = {};
  // sections 객체를 초기화합니다. 이 객체는 날짜를 키로 하고 해당 날짜의 채팅을 값으로 하는 맵
  chatList.forEach((chat) => {
    const monthDate = dayjs(chat.createdAt).format('YYYY-MM-DD');
    if (Array.isArray(sections[monthDate])) {
      sections[monthDate].push(chat);
    } else {
      sections[monthDate] = [chat];
    }
    // 변환된 날짜를 사용하여 sections 객체를 업데이트
  });
  return sections;
}
