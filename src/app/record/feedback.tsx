"use client";

import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";
import { Radar } from "react-chartjs-2";
import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Download } from "lucide-react";
import ProgressBar from "@/components/record/ProgressBar";
import "@/style/record/recordLayout.css";
import "@/style/record/feedback.css";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Tooltip, Legend);

interface Keyword {
    keyword: string;
    times: number;
}

interface EmotionData {
    joy: number;
    sadness: number;
    anger: number;
    anxiety: number;
    satisfaction: number;
}

interface FeedbackData {
    title: string;
    feedback: string;
    keywords: Keyword[];
    emotions: EmotionData;
    point: { title: string; content: string }[];
    potential: number;
}

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


const FeedbackPage = ({ setStep, activeStep, setActiveStep, experienceId }: { 
    setStep: (step: number) => void;
    activeStep: number;
    setActiveStep: (step: number) => void;
    experienceId: number;
}) => {

    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/feedback/${experienceId}`);
                if (!response.ok) throw new Error("Failed to fetch feedback data");
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Error fetching feedback data:", error);

                setData({
                    title: "[임시] 오늘 발표가 좀 어려우셨던 것 같아요",
                    feedback: "발표에서 어려움을 느꼈지만, 이런 경험이 결국 성장의 밑거름이 됩니다.",
                    keywords: [
                        { "keyword": "발표", "times": 3 },
                        { "keyword": "긴장", "times": 2 },
                        { "keyword": "성장", "times": 1 }
                    ],
                    emotions: {
                        joy: 0.2,
                        sadness: 0.4,
                        anger: 0.1,
                        anxiety: 0.6,
                        satisfaction: 0.3,
                    },
                    point: [
                        {
                            "title": "발표 내용 복기",
                            "content": "어떤 부분에서 어려움을 겪었는지 구체적으로 되돌아보세요."
                        },
                        {
                            "title": "작은 성공 경험 쌓기",
                            "content": "사람들 앞에서 이야기할 기회를 만들어보세요."
                        },
                        {
                            "title": "자기 긍정 강화",
                            "content": "오늘 발표가 당신의 모든 능력을 정의하는 것은 아니에요."
                        }
                    ],
                    potential: 75,
                });
            }
        };
        fetchData();
    }, [experienceId]);

    if (!data) return <p>Loading...</p>;

    const emotionData = {
        labels: ["행복", "우울", "분노", "불안", "만족"],
        datasets: [
            {
                data: [data.emotions.joy * 100, data.emotions.sadness * 100, data.emotions.anger * 100, data.emotions.anxiety * 100, data.emotions.satisfaction * 100], // 감정 점수 데이터
                backgroundColor: "rgba(149, 231, 87, 0.5)", // ✅ 내부 색상 채우기 (불투명도 적용)
                borderColor: "#95E757",
                borderWidth: 2,
                fill: true, // ✅ 내부 색상 채우기 활성화
            },
        ],
    };

    return (
        <div className="record-page">
            <div className="title-container">
                <h1 className="record-title">{data.title}</h1>
                <div className="button-container">
                    <button className="back-button" onClick={() => { setStep(2); setActiveStep(2); }}>
                        <ArrowLeft size={32} />
                    </button>
                    <button className="nav-button" onClick={() => { setActiveStep(3); setStep(4); }}>
                        <ArrowRight size={32} />
                    </button>
                </div>
            </div>

            <div className="title-container">
                <div className="keyword-container">
                    {data.keywords.map((kw: any, index: number) => (
                        <button key={index} className="keyword-button">{kw.keyword}</button>
                    ))}
                </div>
                <button className="save-button">피드백 저장하기 <Download size={16} /></button>
            </div>

            <div className="box-container">
                <div className="feedback-container">
                    <div className="feedback-card">
                        <h2>🪴 오늘의 경험에 대한 피드백</h2>
                        <p>{data.feedback}</p>
                    </div>

                    <div className="feedback-card">
                        <h2>💬 가장 많이 사용된 키워드</h2>
                        <div className="keyword-list">
                            {data.keywords.map((kw: any, index: number) => (
                                <div key={index} className="keyword-item">
                                    <span className="keyword-text">{kw.keyword}</span>
                                    <div className="keyword-progress">
                                        <div className="keyword-fill" style={{ width: `${kw.times * 10}%` }}></div>
                                    </div>
                                    <span className="keyword-count">{kw.times}회</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="feedback-card">
                    <h2>오늘 감정 분포도</h2>
                    {/* <p>
                        오늘의 발표가 마음에 들지 않았을 수도 있지만, 그 경험 자체가 이미 성장의 한 
                        걸음이에요. 낯설었던 일일수록 당신이 많이 있어요. 조금씩 나아가는 당신을 믿어요.
                        다음 발표는 오늘의 경험 덕분에 더 나아질 거예요. 🌟
                        오늘의 경험을 나눠줘서 고마워요. 함께 성장해 나가요! 😊
                    </p> */}
                    <div className="emotion-chart-container">
                        <Radar data={emotionData} options={emotionOptions} />
                    </div>
                </div>

                <div className="growth-section">
                    <h2>성장 포인트</h2>
                    {data.point.map((p: any, index: number) => (
                        <p key={index}><strong>{p.title}:</strong> {p.content}</p>
                    ))}
                    <h2>성장 가능성</h2>
                    <GrowthProgressBar progress={data.potential} />
                </div>
            </div>

            <div className="progress-bar-container">
                <ProgressBar activeStep={activeStep} />
            </div>
        </div>
    );
};

export default FeedbackPage;
