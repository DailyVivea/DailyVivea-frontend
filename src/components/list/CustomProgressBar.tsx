import React from "react";
import {
  Wrapper,
  ProgressContainer,
  ProgressBackground,
  ProgressBarFill,
  Text,
} from "../report/DiamondProgressBar.style";

interface CustomProgressBarProps {
  progress: number; // API에서 받은 진행 상태 (0% ~ 100%)
}

const CustomProgressBar: React.FC<CustomProgressBarProps> = ({ progress }) => {
  return (
    <Wrapper>
      <Text>{progress}%</Text>
      {/* 바 전체 */}
      <ProgressContainer>
        {/* 배경 바 */}
        <ProgressBackground />

        {/* 진행도 채운 바 */}
        <ProgressBarFill style={{ width: `${progress}%` }} />
      </ProgressContainer>
    </Wrapper>
  );
};

export default CustomProgressBar;
