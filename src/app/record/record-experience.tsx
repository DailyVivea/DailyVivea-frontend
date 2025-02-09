"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";

const RecordExperiencePage = ({ setStep, activeStep, setActiveStep }: { 
    setStep: (step: number) => void;
    activeStep: number;
    setActiveStep: (step: number) => void;
}) => {
    return (
        <div className="record-experience">
            <button 
                className="back-button" 
                onClick={() => {
                    setActiveStep(0); // ✅ ProgressBar 업데이트
                    setStep(0); // ✅ 이전 페이지로 이동
                }}>
                <ArrowLeft size={32} />
            </button>

            <h1>경험 기록 페이지</h1>
            <p>여기에 경험을 기록하는 UI를 추가하세요.</p>
        </div>
    );
};

export default RecordExperiencePage;
