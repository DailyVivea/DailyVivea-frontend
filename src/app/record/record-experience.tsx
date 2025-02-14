"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import ProgressBar from "@/components/record/ProgressBar";
import "@/style/record/recordLayout.css";
import "@/style/record/experience.css";

const emotions = [
    { id: 1, label: "행복했어요", image: "@/assets/images/happy.png", color: "#FFDFFC" },
    { id: 2, label: "우울했어요", image: "@/assets/images/sad.png", color: "#DEFFFC" },
    { id: 3, label: "그저 그랬어요", image: "@/assets/images/soso.png", color: "#FFFFAA" },
];

const RecordExperiencePage = ({
    setStep,
    activeStep,
    setActiveStep,
    experienceId
}: {
    setStep: (step: number) => void;
    activeStep: number;
    setActiveStep: (step: number) => void;
    experienceId: number;
}) => {
    const [selectedEmotion, setSelectedEmotion] = useState<number | null>(null);
    const [showTip, setShowTip] = useState(false);
    const [experienceText, setExperienceText] = useState("");
    const [loading, setLoading] = useState(false);


    const handleSubmit = async () => {
        if (!experienceText.trim()) {
            alert("경험 내용을 입력해주세요.");
            return;
        }
        if (selectedEmotion === null) {
            alert("감정을 선택해주세요.");
            return;
        }

        setLoading(true);

        console.log(
            "experienceText:", experienceText, "Type:", typeof experienceText,
            "selectedEmotion:", selectedEmotion, "Type:", typeof selectedEmotion,
            "emotionLabel:", emotions.find((e) => e.id === selectedEmotion)?.label, "Type:", typeof emotions.find((e) => e.id === selectedEmotion)?.label
        );

        const emotionLabel = emotions.find((e) => e.id === selectedEmotion)?.label || "";

        try {
            const response = await fetch(`https://gunanana.onrender.com/api/${experienceId}/record`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: experienceText,
                    emotion: emotionLabel,
                }),
            });


            // 응답 상태와 내용 확인
            const data = await response.json();

            if (response.ok) {
                console.log("경험 기록 및 감정 선택 완료:", data.message, experienceId);
                setActiveStep(2);
                setStep(2);
                
            } else {
                alert(data.message || "알 수 없는 오류가 발생했습니다.");
            }
        } catch (err) {
            console.error("서버 연결 실패:", err);
            alert("서버와 연결할 수 없습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="record-page">
            {/* 제목 & 네비게이션 */}
            <div className="title-container">
                <div className="record-title">오늘의 경험을 작성해주세요</div>
                <div className="button-container">
                    <button className="back-button" 
                        onClick={() => {
                            setStep(0); 
                            setActiveStep(0);
                        }}>
                        <ArrowLeft size={32} />
                    </button>
                    <button className="nav-button"           
                        onClick={handleSubmit}>
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
                        value={experienceText}
                        onChange={(e) => setExperienceText(e.target.value)}
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
                                <img src={emotion.image} alt={emotion.label} className="emotion-image" />
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
