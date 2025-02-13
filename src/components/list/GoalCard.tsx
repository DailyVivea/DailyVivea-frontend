import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import axios from "axios"; // axios 추가
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
  onDelete: (id: number) => void; // 삭제 후 부모 컴포넌트에서 리스트 업데이트
}

const GoalCard: React.FC<GoalCardProps> = ({
  id,
  title,
  status,
  goal,
  frequency,
  period,
  progress,
  onDelete,
}) => {
  const router = useRouter(); // Next.js 라우터 사용

  const handleClick = () => {
    router.push(`/list/detail?id=${id}`);
  };

  const handleDelete = async () => {
    try {
      const apiUrl = `https://gunanana.onrender.com/api/${id}/deleteGoal`;
      await axios.delete(apiUrl); // DELETE 요청
      onDelete(id); // 삭제 후 부모 컴포넌트에서 리스트 업데이트
    } catch (error) {
      console.error("삭제 실패:", error);
    }
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

      {/* 삭제 버튼 */}
      <DeleteButtonWrapper onClick={handleDelete}>
        <Image
          src={icon}
          alt="삭제"
          width={20}
          height={20}
          style={{ width: "22px", cursor: "pointer" }}
        />
      </DeleteButtonWrapper>
    </CardContainer>
  );
};

export default GoalCard;
