"use client";

import React, { useState, useEffect } from "react";
import { Download, ChevronRight, Check } from "lucide-react";
import ProgressBar from "@/components/record/ProgressBar";
import "@/style/record/recordLayout.css";
import "@/style/record/recommend.css";

const goals = [
    { id: 1, title: "주 1회 발표 연습하기", description: "4주동안 간단한 주제를 정해 매주 1회 5분 이상 발표 연습을 완료해보세요!", completed: true },
    { id: 2, title: "시선 처리 및 말하기 연습", description: "2주동안 거울 앞에서 발표하며 시선 처리와 말하기를 3회 이상 완료해보세요!", completed: true },
    { id: 3, title: "작은 그룹에서 발표하기", description: "2주동안 친구나 동료 2명 이상 앞에서 최소 2회 그룹 발표를 완료해보세요!", completed: false },
    { id: 4, title: "목소리 톤과 속도 조절 연습", description: "2주동안 녹음기를 사용해 녹음 연습 3회 이상 완료해보세요!", completed: false },
];

const learningResources = [
    { 
        id: 1, 
        title: "TED 연사처럼 발표하기: 발표 기술의 핵심 팁", 
        description: "발표 불안 극복과 청중의 주목을 끄는 방법에 대한 강연", 
        link: "https://www.ted.com/talks/example", 
        image: "@/assets/images/ted-presentation.png",
        icon: "/icons/youtube.svg"
    },
    { 
        id: 2, 
        title: "Effective Presentation Techniques In Education", 
        description: "발표 구조와 비언어적 의사소통의 중요성을 다룬 연구 논문", 
        link: "https://www.researchgate.net/publication/example", 
        icon: "/icons/document.svg"
    },
    { 
        id: 3, 
        title: "Online Speech Timer", 
        description: "발표 연습 타이머", 
        link: "https://www.speechtimer.com", 
        icon: "/icons/timer.svg"
    },
];

const RecommendPage = ({ setStep, activeStep, setActiveStep }: { 
    setStep: (step: number) => void;
    activeStep: number;
    setActiveStep: (step: number) => void;
}) => {
    const [selectedGoals, setSelectedGoals] = useState<number[]>([]);
    const [previewImages, setPreviewImages] = useState<{ [key: string]: string }>({});

    const toggleGoal = (id: number) => {
        setSelectedGoals((prev) =>
            prev.includes(id) ? prev.filter(goalId => goalId !== id) : [...prev, id]
        );
    };

    useEffect(() => {
        learningResources.forEach(async (resource) => {
            if (!resource.image) {
                try {
                    const response = await fetch(`https://api.linkpreview.net/?key=YOUR_API_KEY&q=${resource.link}`);
                    const data = await response.json();
                    setPreviewImages((prev) => ({ ...prev, [resource.link]: data.image }));
                } catch (error) {
                    console.error("미리보기 이미지를 불러오는 중 오류 발생:", error);
                }
            }
        });
    }, []);

    return (
        <div className="record-page">
            {/* 제목 & 네비게이션 */}
            <div className="title-container">
                <h1 className="record-title">오늘 경험을 토대로 추천 목표를 알려드려요!</h1>
                <button className="custom-goal-button">
                    나만의 목표 설정하러 가기 
                    <div className="icon-wrapper">
                        <ChevronRight size={18} strokeWidth={3} className="custom-goal-icon" />
                    </div>
                </button>
            </div>
            
            {/* 콘텐츠 영역 */}
            <div className="box-container">
                {/* 목표 리스트 */}
                <div className="goal-container">
                    {goals.map((goal) => (
                        <button 
                            key={goal.id}
                            className={`goal-item ${selectedGoals.includes(goal.id) ? "selected" : ""}`}
                            onClick={() => toggleGoal(goal.id)}
                        >
                            <div className="goal-content">
                                <span className="goal-number">{goal.id}</span>
                                <div className="goal-text">
                                    <h2>{goal.title}</h2>
                                    <p>{goal.description}</p>
                                </div>
                            </div>
                            <div className="goal-icon">
                                {selectedGoals.includes(goal.id) ? (
                                    <Check size={24} className="goal-check" />
                                ) : (
                                    <Download size={24} className="goal-download" />
                                )}
                            </div>
                        </button>
                    ))}

                    {/* 저장된 목표 확인 버튼 */}
                    <div className="goal-save-container">
                        <button className="goal-save-button">저장된 목표 확인하기</button>
                    </div>
                </div>

                {/* 학습 자료 추천 */}
                <div className="learning-section">
                    <h2>✏️ 학습 자료 및 추천</h2>
                    <div className="learning-container">
                        {learningResources.map((resource, index) => (
                            <div key={resource.id} className="learning-card">
                                <div className="learning-content">
                                    <img src={resource.icon} alt="icon" className="learning-icon"/>
                                    <div className="learning-text">
                                        <h3>{resource.title}</h3>
                                        <p>{resource.description}</p>
                                    </div>
                                    <div className="learning-link-container">
                                        <a href={resource.link} target="_blank" rel="noopener noreferrer" className="learning-link">
                                            <img src="@/assets/icons/link.svg" alt="link icon"/>
                                        </a>
                                        <ChevronRight className="chevron-icon" />
                                    </div>
                                </div>
                                {/* 첫 번째 항목만 미리보기 이미지 표시 */}
                                {index === 0 && (
                                    <img 
                                        src={previewImages[resource.link] || resource.image} 
                                        alt={resource.title} 
                                        className="learning-image" 
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="progress-bar-container">
                <ProgressBar activeStep={activeStep} />
            </div>
        </div>
    );
};

export default RecommendPage;
