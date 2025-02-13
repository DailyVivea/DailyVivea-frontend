"use client";

import React, { useState } from "react";
import RecordDatePage from "./record-date";
import RecordExperiencePage from "./record-experience";
import LoadingPage from "./loading";
import FeedbackPage from "./feedback";
import RecommendPage from "./recommend";

const RecordPage = () => {
    const [step, setStep] = useState(0); // ✅ 페이지 전환 상태 (0: 날짜 선택, 1: 경험 기록 2: 로딩 3: 피드백 4: 추천 목표)
    const [activeStep, setActiveStep] = useState(0); // ✅ ProgressBar 상태 관리
    const [experienceId, setExperienceId] = useState<number | null>(null); // ✅ 경험 ID 저장
    const [isLoading, setIsLoading] = useState(false);

    const handleSetStep = (newStep: number) => {
        if (newStep === 2) {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                setStep(newStep);
            }, 500); // 예시로 0.5초 후 로딩 종료
        } else {
            setStep(newStep);
        }
    };

    return (
        <div>
            {step === 0 && (
                <RecordDatePage setStep={handleSetStep} activeStep={activeStep} setActiveStep={setActiveStep}
                setExperienceId={setExperienceId} />
            )}
            {step === 1 && experienceId !== null && (
                <RecordExperiencePage setStep={handleSetStep} activeStep={activeStep} setActiveStep={setActiveStep}
                experienceId={experienceId} />
            )}
            {step === 2 && experienceId !== null && (
                <LoadingPage
                step = {step}
                setStep={handleSetStep} 
                activeStep={activeStep} setActiveStep={setActiveStep}
                experienceId={experienceId}/>
            )}
            {step === 3 && experienceId !== null && (
                <FeedbackPage setStep={handleSetStep} activeStep={activeStep} setActiveStep={setActiveStep}
                experienceId={experienceId} />
            )}
            {step === 4 && experienceId !== null && (
                <RecommendPage setStep={handleSetStep} activeStep={activeStep} setActiveStep={setActiveStep}
                experienceId={experienceId} />
            )}
        </div>
    );
};

export default RecordPage;
