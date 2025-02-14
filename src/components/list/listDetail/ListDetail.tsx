import React from "react";
import {
  BodyText,
  CardContainer,
  GrayButton,
  Title,
  Section,
  SectionColumn,
  GrayButtonLine,
  DateText,
  RecordWrapper,
  GreenButton,
  RecordTitle,
} from "./ListDetail.style";
import CustomProgressBar from "../CustomProgressBar";
import Image from "next/image";

import icon from "../../../assets/recordicon.png";
import DiamondProgressBar from "@/components/report/DiamondProgressBar";

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
}

interface ListDetailProps {
  goalDetail: GoalDetail;
}

const ListDetail: React.FC<ListDetailProps> = ({ goalDetail }) => {
  return (
    <CardContainer>
      <DateText>{goalDetail.date.split("T")[0]}</DateText>
      <Title>{goalDetail.title}</Title>

      {/* 실행 간격 및 기간 섹션 */}
      <GrayButtonLine>
        <GrayButton>실행 간격</GrayButton>
        <GrayButton>기간</GrayButton>
      </GrayButtonLine>

      <Section>
        <SectionColumn>
          <BodyText>
            주 {goalDetail.interval.week}회 {goalDetail.interval.times}번
          </BodyText>
        </SectionColumn>

        <SectionColumn>
          <BodyText>
            {goalDetail.term.start.split("T")[0]} ~{" "}
            {goalDetail.term.end.split("T")[0]}
          </BodyText>
        </SectionColumn>
      </Section>

      {/* 진행률 섹션 */}
      <GrayButton>진행률</GrayButton>
      <DiamondProgressBar />
      <RecordWrapper>
        <GrayButton>진행률</GrayButton>
        <GreenButton>+ 기록 추가하기</GreenButton>
      </RecordWrapper>
      <Image
        src={icon}
        alt="레코드"
        width={24}
        height={24}
        style={{ width: "24px", cursor: "pointer" }}
      />
    </CardContainer>
  );
};

export default ListDetail;
