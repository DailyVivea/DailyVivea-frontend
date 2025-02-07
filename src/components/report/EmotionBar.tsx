import React from "react";

import { Text, Bar } from "./EmotionBar.style";

interface EmotionBarProps {
    text: string,
    emotion: string,
    barColor: string,
    barState: string,
}

const EmotionBar = ({text, emotion, barColor, barState}: EmotionBarProps) => {
    return (
      <div className="grid grid-cols-[25%,75%] items-center py-1 w-full"> {/* flex 이렇게 하면 상태바의 % 너비가 제대로 안 먹힘 */}
        <Text>{text} {emotion}</Text>
        <Bar className={`${barColor} ${barState} `}></Bar>
      </div>
    );
}

export default EmotionBar;