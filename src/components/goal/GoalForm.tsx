"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "./Button";
import Calendar from "../Global/Calendar";
import "../../style/goal/GoalForm.css";

const GoalForm: React.FC<{ userId: number }> = ({ userId }) => {
  const [title, setTitle] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [weeks, setWeeks] = useState<number>(0);
  const [times, setTimes] = useState<number>(0);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [error, setError] = useState<string>("");

  // 현재 날짜 상태 관리
  const [currentDate, setCurrentDate] = useState(new Date());

  const router = useRouter();


  useEffect(() => {
    const savedGoal = localStorage.getItem("goal");
    if (savedGoal) {
      const parsedGoal = JSON.parse(savedGoal);
      setTitle(parsedGoal.title || "");
      setDetails(parsedGoal.details || "");
      setWeeks(parsedGoal.interval?.week || 0);
      setTimes(parsedGoal.interval?.times || 0);
      const savedStartDate = parsedGoal.term?.startDate ? new Date(parsedGoal.term.startDate) : null;
      const savedEndDate = parsedGoal.term?.endDate ? new Date(parsedGoal.term.endDate) : null;
  
      setStartDate(savedStartDate);
      setEndDate(savedEndDate);
  
      // 캘린더에서 선택된 날짜 유지
      setHoveredDate(savedEndDate); // endDate로 hoveredDate 설정
    }
  }, []);
  
  

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

  const handleSaveLocal = () => {
    const goalData = {
      title,
      details,
      interval: { week: weeks, times },
      term: { startDate, endDate },
      isTemporary: true, // 임시 저장일 경우 isTemporary는 true로 설정
    };

    localStorage.setItem("goal", JSON.stringify(goalData));
    alert("목표가 임시 저장되었습니다!");
  };

  const handleSubmit = async () => {
    if (startDate && endDate && endDate < startDate) {
      setError("종료 날짜는 시작 날짜 이후여야 합니다.");
      return;
    }

    const goalData = {
      title: title,
      content: details,
      interval_weeks: weeks,
      interval_times: times,
      start_date: startDate ? startDate.toISOString().split("T")[0] : "",
      end_date: endDate ? endDate.toISOString().split("T")[0] : "",
      isTemporary: false, // 서버에 보낼 데이터로 임시 저장 여부를 false로 설정
    };

    try {
      const response = await fetch(`https://gunanana.onrender.com/api/${userId}/setGoal`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(goalData),
      });

      if (response.ok) {
        const result = await response.json();
        localStorage.setItem("goal", JSON.stringify(goalData));
        alert("목표가 성공적으로 저장되었습니다!");
        router.push("/goal/createdGoal");
      } else {
        const result = await response.json();
        alert("서버 저장에 실패했습니다.");
        const goalDataWithTemp = {
          ...goalData,
          isTemporary: true,
        };
        localStorage.setItem("goal", JSON.stringify(goalDataWithTemp));
      }
    } catch (error) {
      alert("서버 오류가 발생했습니다.");
      const goalDataWithTemp = {
        ...goalData,
        isTemporary: true,
      };
      localStorage.setItem("goal", JSON.stringify(goalDataWithTemp));
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
          <div className="goalForm__interval__between">마다</div>
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
          currentDate={currentDate}
          selectedDate={startDate}  
          hoveredDate={endDate} 
          setCurrentDate={setCurrentDate} 
          setSelectedDate={handleDateSelect} 
          setHoveredDate={setHoveredDate}  
        />
      </div>

      {/* 에러 메시지 */}
      {error && <div className="error-message">{error}</div>}

      {/* 버튼 영역 */}
      <div className="goalForm__btns">
        <Button text="임시저장" onClick={handleSaveLocal} />
        <Button text="완료하기" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default GoalForm;
