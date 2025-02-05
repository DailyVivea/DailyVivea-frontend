"use client";

import React, { useState } from "react";
import "../../style/goal/GoalCalendar.css"

// 날짜 객체에서 주말과 날짜 계산을 위한 유틸리티 함수
const generateCalendar = (year: number, month: number) => {
  const startOfMonth = new Date(year, month, 1);
  const endOfMonth = new Date(year, month + 1, 0);
  const startDay = startOfMonth.getDay(); // 0 = 일요일, 1 = 월요일, ...
  const totalDaysInMonth = endOfMonth.getDate();
  
  const days = Array.from({ length: totalDaysInMonth }, (_, i) => i + 1);

  // 첫 번째 주 시작일부터 채우기
  const calendarGrid = Array.from({ length: Math.ceil((totalDaysInMonth + startDay) / 7) }, (_, i) => {
    const week = Array.from({ length: 7 }, (_, j) => {
      const dayIndex = i * 7 + j - startDay;
      return dayIndex >= 0 && dayIndex < totalDaysInMonth ? dayIndex + 1 : null;
    });
    return week;
  });

  return calendarGrid;
};

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState<{ start?: string; end?: string }>({});

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // 이전 달로 이동
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1));
  };

  // 다음 달로 이동
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1));
  };

  // 날짜 클릭 시 처리
  const handleDateClick = (date: string) => {
    if (selectedDates.start && !selectedDates.end) {
      // 종료일 설정
      setSelectedDates({ ...selectedDates, end: date });
    } else if (selectedDates.start && selectedDates.end) {
      // 시작일과 종료일 모두 선택되었을 경우 취소
      setSelectedDates({ start: date, end: undefined });
    } else {
      // 시작일 설정
      setSelectedDates({ start: date, end: undefined });
    }
  };

  // 날짜 스타일링
  const getDateStyle = (date: string) => {
    const { start, end } = selectedDates;
    if (start === date) {
      return { backgroundColor: "green", color: "white" }; // 시작일
    } else if (end === date) {
      return { backgroundColor: "green", color: "white" }; // 종료일
    } else if (start && end && date > start && date < end) {
      return { backgroundColor: "rgba(0, 255, 0, 0.3)" }; // 시작일부터 종료일까지 배경
    } else {
      return {};
    }
  };

  // 이번 달의 달력 생성
  const calendarGrid = generateCalendar(currentYear, currentMonth);

  return (
    <div>
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>◀</button>
        <span>{`${currentYear}년 ${currentMonth + 1}월`}</span>
        <button onClick={handleNextMonth}>▶</button>
      </div>

      <div className="calendar">
        {calendarGrid.map((week, weekIndex) => (
          <div key={weekIndex} className="calendar__week">
            {week.map((date, dayIndex) => (
              <button
                key={dayIndex}
                className="calendar__date"
                onClick={() => date && handleDateClick(date.toString())}
                style={date ? getDateStyle(date.toString()) : {}}
                disabled={!date}
              >
                {date || ""}
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className="calendar__buttons">
        <button onClick={() => alert(`선택된 기간: ${selectedDates.start} ~ ${selectedDates.end || selectedDates.start}`)}>
          완료하기
        </button>
      </div>
    </div>
  );
};

export default Calendar;
