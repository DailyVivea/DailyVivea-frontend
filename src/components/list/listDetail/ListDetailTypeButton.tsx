import React, { useState } from "react";
import { GreenButton, GrayButton, ButtonContainer } from "../TypeButton.style";

type ButtonType = "목표" | "진행 기록" | "자가 점검";

const ListDetailTypeButton = () => {
  const [selected, setSelected] = useState<ButtonType>("목표");

  const buttons: ButtonType[] = ["목표", "진행 기록", "자가 점검"];

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

export default ListDetailTypeButton;
