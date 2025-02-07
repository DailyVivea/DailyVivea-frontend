"use client"
import Calendar from "@/components/Global/Calendar";
import React from "react";

import { 
  Title, 
  BlockComponent, BlockTitle, BlockMiddleTitle, BlockText,
  GreenButton, GrayButton
} from "./style";

import EmotionBar from "@/components/report/EmotionBar";

import Image from "next/image";
import tempIcon from "@/assets/임시스티커.svg";
import GoalListItem from "@/components/report/GoalListItem";

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
              <BlockTitle className="mb-4">이번 주 감정 분포</BlockTitle>
              <EmotionBar text="두려움" emotion="😨" barColor="bg-[#95E757]" barState="w-[100%] "/>
              <EmotionBar text="행복함" emotion="😊" barColor="bg-[#FFDFFC]" barState="w-[80%] "/>
              <EmotionBar text="우울함" emotion="😔" barColor="bg-[#DEFFFC]" barState="w-[70%]"/>
              <EmotionBar text="무덤덤" emotion="😐" barColor="bg-[#FFFFAA]" barState="w-[70%]"/>
              <EmotionBar text="분노" emotion="😡" barColor="bg-[#E6E6E6]" barState="w-[50%]"/>
            </BlockComponent>

            <BlockComponent>
              <BlockTitle className="mb-5">이번 주의 내 또래 친구들의 목표에요</BlockTitle>
              <GoalListItem goal="일주일에 5개 단어씩 외국어 단어장에 추가 후 복습" name="안OO"></GoalListItem>
              <GoalListItem goal="월 1회 지역 봉사활동 참여하기" name="박OO"></GoalListItem>
              <GoalListItem goal="주 1회, 외식비 5만 원 이하로 제한하기" name="최OO"></GoalListItem>
              <GoalListItem goal="매일 자기계발 서적 10페이지 읽기" name="김OO"></GoalListItem>
            </BlockComponent>
          </div>
        </div>
      </div>
    );
}

export default ReportPage;