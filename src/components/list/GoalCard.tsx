import DiamondProgressBar from "@/components/report/DiamondProgressBar";
import React from "react";
import {
  BodyText,
  CardContainer,
  GrayButton,
  Title,
  Status,
  Section,
  SectionColumn,
  GrayButtonLine,
} from "./GoalCard.style";

const GoalCard = () => {
  return (
    <CardContainer>
      <Title>주 1회 발표 연습하기</Title>
      <Status>진행 중</Status>

      {/* 목표 섹션 */}
      <GrayButton>목표</GrayButton>
      <Section>
        <SectionColumn>
          <BodyText>
            4주동안 간단한 주제를 정해 매주 1회 5분 이상 발표 연습을 완료하기
          </BodyText>
        </SectionColumn>
      </Section>

      {/* 실행 간격 및 기간 섹션 */}
      <GrayButtonLine>
        <GrayButton>실행 간격</GrayButton>
        <GrayButton>기간</GrayButton>
      </GrayButtonLine>
      <Section>
        <SectionColumn>
          <BodyText>1주마다 1회 이상</BodyText>
        </SectionColumn>

        <SectionColumn>
          <BodyText>2025.01.07~2025.02.04</BodyText>
        </SectionColumn>
      </Section>

      {/* 진행률 섹션 */}
      <GrayButton>진행률</GrayButton>
      <DiamondProgressBar />
    </CardContainer>
  );
};

export default GoalCard;
