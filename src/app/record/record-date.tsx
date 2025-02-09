"use client";

import React, {useState} from "react";
import Header from "@/components/Layout/Header";
import Calendar from "@/components/Global/Calendar";
import ProgressBar from "@/components/record/ProgressBar";
import { ArrowRight } from "lucide-react";
import "@/style/record/recordLayout.css";
import "@/style/record/progressBar.css";

const RecordDatePage = () => {
    const [activeStep, setActiveStep] = useState(0);

    return (
        <div className="record-page">
            <div className="record-title">
                경험을 기록할 날짜를 선택해주세요
            </div>

            <div className="calendar-container">
                <Calendar />
            </div>

            <div className="progress-bar-container">
                <ProgressBar activeStep={activeStep} />
            </div>

            <button className="nav-button"
            onClick={() => setActiveStep((prev) => Math.min(prev+1,3))}>
                <ArrowRight size={32} />
            </button>
        </div>
    );
};

export default RecordDatePage;