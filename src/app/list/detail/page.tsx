"use client";

import React, { Suspense, useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import ListDetail from "@/components/list/listDetail/ListDetail";
import ListDetailHeader from "@/components/list/listDetail/ListDetailHeader";
import ListDetailTypeButton from "@/components/list/listDetail/ListDetailTypeButton";

const API_BASE_URL = "https://gunanana.onrender.com/api/goal/2";

interface GoalRecord {
  week: number;
  content: string;
  date: string;
}

interface GoalDetail {
  goalId: string;
  date: string;
  title: string;
  interval: {
    week: number;
    times: number;
  };
  term: {
    start: string;
    end: string;
  };
  progress: number;
  progressRecord: GoalRecord[];
}

const Page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [goalDetail, setGoalDetail] = useState<GoalDetail | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchGoalDetail = async () => {
      try {
        const response = await axios.get<GoalDetail>(`${API_BASE_URL}/${id}`);

        const formattedGoalDetail: GoalDetail = {
          ...response.data,
          progressRecord: response.data.progressRecord.map((record: any) => ({
            week: record.week,
            content: record.content,
            date: record.date.split("T")[0], // 날짜 포맷 수정
          })),
        };

        setGoalDetail(formattedGoalDetail);
      } catch (error) {
        console.error("목표 상세 데이터 가져오기 실패:", error);
      }
    };

    fetchGoalDetail();
  }, [id]);

  return (
    <div>
      <ListDetailHeader />
      <ListDetailTypeButton />
      {goalDetail && <ListDetail goalDetail={goalDetail} />}
    </div>
  );
};

const PageWithSuspense = () => (
  <Suspense fallback={<div>로딩 중...</div>}>
    <Page />
  </Suspense>
);

export default PageWithSuspense;
