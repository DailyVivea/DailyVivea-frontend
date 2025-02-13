"use client"; // 클라이언트 컴포넌트 선언

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Next.js 라우터
import { HeaderContainer, Title } from "./ListDetailHeader.style";
import icon from "../../../assets/back.png"; // 아이콘 이미지 파일 경로

const ListDetailHeader = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.push("/list"); // "/list" 페이지로 이동
  };

  return (
    <HeaderContainer>
      <Image
        src={icon}
        alt="뒤로가기"
        width={20}
        height={20}
        style={{ width: "44px", cursor: "pointer" }}
        onClick={handleBackClick} // 클릭 이벤트 추가
      />
      <Title>코드잇님의 목표를 확인하세요</Title>
    </HeaderContainer>
  );
};

export default ListDetailHeader;
