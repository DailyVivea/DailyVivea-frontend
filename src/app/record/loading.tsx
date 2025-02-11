"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProgressBar from "@/components/record/ProgressBar";
import "@/style/record/recordLayout.css";
import "@/style/record/loading.css"

const RecordLoadingPage = ({ setStep, activeStep }: { 
    setStep: (step: number) => void;
    activeStep: number; //progressBar 단계 변경 X
    
}) => {
    const [showTip, setShowTip] = useState(false);

    const experienceId = 123; // 🔴실제 경험 ID로 변경 필요

    // 경험 분석 API 호출
    useEffect(() => {
        const analyzeExperience = async () => {
            try {
                const response = await fetch(`/api/${experienceId}/analysis`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({}),
                });

                const data = await response.json();

                if (response.ok) {
                    setStep(3); // Step 4로 이동
                } else {
                    throw new Error(data.message || "경험 분석에 실패했습니다.");
                }
            } catch (err: any) {
                alert(err.message || "분석 중 오류가 발생했습니다.");
                setStep(1); // 🔹 Step 2(경험 기록)으로 돌아감
            }

        };

        analyzeExperience();
    }, [experienceId, setStep]);

    return (
        <div className="record-page">
            {/* 네비게이션 */}
            <div className="title-container">
                <h1 className="record-title"></h1>
                <div className="button-container">
                    <button className="back-button" onClick={() => setStep(1)}>
                        <ArrowLeft size={32} />
                    </button>
                    <button className="nav-button" onClick={() => setStep(3)}>
                        <ArrowRight size={32} />
                    </button>
                </div>
            </div>

            {/* 본문 - 제목, 이미지 */ }
            <div className="content-container">
                <h1 className="record-title">오늘의 경험을 분석하고 있어요</h1>
                <p className="record-subtitle">AI가 꼼꼼히 분석 중이에요</p>
                <img src="/images/loading.png" alt="AI 분석 중" className="loading-image" />
            </div>

            {/* 진행 상태 바 */}
            <div className="progress-bar-container">
                <ProgressBar activeStep={activeStep} />
            </div>  
        </div>
    );
};

export default RecordLoadingPage;
