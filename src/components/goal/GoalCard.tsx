// src/components/GoalCard.tsx
import React from "react";

interface GoalCardProps {
  title: string;
  interval: { week: number; times: number };
  startDate: Date | null;
  endDate: Date | null;
}

const GoalCard: React.FC<GoalCardProps> = ({ title, interval, startDate, endDate }) => {
  return (
    <div className="goalCard">
      {/* 제목 */}
      <div className="goalCard__title">
        <strong>목표 제목:</strong> {title}
      </div>

      {/* 실행 간격 */}
      <div className="goalCard__interval">
        <strong>실행 간격:</strong> {interval.week}주마다 {interval.times}회 이상
      </div>

      {/* 기간 */}
      <div className="goalCard__term">
        <strong>기간:</strong> {startDate ? startDate.toLocaleDateString() : "미정"} ~ {endDate ? endDate.toLocaleDateString() : "미정"}
      </div>
    </div>
  );
};

export default GoalCard;
