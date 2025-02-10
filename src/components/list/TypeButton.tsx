import React, { useState } from "react";
import { GreenButton, GrayButton, ButtonContainer } from "./TypeButton.style";

type ButtonType = "내가 설정한 목표" | "추천 목표" | "진행 중" | "진행 완료";

const TypeButton = () => {
  const [selected, setSelected] = useState<ButtonType>("내가 설정한 목표");

  const buttons: ButtonType[] = [
    "내가 설정한 목표",
    "추천 목표",
    "진행 중",
    "진행 완료",
  ];

  return (
    <ButtonContainer>
      {buttons.map((button) => (
        <div
          key={button}
          onClick={() => setSelected(button)}
          style={{ cursor: "pointer" }}
        >
          {selected === button ? (
            <GreenButton>{button}</GreenButton>
          ) : (
            <GrayButton>{button}</GrayButton>
          )}
        </div>
      ))}
    </ButtonContainer>
  );
};

export default TypeButton;
