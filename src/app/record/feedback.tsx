"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Download } from "lucide-react";
import ProgressBar from "@/components/record/ProgressBar";
import "@/style/record/recordLayout.css";
import "@/style/record/feedback.css";

const RecordFeedbackPage = ({ setStep, activeStep, setActiveStep }: { 
    setStep: (step: number) => void;
    activeStep: number;
    setActiveStep: (step: number) => void;
}) => {

    return (
        <div className="record-page">
            {/* 제목 & 네비게이션 */}
            <div className="title-container">
                <h1 className="record-title">오늘 발표가 좀 어려우셨던 것 같아요!</h1>
                <div className="button-container">
                    <button className="back-button" 
                        onClick={() => {
                            setStep(2); 
                            setActiveStep(2);
                        }}>
                        <ArrowLeft size={32} />
                    </button>
                    <button className="nav-button"                     
                        onClick={() => {
                            setActiveStep(3); // ✅ ProgressBar 이동
                            setStep(4); // ✅ 다음 페이지로 이동
                        }}>
                        <ArrowRight size={32} />
                    </button>
                </div>
            </div>

            {/* 키워드, 다운로드 */}
            <div className="title-container">
                <div className="keyword-container">
                    <button className="keyword-button">발표</button>
                    <button className="keyword-button">청중 반응</button>
                    <button className="keyword-button">긴장감</button>
                    <button className="keyword-button">준비 부족</button>
                </div>

                <button className="save-button">
                    피드백 저장하기 <Download size={16} />
                </button>
            </div>

            {/* 피드백 카드들 */}
            <div className="box-container">
                <div className="feedback-container">

                    {/* 경험 피드백 */}
                    <div className="feedback-card">
                        <h2>🪴 오늘의 경험에 대한 피드백</h2>
                        <p>
                            먼저, 발표에서의 어려움은 누구나 겪을 수 있는 일이에요. 중요한 건 그 경험을 
                            어떻게 받아들이고 성장의 기회로 삼느냐입니다. 당신이 오늘 상당한 우울감을 
                            느낀 건 그만큼 발표에 진지하게 임했고, 잘하고 싶었던 마음이 컸기 때문이에요.
                        </p>
                    </div>

                    {/* 가장 많이 사용된 키워드 */}
                    <div className="feedback-card">
                        <h2>💬 가장 많이 사용된 키워드</h2>
                        <ul>
                            <li>🗣️ 떨림 <span>8회</span></li>
                            <li>🎤 발표 <span>5회</span></li>
                            <li>💭 망쳤다 <span>2회</span></li>
                        </ul>
                    </div>
                </div>

                {/* 감정 분석 */}
                <div className="feedback-card">
                    <h2>오늘 감정 분포도</h2>
                    <p>
                        오늘의 발표가 마음에 들지 않았을 수도 있지만, 그 경험 자체가 이미 성장의 한 
                        걸음이에요. 낯설었던 일일수록 당신이 많이 있어요. 조금씩 나아가는 당신을 믿어요.
                    </p>
                    <img src="/images/emotion-chart.png" alt="감정 분석 차트" className="feedback-image" />
                </div>

                {/* 성장 포인트 */}
                <div className="feedback-card">
                    <h2>🚀 성장 포인트</h2>
                    <p>
                        발표 내용 복기: 어떤 부분에서 어려움을 겪었는지 구체적으로 되돌아보세요. 
                        내용 이해 부족, 긴장감, 준비 부족 등 원인을 파악하면 개선할 수 있습니다.
                    </p>
                    <p>
                        작은 성공 경험 쌓기: 사람들 앞에서 이야기할 수 있는 작은 기회를 만들어보세요. 
                        (친구나 가족 앞에서 연습 발표, 거울 앞에서 리허설 등)
                    </p>
                    <p>
                        자기 긍정 강화: 오늘의 발표가 당신의 모든 능력을 정의하는 것은 아니에요. 
                        당신은 이미 많은 능력과 가능성을 가지고 있어요.
                    </p>
                    <div className="growth-bar">
                        <span>성장 가능성</span>
                        <div className="growth-progress">
                            <div className="growth-fill" style={{ width: "80%" }}></div>
                        </div>
                        <span>80%</span>
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

export default RecordFeedbackPage;
