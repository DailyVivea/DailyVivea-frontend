import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import {
  BodyText,
  CardContainer,
  GrayButton,
  Title,
  Status,
  Section,
  SectionColumn,
  GrayButtonLine,
  DeleteButtonWrapper,
} from "./GoalCard.style";
import CustomProgressBar from "./CustomProgressBar";
import icon from "../../assets/trashcan.png"; // 아이콘 이미지 파일 경로

interface GoalCardProps {
  id: number; // 고유 ID 추가
  title: string;
  status: string;
  goal: string;
  frequency: string;
  period: string;
  progress: number;
}

const GoalCard: React.FC<GoalCardProps> = ({
  id,
  title,
  status,
  goal,
  frequency,
  period,
  progress,
}) => {
  const router = useRouter(); // Next.js 라우터 사용

  const handleClick = () => {
    router.push(`/list/detail?id=${id}`);
  };

  return (
    <CardContainer>
      <Title onClick={handleClick} style={{ cursor: "pointer" }}>
        {title}
      </Title>
      <Status>{status}</Status>

      {/* 목표 섹션 */}
      <GrayButton>목표</GrayButton>
      <Section>
        <BodyText>{goal}</BodyText>
      </Section>

      {/* 실행 간격 및 기간 섹션 */}
      <GrayButtonLine>
        <GrayButton>실행 간격</GrayButton>
        <GrayButton>기간</GrayButton>
      </GrayButtonLine>
      <Section>
        <SectionColumn>
          <BodyText>{frequency}</BodyText>
        </SectionColumn>

        <SectionColumn>
          <BodyText>{period}</BodyText>
        </SectionColumn>
      </Section>

      {/* 진행률 섹션 */}
      <GrayButton>진행률</GrayButton>
      <CustomProgressBar progress={progress} />
      <DeleteButtonWrapper>
        <Image
          src={icon}
          alt="뒤로가기"
          width={20}
          height={20}
          style={{ width: "44px", cursor: "pointer" }}
        />
      </DeleteButtonWrapper>
    </CardContainer>
  );
};

export default GoalCard;
