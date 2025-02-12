"use client";

import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";
import { Radar } from "react-chartjs-2";
import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Download } from "lucide-react";
import ProgressBar from "@/components/record/ProgressBar";
import "@/style/record/recordLayout.css";
import "@/style/record/feedback.css";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Tooltip, Legend);

const emotionOptions = {
    scales: {
        r: {
            grid: {
                circular: true, // ✅ 그리드 모양을 원형으로 변경
                color: "#E0E0E0",
            },
            pointLabels: {
                font: {
                    size: 14,
                    weight: "bold" as "bold",
                },
                color: "#212121",
            },
            ticks: {
                display: false, // ✅ 데이터 라벨 숨기기
            },
        },
    },
    plugins: {
        legend: {
            display: false, // ✅ "감정 점수" 라벨 제거
        },
    },
    elements: {
        line: {
            borderWidth: 2, // 선 두께
        },
        point: {
            radius: 0, // ✅ 포인트 제거
            hoverRadius: 0,
            borderWidth: 0,
        },
    },
};

const emotionData = {
    labels: ["행복", "스트레스", "만족", "불안", "분노"],
    datasets: [
        {
            data: [80, 40, 60, 30, 50], // 감정 점수 데이터
            backgroundColor: "rgba(149, 231, 87, 0.5)", // ✅ 내부 색상 채우기 (불투명도 적용)
            borderColor: "#95E757",
            borderWidth: 2,
            fill: true, // ✅ 내부 색상 채우기 활성화
        },
    ],
};

const GrowthProgressBar = ({ progress }: { progress: number }) => {
    const totalBars = 20; // 전체 막대 개수
    const filledBars = Math.round((progress / 100) * totalBars); // 채워질 막대 개수

    return (
        <div className="growth-progress-container">
            <span className="progress-label">0</span>
            <div className="growth-progress">
                {Array.from({ length: totalBars }, (_, index) => (
                    <div
                        key={index}
                        className={`progress-bar ${index < filledBars ? "filled" : "empty"}`}
                    ></div>
                ))}
            </div>
            <span className="progress-label">100</span>
        </div>
    );
};


const FeedbackPage = ({ setStep, activeStep, setActiveStep }: { 
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
                        <div className="keyword-list">
                            <div className="keyword-item">
                                <span className="keyword-text">떨림</span>
                                <div className="keyword-progress">
                                    <div className="keyword-fill" style={{ width: "80%" }}></div>
                                </div>
                                <span className="keyword-count">8회</span>
                            </div>

                            <div className="keyword-item">
                                <span className="keyword-text">발표</span>
                                <div className="keyword-progress">
                                    <div className="keyword-fill" style={{ width: "50%" }}></div>
                                </div>
                                <span className="keyword-count">5회</span>
                            </div>

                            <div className="keyword-item">
                                <span className="keyword-text">망쳤다</span>
                                <div className="keyword-progress">
                                    <div className="keyword-fill" style={{ width: "20%" }}></div>
                                </div>
                                <span className="keyword-count">2회</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 감정 분석 */}
                <div className="feedback-card">
                    <h2>오늘 감정 분포도</h2>
                    <p>
                        오늘의 발표가 마음에 들지 않았을 수도 있지만, 그 경험 자체가 이미 성장의 한 
                        걸음이에요. 낯설었던 일일수록 당신이 많이 있어요. 조금씩 나아가는 당신을 믿어요.
                        다음 발표는 오늘의 경험 덕분에 더 나아질 거예요. 🌟
                        오늘의 경험을 나눠줘서 고마워요. 함께 성장해 나가요! 😊
                    </p>
                    <div className="emotion-chart-container">
                        <Radar data={emotionData} options={emotionOptions} />
                    </div>
                </div>

                {/* 성장 포인트 박스 */}
                <div className="growth-section">
                    <h2>성장 포인트</h2>
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

                    {/* 성장 가능성 그래프 */}
                    <h2>성장 가능성</h2>
                    <GrowthProgressBar progress={80} />
                </div>


            </div>

            {/* 진행 상태 바 */}
            <div className="progress-bar-container">
                <ProgressBar activeStep={activeStep} />
            </div> 

        </div>
    );
};

export default FeedbackPage;
