"use client"

import React, { useEffect } from "react";
import { ChevronRight } from "lucide-react";
import "@/style/dashboard.css";

const DashboardPage = () => {
    useEffect(() => {
        // ✅ 페이지 진입 시 transparent-header 추가
        document.querySelector(".header-container")?.classList.add("transparent-header");

        return () => {
            // ✅ 페이지 나갈 때 원래 스타일로 복구
            document.querySelector(".header-container")?.classList.remove("transparent-header");
        };
    }, []);

    return (
        <div className="background-container">
            <div className="dashboard-text-container">
                <img src="/images/title.png" alt="타이틀" className="title" />
                <h2>DailyVivea에서 오늘 하루의 경험을 기록하고 함께 성장해요</h2>
                <div className="today-container">
                    <img src="/images/profile.png" alt="프로필" className="profile" />
                    <div className="today-info">
                        <h1>6,228+</h1>
                        <h3>오늘 기록자 수</h3>
                    </div>
                </div>
                <button className="record-button">
                    기록하러 가기
                    <div className="icon-wrapper">
                        <ChevronRight size={18} strokeWidth={3} className="record-icon" />
                    </div>
                </button>
            </div>
        </div>
    );
}

export default DashboardPage;
