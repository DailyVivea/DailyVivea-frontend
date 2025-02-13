"use client";

import GoalCard from "@/components/list/GoalCard";
import ListHeader from "@/components/list/ListHeader";
import TypeButton from "@/components/list/TypeButton";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CardGrid, CardGridContainer } from "./list.style";

const API_URL = "https://gunanana.onrender.com/api/2/goals";

interface Goal {
  goalId: number;
  title: string;
  content: string;
  interval: {
    week: number;
    times: number;
  };
  term: {
    start: string;
    end: string;
  };
  progress: number;
  status: string;
}

const Page = () => {
  const [goals, setGoals] = useState<Goal[]>([]);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get<{ goals: Goal[] }>(API_URL);
        setGoals(response.data.goals);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    };

    fetchGoals();
  }, []);

  const handleDeleteGoal = (id: number) => {
    setGoals((prevGoals) => prevGoals.filter((goal) => goal.goalId !== id));
  };

  return (
    <div>
      <ListHeader />
      <TypeButton />
      <CardGridContainer>
        <CardGrid>
          {goals.map((goal) => (
            <GoalCard
              key={goal.goalId}
              id={goal.goalId}
              title={goal.title}
              status={goal.status === "IN_PROGRESS" ? "진행 중" : "완료"}
              goal={goal.content}
              frequency={`주 ${goal.interval.week}회 ${goal.interval.times}번`}
              period={`${goal.term.start.split("T")[0]} ~ ${
                goal.term.end.split("T")[0]
              }`}
              progress={goal.progress}
              onDelete={handleDeleteGoal}
            />
          ))}
        </CardGrid>
      </CardGridContainer>
    </div>
  );
};

export default Page;
