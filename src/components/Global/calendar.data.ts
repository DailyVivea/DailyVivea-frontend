import { Feedback } from "@/api/types/report";

export interface CalendarProps {
  componentName: string; // 캘린더가 이곳 저곳에서 사용되면 key값 오류 발생 -> 해결법: 부모 컴포넌트명을 key로 사용
  currentDate: Date; // 현재 날짜
  selectedDate: Date | null; // 선택된 날짜
  hoveredDate: Date | null; // 호버된 날짜
  setCurrentDate: (date: Date) => void; // 현재 날짜를 설정하는 함수
  setSelectedDate: (date: Date | null) => void; // 선택된 날짜를 설정하는 함수
  setHoveredDate: (date: Date | null) => void; // 호버된 날짜를 설정하는 함수
}

export interface StickerCalendarProps extends CalendarProps {
  feedbackList: Feedback[] | undefined; // 백엔드 API 연동 데이터
}

// 달력 헤더에 표시할 컬럼명
export const calendarHeader = ["일", "월", "화", "수", "목", "금", "토"];

// 달력에 표시할 날짜
// 이번 달 날짜만 표시할 수도 있는데
// 우리는 피그마 디자인상 지난 달, 다음 달 날짜까지 표시
export const calendarDates = (date: Date) => {
  // 기준으로 할 날짜(달력에서 선택된 날짜 등)를 받음
  const dates = [];

  // 이번 달 첫째 주
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  // 이번 달 마지막 주
  const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  // 이전 달 마지막 주
  const lastDayOfPrevMonth = new Date(date.getFullYear(), date.getMonth(), 0);

  // [1] 이번 달 첫 주에 이전 달 마지막 날짜를 채우기
  for (let i = firstDayOfMonth.getDay() - 1; i >= 0; i--) {
    dates.push(
      new Date(
        date.getFullYear(),
        date.getMonth() - 1,
        lastDayOfPrevMonth.getDate() - i
      )
    );
  }

  // [2] 이번 달 날짜 채우기
  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();
    dates.push(new Date(currentYear, currentMonth, i));
  }

  // [3] 이번 달 마지막 주에 다음 달 첫 주 날짜를 채우기기
  const totalCells = 42; // 7x6 그리드(일단 6주로 채우기)
  const remainingCells = totalCells - dates.length;

  for (let i = 1; i <= remainingCells; i++) {
    const nextMonthDate = new Date(date.getFullYear(), date.getMonth() + 1, i);

    if (nextMonthDate.getDay() == 0) break;

    dates.push(nextMonthDate);
  }

  return dates;
};

// 1~9월을 01~09로 변환
export const calendarMonth = (date: Date) => {
  const month = date.getMonth() + 1; // 0부터 11까지의 값이므로 1을 더해 1부터 12로 맞춤
  const formattedMonth = String(month).padStart(2, "0"); // 두 자릿수로 포맷팅 (1 -> '01', 9 -> '09', 10 -> '10')

  return formattedMonth;
};

// 날짜 데이터를 MM.DD.Day 형식으로 변환환
export function formatDateMMdDDdDay(date: Date) {
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth(): index 0부터 시작하므로 1더하기, 두 자릿수
  const day = String(date.getDate()).padStart(2, "0"); // 두 자릿수
  const dayOfWeek = daysOfWeek[date.getDay()];

  return `${month}.${day}.${dayOfWeek}`;
}

// 날짜 데이터를 MM . DD . Day요일 형식으로 변환환
export function formatDateMMdDDdDay2(date: Date) {
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth(): index 0부터 시작하므로 1더하기, 두 자릿수
  const day = String(date.getDate()).padStart(2, "0"); // 두 자릿수
  const dayOfWeek = daysOfWeek[date.getDay()];

  return `${month} . ${day} . ${dayOfWeek}요일`;
}

// 날짜 데이터를 YYYY-MM-DD 형식으로 변환환
export function formatDateYYYYbMMbDD(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
