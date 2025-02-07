import React from 'react';

import { 
    Wrapper, CircleBackground, CircleProgress, 
    TextWrapper, ProgressText, DescriptionText
} from './CircleProgressBar.style';

interface CircularProgressBarProps {
    size: number;
    strokeWidth: number;
    progress: number;
    description: string;
}

const CircularProgressBar = ({ size, strokeWidth, progress, description }: CircularProgressBarProps) => {
    const radius = (size - strokeWidth) / 2;  // 원의 반지름
    const circumference = 2 * Math.PI * radius;  // 원 둘레
        
    // 원형의 진행 상태를 나타내는 오프셋 계산
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <Wrapper style={{ width: size, height: size }}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
                {/* 배경 원 */}
                <CircleBackground
                cx={size / 2}
                cy={size / 2}
                r={radius}
                strokeWidth={strokeWidth}
                />
                
                {/* 진행 상태를 나타내는 원 */}
                <CircleProgress
                cx={size / 2}
                cy={size / 2}
                r={radius}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                />
            </svg>

            <TextWrapper>
                <ProgressText>{progress}%</ProgressText>
                <DescriptionText>{description}</DescriptionText>
            </TextWrapper>
        </Wrapper>
    );
};

export default CircularProgressBar;