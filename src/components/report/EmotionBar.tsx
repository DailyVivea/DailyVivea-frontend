import React, { useEffect } from "react";

import { Text, Bar, BarText } from "./EmotionBar.style";

interface EmotionBarProps {
  text: string;
  emotion: string;
  barColor: string;
  barState: number;
}

const EmotionBar = ({ text, emotion, barColor, barState }: EmotionBarProps) => {
  return (
    <div className="flex justify-start items-center py-1 w-full">
      <Text>
        {text} {emotion}
      </Text>
      <Bar className={`${barColor} w-[${barState}%] `}>
        <BarText>{barState}%</BarText>
      </Bar>
    </div>
  );
};

export default EmotionBar;
