"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation"; // URL에서 id 가져오기
import ListDetail from "@/components/list/listDetail/ListDetail";
import ListDetailHeader from "@/components/list/listDetail/ListDetailHeader";
import ListDetailTypeButton from "@/components/list/listDetail/ListDetailTypeButton";

const API_BASE_URL = "https://gunanana.onrender.com/api/goal/2";

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
  progressRecord: string[];
}

const Page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // URL에서 id 값을 가져옴
  const [goalDetail, setGoalDetail] = useState<GoalDetail | null>(null);

  useEffect(() => {
    if (!id) return; // id가 없으면 API 요청을 보내지 않음

    const fetchGoalDetail = async () => {
      try {
        const response = await axios.get<GoalDetail>(`${API_BASE_URL}/${id}`);
        setGoalDetail(response.data);
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

export default Page;
