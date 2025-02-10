"use client";
import GoalCard from "@/components/list/GoalCard";
import ListHeader from "@/components/list/ListHeader";
import TypeButton from "@/components/list/TypeButton";

import React from "react";
import { CardGrid, CardGridContainer } from "./list.style";

const Page = () => {
  return (
    <div>
      <ListHeader></ListHeader>
      <TypeButton></TypeButton>
      <CardGridContainer>
        <CardGrid>
          <GoalCard></GoalCard>
          <GoalCard></GoalCard>
          <GoalCard></GoalCard>
          <GoalCard></GoalCard>
        </CardGrid>
      </CardGridContainer>
    </div>
  );
};

export default Page;
