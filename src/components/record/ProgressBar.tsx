import React from "react";

const steps = ["❶ 날짜 선택하기", "❷ 경험 기록하기", "❸ 경험 피드백", "❹ 목표 추천"];

const ProgressBar = ({ activeStep }: { activeStep: number }) => {
  return (
    <div className="progress-bar-container">
      <div className="progress-track" style={{ "--active-step": `${activeStep}` } as React.CSSProperties}></div>
      <div className="progress-step-container">
        {steps.map((step, index) => (
          <div key={index} className={`progress-step ${index === activeStep ? "active" : ""}`}>
            <span className="progress-text">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
