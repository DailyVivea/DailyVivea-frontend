import React, { useState } from "react";
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
  RecordFormWrapper,
  GoalRecordContainer,
  GoalRecordItem,
  GoalRecordWeek,
  GoalRecordContent,
  GoalRecordDate,
  RecordWeekAndImageWrapper,
} from "./ListDetail.style";
import CustomProgressBar from "../CustomProgressBar";
import Image from "next/image";

import icon from "../../../assets/recordicon.png";
import ListRecordForm from "./ListRecordForm";

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

interface ListDetailProps {
  goalDetail: GoalDetail;
}

const ListDetail: React.FC<ListDetailProps> = ({ goalDetail }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleForm = () => {
    setIsFormVisible((prev) => !prev);
  };

  return (
    <CardContainer>
      <DateText>{goalDetail.date.split("T")[0]}</DateText>
      <Title>{goalDetail.title}</Title>

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

      <GrayButton>진행률</GrayButton>
      <CustomProgressBar progress={goalDetail.progress} />

      <RecordWrapper>
        <GrayButton>진행률</GrayButton>
        <GreenButton onClick={toggleForm}>
          {isFormVisible ? "X 취소" : "+ 기록 추가하기"}
        </GreenButton>
      </RecordWrapper>

      {isFormVisible ? (
        <RecordFormWrapper>
          <ListRecordForm goalId={goalDetail.goalId} />
        </RecordFormWrapper>
      ) : (
        <GoalRecordContainer>
          {goalDetail.progressRecord.map((record, index) => (
            <GoalRecordItem key={index}>
              <RecordWeekAndImageWrapper>
                <Image
                  src={icon}
                  alt="레코드"
                  width={10}
                  height={10}
                  style={{
                    width: "22px",
                    cursor: "pointer",
                    height: "22px",
                    marginTop: "5px",
                  }}
                />
                <GoalRecordWeek> {record.week}주차</GoalRecordWeek>
              </RecordWeekAndImageWrapper>

              <GoalRecordContent>{record.content}</GoalRecordContent>
              <GoalRecordDate>{record.date.split("T")[0]}</GoalRecordDate>
            </GoalRecordItem>
          ))}
        </GoalRecordContainer>
      )}
    </CardContainer>
  );
};

export default ListDetail;
