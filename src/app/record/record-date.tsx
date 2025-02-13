"use client";

import React, { useState } from "react";
import Header from "@/components/Layout/Header";
import Calendar from "@/components/Global/Calendar";
import ProgressBar from "@/components/record/ProgressBar";
import { ArrowRight } from "lucide-react";
import "@/style/record/recordLayout.css";
import "@/style/record/progressBar.css";

const RecordDatePage = ({
  setStep,
  activeStep,
  setActiveStep,
}: {
  setStep: (step: number) => void;
  activeStep: number;
  setActiveStep: (step: number) => void;
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  return (
    <div className="record-page">
      <div className="title-container">
        <div className="record-title">경험을 기록할 날짜를 선택해주세요</div>
        <button
          className="nav-button"
          onClick={() => {
            setActiveStep(1); // ✅ ProgressBar 업데이트
            setStep(1); // ✅ 다음 페이지로 이동
          }}
        >
          <ArrowRight size={32} />
        </button>
      </div>

      <div className="px-[20%]">
        <Calendar
          componentName="RecordDate"
          currentDate={currentDate}
          selectedDate={selectedDate}
          hoveredDate={hoveredDate}
          setCurrentDate={setCurrentDate}
          setSelectedDate={setSelectedDate}
          setHoveredDate={setHoveredDate}
        />
      </div>

      <div className="progress-bar-container">
        <ProgressBar activeStep={activeStep} />
      </div>
    </div>
  );
};

export default RecordDatePage;
