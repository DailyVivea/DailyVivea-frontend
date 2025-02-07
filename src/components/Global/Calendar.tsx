"use client"
import React, { useState } from "react";

import { 
  CalendarProps, 
  calendarHeader, calendarDates, calendarMonth
} from "./calendar.data";

import useCalendar from "@/hooks/useCalendar";

import Image from "next/image";
import prevButtonIcon from "@/assets/이전달화살표.svg"
import nextButtonIcon from "@/assets/다음달화살표.svg"
import datePickerIcon from "@/assets/datePicker.svg"

import { 
  basicHeaderStyle, weekdaysHeaderStyle, weekendsHeaderStyle,
  basicDateCellStyle, hoveredDateCellStyle, selectedDateCellStyle,
  basicDateTextStyle, defaultDateCellStyle, currentMonthDateTextStyle, otherMonthsDateTextStyle
} from "./calendar.style";


const Calendar = ({componentName}: CalendarProps) => {
  // 날짜 가져오기
  const [currentDate, setCurrentDate] = useState(new Date());           // 현재 날짜
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);  // 선택된 날짜
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);    // 호버된 날짜

  // 현재 달력에 표시할 전체 날짜 배열 가져오기
  const dates = calendarDates(currentDate);

  // 캘린더 전역 모듈
  const {getPrevMonthDate, getNextMonthDate} = useCalendar();

  return (
    <div className="bg-white rounded-[28px] border-[2.5px] border-[#E6E6E6]">

      {/* 달력 헤더 */}
      <div className="flex justify-between h-[full] border-b-[1.5px] py-3">
        <button onClick={() => setCurrentDate(getPrevMonthDate(currentDate))} className="px-4">
          <Image src={prevButtonIcon} alt="이전 달" className="w-5 h-5" />
        </button>
        <div className="flex items-center">
          <p className="text-[#212121] text-24 font-semibold mx-4">
            {currentDate.getFullYear()}. {calendarMonth(currentDate)}
          </p>
          <Image src={datePickerIcon} alt="datePicker" className="w-[18px] h-[18px] mb-[2px]" />
        </div>
        <button onClick={() => setCurrentDate(getNextMonthDate(currentDate))} className="px-4">
          <Image src={nextButtonIcon} alt="다음 달" className="w-5 h-5" />
        </button>
      </div>

        

      {/* 달력 내부 */}
      <div className="grid grid-cols-7">
        {/**요일 */}
        {calendarHeader.map((day) => (
          <div
            key={`${componentName}-calendarHeader-${day}`}
            //key={day} // SUN ~ SAT 고윳값 맞음
            className={`
              ${basicHeaderStyle}
              ${day === calendarHeader[0] || day === calendarHeader[calendarHeader.length-1]? weekendsHeaderStyle : weekdaysHeaderStyle}
            `}
          >
            {day}
          </div>
        ))}

        
        {/**날짜 */}
        {dates.map((date, index) => {
          const isSelected =
            date &&
            selectedDate &&
            date.toDateString() === selectedDate.toDateString();
          const isHovered =
            date &&
            hoveredDate &&
            date.toDateString() === hoveredDate.toDateString();
          const isCurrentMonth =
            date && date.getMonth() === currentDate.getMonth();


          {/** 특정 날짜 셀 '텍스트 데이터' 디자인 퍼블리싱 */}
          const dateContent = date ? (
            /* 호버 상태인 셀에 동그라미 표시 */
            <span className={`
                  ${isCurrentMonth && isSelected ? selectedDateCellStyle :
                    isCurrentMonth && isHovered ? hoveredDateCellStyle : defaultDateCellStyle}
            `}>
              <p className={`
                ${basicDateTextStyle}
                ${isCurrentMonth ? currentMonthDateTextStyle : otherMonthsDateTextStyle}
              `}>
                {date.getDate()}
              </p>
            </span>
          ) : null;


          {/** 날짜 셀에 이벤트 달기 + 출력할 내용 작성 */}
          const key = date ? `${componentName}-dateCell-${date}`: `${componentName}-dateCell-${index}`;
          return (
            <div
              key={key} 
              className={basicDateCellStyle}
              onClick={() => setSelectedDate(date)}
              onMouseOver={() => setHoveredDate(date)}
              onMouseOut={() => setHoveredDate(null)}
            >
              {dateContent}
            </div>
          );
        })}
        
      </div>
    </div>
  );
};

export default Calendar;