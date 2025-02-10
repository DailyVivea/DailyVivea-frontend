import React from "react";
import Image from "next/image";
import {
  HeaderContainer,
  Title,
  SearchBarContainer,
  SearchInput,
} from "./ListHeader.style";
import icon from "../../assets/search.png"; // 아이콘 이미지 파일 경로

const ListHeader = () => {
  return (
    <HeaderContainer>
      <Title>코드잇님의 목표를 확인하세요</Title>
      <SearchBarContainer>
        <SearchInput />
        <Image
          src={icon}
          alt="검색"
          width={20}
          height={20}
          style={{ position: "absolute", right: "12px", cursor: "pointer" }}
        />
      </SearchBarContainer>
    </HeaderContainer>
  );
};

export default ListHeader;
