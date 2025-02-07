import React, { useState, useRef } from "react";
import { 
  Wrapper, ProgressContainer, ProgressBackground, ProgressBarFill, 
  ProgressButtonWrapper, ProgressButton, ProgressButtonAccessary,
  Text
} from "./DiamondProgressBar.style";


const DiamondProgressBar = () => {
    const [progress, setProgress] = useState(0); // 진행 상태 (0% ~ 100%)
    const startProgress = useRef(0);  // 드래그 시작 시점의 진행 상태 // 이전 진행 상태를 저장하기 위해
    const progressBarRef = useRef<HTMLDivElement>(null);
    
    
    // 마우스 버튼 다운시 발동 (드래그 시작)
    const handleMouseDown = (e: React.MouseEvent) => {
      const progressBar = progressBarRef.current;
      if(!progressBar) return;

      const startX = e.clientX; // 마우스 시작 좌표
      startProgress.current = progress; // 드래그 시작 시 진행 상태 저장

      // 마우스 이동했을 때
      const onMouseMove = (moveEvent: MouseEvent) => {
        const diff = moveEvent.clientX - startX;

        // Math.min,Math.max: 진행 상태를 0%~100% 사이로 제한,  Math.floor: 소수점은 제거
        const newProgress = Math.min(Math.max(Math.floor((startProgress.current + (diff / progressBar.offsetWidth) * 100)), 0), 100); // 진행 상태 계산 (0% ~ 100%)

        // 진행 상태 업데이트
        setProgress(newProgress);
      };


      // 마우스에서 손 뗐을 때
      const onMouseUp  = () => {
        // 이벤트 리스너 제거
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp );
      };
      
      // 이벤트 리스너 추가
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp );
    };


    return (
      <Wrapper>
        <Text>{progress}%</Text>
        {/* 바 전체 */}
        <ProgressContainer ref={progressBarRef}>
          {/* 배경 바 */}
          <ProgressBackground />

          {/* 진행도 채운 바 */}
          <ProgressBarFill style={{ width: `${progress}%` }} />

          {/* 버튼 전체 */}
          <ProgressButtonWrapper 
            onMouseDown={(e) => handleMouseDown(e)}
          > 
            {/* 세로 모양 */}
            <ProgressButton
              style={{ left: `${progress}%` }}
            />
            {/* 가로 모양 */}
            <ProgressButtonAccessary
              style={{ left: `${progress}%` }}
            />
          </ProgressButtonWrapper>
        </ProgressContainer>
      </Wrapper>
    );
}

export default DiamondProgressBar;