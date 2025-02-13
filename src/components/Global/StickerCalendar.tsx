"use client";
import React, { useState } from "react";

import {
  StickerCalendarProps,
  calendarHeader,
  calendarDates,
  calendarMonth,
} from "./calendar.data";

import { Emotion } from "@/app/report/data";

import useCalendar from "@/hooks/useCalendar";

import Image from "next/image";
import prevButtonIcon from "@/assets/이전달화살표.svg";
import nextButtonIcon from "@/assets/다음달화살표.svg";
import datePickerIcon from "@/assets/datePicker.svg";
import goodSticker from "@/assets/goodSticker.svg";
import sosoSticker from "@/assets/sosoSticker.svg";
import badSticker from "@/assets/badSticker.svg";

import {
  basicHeaderStyle,
  weekdaysHeaderStyle,
  weekendsHeaderStyle,
  basicDateCellStyle,
  basicStickerDateCellStyle,
  hoveredDateCellStyle,
  selectedDateCellStyle,
  basicDateTextStyle,
  defaultDateCellStyle,
  currentMonthDateTextStyle,
  otherMonthsDateTextStyle,
  basicStickerHeaderStyle,
  defaultStickerDateCellStyle,
  hoveredStickerDateCellStyle,
  selectedStickerDateCellStyle,
} from "./calendar.style";

const StickerCalendar = ({
  componentName,
  currentDate,
  selectedDate,
  hoveredDate,
  setCurrentDate,
  setSelectedDate,
  setHoveredDate,
  feedbackList,
}: StickerCalendarProps) => {
  // 날짜 가져오기 -> 부모로부터 props로 받아야 부모가 날짜 데이터 접근 가능
  /*
  const [currentDate, setCurrentDate] = useState(new Date());           // 현재 날짜
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);  // 선택된 날짜
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);    // 호버된 날짜
  */

  // 현재 달력에 표시할 전체 날짜 배열 가져오기
  const dates = calendarDates(currentDate);

  // 캘린더 전역 모듈
  const { getPrevMonthDate, getNextMonthDate } = useCalendar();

  // date(params)에 해당하는 feedbackData가 있는 지 여부
  const feedbackItemForDate = (date: Date) => {
    const feedbackItem = feedbackList.find((item) => {
      // Feedback(date, emotion, feedback, summary, user_id)에서
      // date(0000-00-00 형식의 string) 값을 날짜 객체로 변환
      const stickedDate = new Date(item.date); // 해당 날짜에는 이모지 스티커가 붙여져있음

      // d가 date와 같은 지를 반환
      return stickedDate.toDateString() === date.toDateString();
      /*
      return (
        stickedDate.getFullYear() === date.getFullYear() &&
        stickedDate.getMonth() === date.getMonth() &&
        stickedDate.getDate() === date.getDate()
      );
      */
    });
    return feedbackItem || null;
  };

  return (
    <div className="bg-white rounded-[28px] border-[2.5px] border-[#E6E6E6]">
      {/* 달력 헤더 */}
      <div className="flex justify-between h-[full] border-b-[1.5px] py-3">
        <button
          onClick={() => setCurrentDate(getPrevMonthDate(currentDate))}
          className="px-4"
        >
          <Image src={prevButtonIcon} alt="이전 달" className="w-5 h-5" />
        </button>
        <div className="flex items-center">
          <p className="text-[#212121] text-[20px] font-semibold mx-4">
            {currentDate.getFullYear()}. {calendarMonth(currentDate)}
          </p>
          <Image
            src={datePickerIcon}
            alt="datePicker"
            className="w-[18px] h-[18px] mb-[2px]"
          />
        </div>
        <button
          onClick={() => setCurrentDate(getNextMonthDate(currentDate))}
          className="px-4"
        >
          <Image src={nextButtonIcon} alt="다음 달" className="w-5 h-5" />
        </button>
      </div>

      {/* 달력 내부 */}
      <div className="grid grid-cols-7">
        {/** [1] 요일 */}
        {calendarHeader.map((day) => (
          <div
            key={`${componentName}-calendarHeader-${day}`}
            //key={day} // SUN ~ SAT 고윳값 맞음
            className={`
              ${basicStickerHeaderStyle}
              ${
                day === calendarHeader[0] ||
                day === calendarHeader[calendarHeader.length - 1]
                  ? weekendsHeaderStyle
                  : weekdaysHeaderStyle
              }
            `}
          >
            {day}
          </div>
        ))}

        {/** [2] 날짜 */}
        {dates.map((date, index) => {
          // [2-1] 날짜 셀 key값
          const key = date
            ? `${componentName}-dateCell-${date}`
            : `${componentName}-dateCell-${index}`;

          // [2-2] 상태 이벤트 변수
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

          // [2-3] 날짜 텍스트 변수
          const dateContent = date ? (
            <span // 호버상태인 셀에 동그라미 표시
              className={`
                  ${
                    isCurrentMonth && isSelected
                      ? selectedStickerDateCellStyle
                      : isCurrentMonth && isHovered
                      ? hoveredStickerDateCellStyle
                      : defaultStickerDateCellStyle
                  }
            `}
            >
              <p
                className={`
                ${basicDateTextStyle}
                ${
                  isCurrentMonth
                    ? currentMonthDateTextStyle
                    : otherMonthsDateTextStyle
                }
              `}
              >
                {date.getDate()}
              </p>
            </span>
          ) : null;

          // [2-3] 감정 이모지 렌더링 변수
          // 해당 날짜에 스티커가 붙여져있으면 feedbackItem, 없으면 null
          const feedback = feedbackItemForDate(date);
          const emotionSticker = feedback ? (
            feedback.emotion === Emotion.happy ? (
              <Image
                src={goodSticker}
                alt="goodSticker"
                className="w-[70px] h-[70px]"
              />
            ) : feedback.emotion === Emotion.soso ? (
              <Image
                src={sosoSticker}
                alt="sosoSticker"
                className="w-[70px] h-[70px]"
              />
            ) : feedback.emotion === Emotion.bad ? (
              <Image
                src={badSticker}
                alt="badSticker"
                className="w-[70px] h-[70px]"
              />
            ) : (
              <></>
            )
          ) : (
            <></>
          );

          // [2-4] 최종 날짜 셀 렌더링 반환
          return (
            <div
              key={key}
              className={basicStickerDateCellStyle}
              onClick={() => setSelectedDate(date)}
              onMouseOver={() => setHoveredDate(date)}
              onMouseOut={() => setHoveredDate(null)}
            >
              <div className="flex justify-start items-center ml-10">
                {dateContent}
              </div>
              <div className="">{emotionSticker}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StickerCalendar;
