import styled from "styled-components";

export const Title = styled.p`
  color: black;
  font-weight: bold;
  font-size: 36px;
  padding-bottom: 16px;
`;

export const BlockComponent = styled.div`
  flex: 1; // 모든 자식 요소의 너비를 동일하게
  background-color: white;
  border-radius: 28px;
  border: 2.5px solid #e6e6e6;
  padding: 22px;
`;
export const BlockTitle = styled.p`
  color: black;
  font-weight: bold;
  font-size: 20px;
`;
export const BlockMiddleTitle = styled.p`
  color: #545454;
  font-weight: 600; //semibold;
  font-size: 18px;
`;
export const BlockText = styled.p`
  color: #545454;
  font-weight: 500; //medium;
  font-size: 16px;
`;

export const GreenButton = styled.div`
  background-color: #95e757;
  border-radius: 28px;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 20px;
  padding-right: 20px;

  color: #212121;
  font-weight: 600; //semibold;
  font-size: 18px;
`;
export const GrayButton = styled.div`
  background-color: #e6e6e6;
  border-radius: 28px;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 20px;
  padding-right: 20px;

  color: #212121;
  font-weight: 600; //semibold;
  font-size: 18px;
`;
