"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProgressBar from "@/components/record/ProgressBar";
import "@/style/record/recordLayout.css";
import "@/style/record/loading.css"

const LoadingPage = ({ setStep, activeStep, setActiveStep }: { 
    setStep: (step: number) => void;
    activeStep: number; 
    setActiveStep: (step: number) => void;
    //progressBar 단계 변경 X
}) => {

    return (
        <div className="record-page">
            {/* 네비게이션 */}
            <div className="title-container">
                <h1 className="record-title"></h1>
                <div className="button-container">
                    <button className="back-button" 
                        onClick={() => {
                            setStep(1); 
                            setActiveStep(1);
                        }}>
                        <ArrowLeft size={32} />
                    </button>
                    <button className="nav-button"                     
                        onClick={() => {
                            setActiveStep(2); // ✅ ProgressBar 이동 X
                            setStep(3); // ✅ 다음 페이지로 이동
                        }}>
                        <ArrowRight size={32} />
                    </button>
                </div>
            </div>

            {/* 본문 - 제목, 이미지 */ }
            <div className="content-container">
                <h1 className="record-title">오늘의 경험을 분석하고 있어요</h1>
                <p className="record-subtitle">AI가 꼼꼼히 분석 중이에요</p>
                <img src="@/assets/images/loading.png" alt="AI 분석 중" className="loading-image" />
            </div>

            {/* 진행 상태 바 */}
            <div className="progress-bar-container">
                <ProgressBar activeStep={activeStep} />
            </div>  
        </div>
    );
};

export default LoadingPage;
