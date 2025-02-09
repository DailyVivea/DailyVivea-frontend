"use client";

import React, { useEffect, useState } from "react";
import GoalCard from "@/components/goal/GoalCard";
import '../../../style/goal/goalCreatedPage.css';

const Page = () => {
  const [goalData, setGoalData] = useState<any>(null);

  useEffect(() => {
    const savedGoal = localStorage.getItem("goal");
    if (savedGoal) {
      setGoalData(JSON.parse(savedGoal)); // 로컬 스토리지에서 저장된 goal 데이터를 불러옴
    }
  }, []);

  return (
    <div className="createdGoal__container">
      {/* 제목 */}
      <h1 className="createdGoal__title">목표 카드를 생성했어요</h1>

      {/* 목표 카드 컴포넌트 */}
      {goalData ? (
        <GoalCard
          title={goalData.title}
          interval={goalData.interval}
          startDate={goalData.term?.startDate ? new Date(goalData.term.startDate) : null}
          endDate={goalData.term?.endDate ? new Date(goalData.term.endDate) : null}
        />
      ) : (
        <p>저장된 목표 정보가 없습니다.</p>
      )}

      {/* 카드 보러가기 버튼 */}
      <button className="createdGoal__button">
        카드 보러가기
        <span className="createdGoal__arrow">></span>
      </button>
    </div>
  );
};

export default Page;

