"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import ProgressBar from "@/components/record/ProgressBar";
import "@/style/record/recordLayout.css";
import "@/style/record/experience.css";

const emotions = [
    { id: 1, label: "행복했어요", icon: "❤️", color: "#FCE4EC" },
    { id: 2, label: "우울했어요", icon: "🌧", color: "#E3F2FD" },
    { id: 3, label: "그냥 그랬어요", icon: "😐", color: "#FFF3E0" },
];

const RecordExperiencePage = ({ setStep, activeStep, setActiveStep }: { 
    setStep: (step: number) => void;
    activeStep: number;
    setActiveStep: (step: number) => void;
}) => {
    const [selectedEmotion, setSelectedEmotion] = useState<number | null>(null);
    const [showTip, setShowTip] = useState(false);

    return (
        <div className="record-page">
            {/* 제목 & 네비게이션 */}
            <div className="title-container">
                <div className="record-title">오늘의 경험을 작성해주세요</div>
                <div className="button-container">
                    <button className="back-button" onClick={() => setStep(0)}>
                        <ArrowLeft size={32} />
                    </button>
                    <button className="nav-button" onClick={() => setStep(2)}>
                        <ArrowRight size={32} />
                    </button>
                </div>
            </div>

            {/* 상단 버튼 */}
            <div className="type-button-container">
                <button className="type-button active">경험 기록</button>
                <button className="type-button">감정 기록</button>
            </div>

            <div className="record-container">

                {/* 경험 기록 */}
                <div className="experience-section">
                    <textarea  
                        className="experience-textarea"
                        placeholder="오늘 어떤 경험을 했나요?"
                    />
                    <div 
                        className="info-icon"
                        onMouseEnter={() => setShowTip(true)}
                        onMouseLeave={() => setShowTip(false)}
                    >
                        <Info size={20} />
                        {showTip && (
                            <div className="tip-container">
                                [Tip] 육하 원칙(누가, 언제, 어디서, 무엇을, 어떻게, 왜)를 사용하면 좀 더 명확한 경험을 작성할 수 있어요!
                            </div>
                        )}
                    </div>
                </div>

                {/* 감정 기록 */}
                <div className="emotion-section">
                    <div className="emotion-container">
                        {emotions.map((emotion) => (
                            <div
                                key={emotion.id}
                                className={`emotion-card ${selectedEmotion === emotion.id ? "selected" : ""}`}
                                style={{ backgroundColor: emotion.color }}
                                onClick={() => setSelectedEmotion(emotion.id)}
                            >
                                <span className="emotion-icon">{emotion.icon}</span>
                                <span className="emotion-label">{emotion.label}</span>
                            </div>
                        ))} 
                    </div>
                </div>
            </div>



            {/* 진행 상태 바 */}
            <div className="progress-bar-container">
                <ProgressBar activeStep={activeStep} />
            </div>  
        </div>
    );
};

export default RecordExperiencePage;
