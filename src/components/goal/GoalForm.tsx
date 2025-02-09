"use client"

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "./Button";
import Calendar from "../Global/Calendar";
import "../../style/goal/GoalForm.css";

const GoalForm: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [weeks, setWeeks] = useState<number>(0);
  const [times, setTimes] = useState<number>(0);
  const [startDate, setStartDate] = useState<Date | null>(null); 
  const [endDate, setEndDate] = useState<Date | null>(null); 
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  const handleDateSelect = (date: Date | null) => {
    if (!startDate || (startDate && endDate)) {

      setStartDate(date);
      setEndDate(null);
    } else if (startDate && !endDate) {

      if (date && date < startDate) {

        setStartDate(date);
      } else {
        setEndDate(date);
      }
    }
  };

  const router = useRouter();

  useEffect(() => {
    const savedGoal = localStorage.getItem("goal");
    if (savedGoal) {
      const parsedGoal = JSON.parse(savedGoal);
      setTitle(parsedGoal.title || "");
      setDetails(parsedGoal.details || "");
      setWeeks(parsedGoal.interval?.week || 0);
      setTimes(parsedGoal.interval?.times || 0);
      setStartDate(parsedGoal.term?.startDate ? new Date(parsedGoal.term.startDate) : null);
      setEndDate(parsedGoal.term?.endDate ? new Date(parsedGoal.term.endDate) : null);
    }
  }, []);

  const handleSaveLocal = () => {
    const goalData = {
      title,
      details,
      interval: { week: weeks, times },
      term: { startDate, endDate },
    };

    localStorage.setItem("goal", JSON.stringify(goalData));
    alert("목표가 임시 저장되었습니다!");
    console.log("제목", title, "세부내용", details, "실행간격", weeks, times, "시작일", startDate, "종료일", endDate);
  };

  const handleSubmit = async () => {
    const goalData = {
      title,
      detail: details,
      interval: { week: weeks, times },
      term: { startDate, endDate },
    };

    console.log(goalData);

    try {
      const response = await fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(goalData),
      });

      if (response.ok) {
        const result = await response.json();
        alert(`목표가 성공적으로 저장되었습니다! ID: ${result.goalId}`);
        console.log("저장완료:", "제목", title, "세부내용", details, "실행간격", weeks, times, "시작일", startDate, "종료일", endDate);
        localStorage.removeItem("goal");
        router.push("/goal/createdGoal");
      } else {
        alert("서버 저장에 실패했습니다. 임시 저장합니다.");
        localStorage.setItem("goal", JSON.stringify(goalData)); // 🔴api 완성 전까지 임시로 로컬 스토리지에 저장
        router.push("/goal/createdGoal");
      }
    } catch (error) {
      alert("서버 오류가 발생했습니다. 임시 저장합니다.");
      localStorage.setItem("goal", JSON.stringify(goalData)); // 🔴api 완성 전까지 서버 오류 시 로컬 스토리지에 저장
      router.push("/goal/createdGoal");
    }
  };

  return (
    <div className="goalForm">
      {/* 목표 제목 입력 */}
      <div className="goalForm__title">
        <div className="label">목표 제목</div>
        <textarea
          placeholder="제목을 작성해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* 목표 세부내용 입력 */}
      <div className="goalForm__detail">
        <div className="label">목표 세부내용</div>
        <textarea
          placeholder="세부 내용을 입력하세요"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
      </div>

      {/* 실행 간격 설정 */}
      <div className="goalForm__interval">
        <div className="label">실행 간격 설정</div>
        <div className="goalForm__interval__control">
          <div className="goalForm__interval__week">
            <button onClick={() => setWeeks((prev) => Math.max(prev - 1, 0))}>-</button>
            <span>{weeks}주</span>
            <button onClick={() => setWeeks((prev) => prev + 1)}>+</button>
          </div>
          <div>마다</div>
          <div className="goalForm__interval__count">
            <button onClick={() => setTimes((prev) => Math.max(prev - 1, 0))}>-</button>
            <span>{times}회</span>
            <button onClick={() => setTimes((prev) => prev + 1)}>+</button>
          </div>
        </div>
      </div>

      {/* 기간 설정 */}
      <div className="goalForm__date">
        <div className="label">기간 설정</div>
        <Calendar
          componentName="GoalDate"
          currentDate={startDate || new Date()}
          selectedDate={startDate} // 기존 selectedDate에는 startDate 전달
          hoveredDate={endDate} // 종료일을 hoveredDate로 전달하여 UI에서 표시 가능
          setCurrentDate={() => {}} // 기존 로직 유지
          setSelectedDate={handleDateSelect} // 날짜 선택 시 `handleDateSelect` 실행
          setHoveredDate={setHoveredDate} // 필요하면 hover된 날짜 UI 반영 가능
        />
        <p>선택된 기간: {startDate?.toLocaleDateString()} ~ {endDate?.toLocaleDateString()}</p>
      </div>

      {/* 버튼 영역 */}
      <div className="goalForm__btns">
        <Button text="임시저장" onClick={handleSaveLocal} />
        <Button text="완료하기" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default GoalForm;
