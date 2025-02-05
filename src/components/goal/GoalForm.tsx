"use client"

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 추가
import Button from "./Button";
import "../../style/goal/GoalForm.css";

const GoalForm: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [weeks, setWeeks] = useState<number>(0);
  const [times, setTimes] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const navigate = useNavigate(); 

  useEffect(() => {
    const savedGoal = localStorage.getItem("goal");

    if (savedGoal) {
      const parsedGoal = JSON.parse(savedGoal);
      setTitle(parsedGoal.title || "");
      setDetails(parsedGoal.details || "");
      setWeeks(parsedGoal.interval?.week || 0);
      setTimes(parsedGoal.interval?.times || 0);
      setStartDate(parsedGoal.term?.start || "");
      setEndDate(parsedGoal.term?.end || "");
    }
  }, []);

  const handleSaveLocal = () => {
    const goalData = {
      title,
      details,
      interval: { week: weeks, times },
      term: { start: startDate, end: endDate },
    };

    localStorage.setItem("goal", JSON.stringify(goalData));
    alert("목표가 임시 저장되었습니다!");
  };

  const handleSubmit = async () => {
    const goalData = {
      title,
      detail: details,
      interval: { week: weeks, times },
      term: { start: startDate, end: endDate },
    };

    try {
      const response = await fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(goalData),
      });

      if (response.ok) {
        const result = await response.json();
        alert(`목표가 성공적으로 저장되었습니다! ID: ${result.goalId}`);
        localStorage.removeItem("goal"); // 서버에 저장되면 로컬 데이터 삭제

        // 성공적으로 저장 후 다른 페이지로 이동
        navigate("/goal/createdGoal"); // 여기서 이동
      } else {
        alert("저장에 실패했습니다.");
      }
    } catch (error) {
      console.error("목표 저장 오류:", error);
      alert("서버 오류가 발생했습니다.");

      navigate("/goal/createdGoal"); // 여기서 이동
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
        <label>시작일</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div className="goalForm__date">
        <label>종료일</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
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
