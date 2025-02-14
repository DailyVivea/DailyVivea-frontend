"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProgressBar from "@/components/record/ProgressBar";
import "@/style/record/recordLayout.css";
import "@/style/record/loading.css"
import Image from "next/image";
import Loading from "@/assets/images/loading.png"

const LoadingPage = ({ step, setStep, activeStep, setActiveStep, experienceId }: { 
    setStep: (step: number) => void;
    step: number;
    activeStep: number; 
    setActiveStep: (step: number) => void;
    //progressBar 단계 변경 X
    experienceId: number;

    

}) => {

    const [loading, setLoading] = useState(true);  // 로딩 상태 관리

    // 경험 분석 API 호출
    useEffect(() => {

        if (experienceId === null || experienceId === undefined) return;
        if (step !== 2 || experienceId === null) return;

        const analyzeExperience = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://gunanana.onrender.com/api/${experienceId}/analysis`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({}),
                });

                const data = await response.json();

                if (response.ok) {
                    console.log("경험 분석 완료")
                    
                    setStep(3); // Step 4로 이동
                    
                } else {
                    throw new Error(data.message || "경험 분석에 실패했습니다.");
                }
            } catch (err: any) {
                alert(err.message || "분석 중 오류가 발생했습니다.");
                setStep(0); // 🔹 Step 0(날짜 선택)으로 돌아감
                setActiveStep(0);
            } finally {
                setLoading(false);
            }

        };

        analyzeExperience();
    }, [experienceId]);

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
                <Image src={Loading} alt="AI 분석 중" className="loading-image" />
            </div>

            {/* 진행 상태 바 */}
            <div className="progress-bar-container">
                <ProgressBar activeStep={activeStep} />
            </div>  
        </div>
    );
};

export default LoadingPage;
