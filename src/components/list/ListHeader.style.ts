import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
`;

export const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: #000000;
  margin: 0;
`;

export const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 536px;
  height: 60px;
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 8px 40px 8px 16px;
  border: 1px solid #e6e6e6;
  border-radius: 24px;
  font-size: 14px;
  color: #212121;
  outline: none;
`;
