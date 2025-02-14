import React, { useState } from "react";
import axios from "axios";
import {
  FormContainer,
  InputWrapper,
  Label,
  Input,
  Textarea,
  SubmitButton,
} from "./ListRecordForm.style";

interface ListRecordFormProps {
  goalId: string;
}

const ListRecordForm: React.FC<ListRecordFormProps> = ({ goalId }) => {
  const [week, setWeek] = useState<number | "">("");
  const [content, setContent] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!week || !content) return;

    try {
      await axios.post(
        `https://gunanana.onrender.com/api/goalrecord/${goalId}`,
        { week, content }
      );

      window.location.reload(); // ✅ 성공 시 페이지 새로고침
    } catch (error) {
      console.error("기록 추가 실패:", error);
      alert("기록 추가에 실패했습니다.");
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <InputWrapper>
        <Label>주차</Label>
        <Input
          type="number"
          value={week}
          onChange={(e) => setWeek(Number(e.target.value))}
          placeholder="주차 입력 (예: 1)"
        />
      </InputWrapper>

      <InputWrapper>
        <Label>목표 내용</Label>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="목표 내용을 입력하세요"
        />
      </InputWrapper>

      <SubmitButton type="submit">추가하기</SubmitButton>
    </FormContainer>
  );
};

export default ListRecordForm;
