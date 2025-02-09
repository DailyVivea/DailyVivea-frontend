"use client";

import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProgressBar from "@/components/record/ProgressBar";
import "@/style/record/recordLayout.css";

const RecordExperiencePage = ({ setStep, activeStep, setActiveStep }: { 
    setStep: (step: number) => void;
    activeStep: number;
    setActiveStep: (step: number) => void;
}) => {
    return (
        <div className="record-page">
            <div className="title-container">
                <div className="record-title">
                    오늘의 경험을 작성해주세요
                </div>
                <div className="button-container">
                    <button 
                        className="back-button" 
                        onClick={() => {
                            setActiveStep(0); // ✅ ProgressBar 업데이트
                            setStep(0); // ✅ 이전 페이지로 이동
                        }}>
                        <ArrowLeft size={32} />
                    </button>
                    <button
                        className="nav-button" 
                        onClick={() => {
                            setActiveStep(2); // ✅ ProgressBar 업데이트
                            setStep(2); // ✅ 다음 페이지로 이동
                        }}>
                        <ArrowRight size={32} />
                    </button>
                </div>
                
            <div className="progress-bar-container">
                <ProgressBar activeStep={activeStep} />
            </div>  

            </div>
            
        </div>
    );
};

export default RecordExperiencePage;
