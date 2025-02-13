"use client";

import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";
import { Radar } from "react-chartjs-2";
import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Download } from "lucide-react";
import ProgressBar from "@/components/record/ProgressBar";
import "@/style/record/recordLayout.css";
import "@/style/record/feedback.css";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Tooltip, Legend);



const emotionOptions = {
    scales: {
        r: {
            grid: {
                circular: true,
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
                display: false,
            },
        },
    },
    plugins: {
        legend: {
            display: false,
        },
    },
    elements: {
        line: {
            borderWidth: 2,
        },
        point: {
            radius: 0,
            hoverRadius: 0,
            borderWidth: 0,
        },
    },
};

const GrowthProgressBar = ({ progress }: { progress: number }) => {
    const totalBars = 20;
    const filledBars = Math.round((progress / 100) * totalBars);

    return (
        <div className="growth-progress-container">
            <span className="progress-label">0</span>
            <div className="growth-progress">
                {Array.from({ length: totalBars }, (_, index) => (
                    <div key={index} className={`progress-bar ${index < filledBars ? "filled" : "empty"}`}></div>
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
        if (!experienceId) return;

        const fetchData = async () => {
            try {
                const response = await fetch(`https://gunanana.onrender.com/api/${experienceId}/feedbacks`);
                if (!response.ok) throw new Error("Failed to fetch feedback data");
                const result = await response.json();
                setData(result);
                console.log(result);
            } catch (error) {
                console.error("Error fetching feedback data:", error);
                setData({
                    title: "[임시] 오늘 발표가 좀 어려우셨던 것 같아요",
                    feedback: "발표에서 어려움을 느꼈지만, 이런 경험이 결국 성장의 밑거름이 됩니다.",
                    keywords: [
                        { keyword: "발표", times: 3 },
                        { keyword: "긴장", times: 2 },
                        { keyword: "성장", times: 1 }
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
                            title: "발표 내용 복기",
                            content: "어떤 부분에서 어려움을 겪었는지 구체적으로 되돌아보세요."
                        },
                        {
                            title: "작은 성공 경험 쌓기",
                            content: "사람들 앞에서 이야기할 기회를 만들어보세요."
                        },
                        {
                            title: "자기 긍정 강화",
                            content: "오늘 발표가 당신의 모든 능력을 정의하는 것은 아니에요."
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
                data: [
                    (data.emotions?.joy ?? 0) * 100,
                    (data.emotions?.sadness ?? 0) * 100,
                    (data.emotions?.anger ?? 0) * 100,
                    (data.emotions?.anxiety ?? 0) * 100,
                    (data.emotions?.satisfaction ?? 0) * 100
                ],
                backgroundColor: "rgba(149, 231, 87, 0.5)",
                borderColor: "#95E757",
                borderWidth: 2,
                fill: true,
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
                    {data?.keywords?.map((kw: any, index: number) => (
                        <button key={index} className="keyword-button">{kw.keyword}</button>
                    ))}
                </div>
                <button className="save-button">피드백 저장하기 <Download size={16} /></button>
            </div>

            <div className="box-container">
                <div className="feedback-container">
                    <div className="feedback-card">
                        <h2>🪴 오늘의 경험에 대한 피드백</h2>
                        <p>{data.emotions.feedback}</p>
                    </div>

                    <div className="feedback-card">
                        <h2>💬 가장 많이 사용된 키워드</h2>
                        <div className="keyword-list">
                            {data?.keywords?.map((kw: any, index: number) => (
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
                    <div className="emotion-chart-container">
                        <Radar data={emotionData} options={emotionOptions} />
                    </div>
                </div>

                <div className="growth-section">

                    <h2>성장 포인트</h2>
                    {data.growth_points && Object.entries(data.growth_points).map(([title, content], index) => (
    <div key={index} className="growth-point">
        <p>
        {title}: {String(content).split('\n').map((line, i) => (
                <span key={i}>
                    {line}
                    <br />
                </span>
            ))}
        </p>
    </div>
))}

                    <h2>성장 가능성</h2>
                    <p className="growth-potential-number">{data.growth_potential ?? 0}%</p>
                    <GrowthProgressBar progress={data.growth_potential ?? 0} />
                </div>
            </div>

            <div className="progress-bar-container">
                <ProgressBar activeStep={activeStep} />
            </div>
        </div>
    );
};

export default FeedbackPage;
