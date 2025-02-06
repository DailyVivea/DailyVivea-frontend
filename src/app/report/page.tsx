"use client"
import Calendar from "@/components/Global/Calendar";
import React from "react";

import { 
  Title, 
  BlockComponent, BlockTitle, BlockMiddleTitle, BlockText,
  GreenButton, GrayButton
} from "./style";

import Image from "next/image";
import tempIcon from "@/assets/임시스티커.svg";

const ReportPage = () => {
    return (
      <div className="bg-white h-screen h-full p-10 ">
        <Title>나의 경험을 모았어요</Title>
        <Calendar/>

        <div className="flex justify-between gap-4 mb-[70px]">
          <BlockComponent>
            <BlockTitle>오늘 발표가 좀 어려우셨던 것 같아요!</BlockTitle>
            <p className="text-[#B6B6B6] font-medium text-[16px] mt-3">01.07.수요일</p>

            <div className="flex justify-between items-center">
              <BlockMiddleTitle>발표가 마음에 들지 않아 우울했던 날</BlockMiddleTitle>
              <Image src={tempIcon} alt="스티커" className="w-[213px] h-[213px]"></Image>
            </div>
          </BlockComponent>

          <BlockComponent>
            <BlockTitle>피드백</BlockTitle>
            <BlockText className="mt-3">먼저, 발표에서의 어려움은 누구나 겪을 수 있는 일이에요. 중요한 건 그 경험을 어떻게 받아들이고 성장의 기회로 삼느냐입니다. 당신이 오늘 속상함과 우울함을 느낀 건 그만큼 발표에 진지하게 임했고, 잘하고 싶었던 마음이 컸기 때문이에요.</BlockText>
          </BlockComponent>
        </div>



        <Title>이번 주 목표 달성률이 높아요! 계속해서 도전하세요!</Title>
        <div className="flex gap-2 mb-6">
          <GreenButton>주간</GreenButton>
          <GrayButton>월간</GrayButton>
        </div>
        
        <div className="flex justify-between gap-4 mb-[70px]">
          <div className="flex-1">
            <BlockComponent>
              <BlockTitle>이번 주 목표 달성률</BlockTitle>
            </BlockComponent>
          </div>

          <div className="flex-1">
            <BlockComponent className="mb-4">
              <BlockTitle>이번 주 감정 분포</BlockTitle>
            </BlockComponent>

            <BlockComponent>
              <BlockTitle>이번 주의 내 또래 친구들의 목표에요</BlockTitle>
            </BlockComponent>
          </div>
        </div>
      </div>
    );
}

export default ReportPage;