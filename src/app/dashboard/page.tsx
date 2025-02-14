"use client";

import React, { useEffect } from "react";
import { ChevronRight } from "lucide-react";
import "@/style/dashboard.css";
import Link from "next/link";
import Title from "@/assets/images/title.png"
import Profile from "@/assets/images/profile.png"
import Image from "next/image";  // Image import 추가
import Background from "@/assets/images/dashboard.png"


const DashboardPage = () => {
  useEffect(() => {
    // ✅ 페이지 진입 시 transparent-header 추가
    document
      .querySelector(".header-container")
      ?.classList.add("transparent-header");

    return () => {
      // ✅ 페이지 나갈 때 원래 스타일로 복구
      document
        .querySelector(".header-container")
        ?.classList.remove("transparent-header");
    };
  }, []);

  return (
    <div className="background-container">

        <Image 
        src={Background}
        alt="Dashboard Background"
        layout="fill" // 전체 화면을 채움
        objectFit="cover" // 비율을 유지하면서 채우기
        className="background-image"
        />

      <div className="dashboard-text-container">
        <Image src={Title} alt="타이틀" className="title" />
        <h2>DailyVivea에서 오늘 하루의 경험을 기록하고 함께 성장해요</h2>
        <div className="today-container">
          <Image src={Profile} alt="프로필" className="profile" />
          <div className="today-info">
            <h1>6,228+</h1>
            <h3>오늘 기록자 수</h3>
          </div>
        </div>
        <Link href="/record">
          <button className="record-button">
            기록하러 가기
            <div className="icon-wrapper">
              <ChevronRight size={18} strokeWidth={3} className="record-icon" />
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;
