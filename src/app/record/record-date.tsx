"use client";

import React, { useState } from "react";
import Header from "@/components/Layout/Header";
import Calendar from "@/components/Global/Calendar";
import ProgressBar from "@/components/record/ProgressBar";
import { ArrowRight } from "lucide-react";
import "@/style/record/recordLayout.css";
import "@/style/record/progressBar.css";

const RecordDatePage = ({ setStep, activeStep, setActiveStep }: { 
    setStep: (step: number) => void;
    activeStep: number;
    setActiveStep: (step: number) => void;
}) => {

    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date| null>(null);
    const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

    const [loading, setLoading] = useState(false);

    const userId = 123; // 🔴실제 로그인된 사용자의 ID로 변경 필요

    const handleSubmit = async () => {
        if (!selectedDate) {
            alert("날짜를 선택해주세요.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`/api/${userId}/date`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ date: selectedDate.toISOString().split("T")[0] }),
            });

            if (response.status === 201) {
                setActiveStep(1);
                setStep(1);
            } else {
                const data = await response.json();
                alert(data.message || "에러가 발생했습니다.");
            }
        } catch (err) {
            alert("서버와 연결할 수 없습니다.");
        } finally {
            setActiveStep(1); // 임시 이동
            setStep(1); // 임시 이동

            setLoading(false);
        }
    };


    return (
        <div className="record-page">
            <div className="title-container">
                <div className="record-title">
                    경험을 기록할 날짜를 선택해주세요
                </div>
                <button className="nav-button" onClick={handleSubmit} disabled={loading}>
                    {loading ? <ArrowRight color="gray" size={32} /> : <ArrowRight size={32} />}
                </button>
            </div>

            <div>
                <Calendar 
                    componentName="RecordDate"
                    currentDate={currentDate}
                    selectedDate={selectedDate}
                    hoveredDate={hoveredDate}
                    setCurrentDate={setCurrentDate}
                    setSelectedDate={setSelectedDate}
                    setHoveredDate={setHoveredDate}
                />
            </div>

            <div className="progress-bar-container">
                <ProgressBar activeStep={activeStep} />
            </div>
        </div>
    );
};

export default RecordDatePage;
