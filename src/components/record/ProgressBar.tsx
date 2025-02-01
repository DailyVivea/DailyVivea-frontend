import React from "react";

const steps = ["날짜 선택하기", "경험 기록하기", "경험 피드백", "목표 추천"];

const ProgressBar = ({ activeStep }: {activeStep: number} ) => {
  return (
    <div className="progress-bar">
      {steps.map((step, index) => (
        <div key={index} className={`progress-step ${index === activeStep ? "active": ""}`}>
          {step}
          </div>
      ))}
    </div>
  );
};

export default ProgressBar;