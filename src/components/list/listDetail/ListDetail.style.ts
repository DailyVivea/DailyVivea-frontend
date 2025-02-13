import styled from "styled-components";

export const CardContainer = styled.div`
  width: 1172px;
  padding: 32px 28px;
  border: 1px solid #e6e6e6;
  border-radius: 16px;
  background-color: #fff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin-left: 333px;
`;

export const Title = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: #212121;
  margin-bottom: 32px;
`;

export const DateText = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #b6b6b6;
  margin-bottom: 16px;
  margin-top: 10px;
`;

export const Section = styled.div`
  margin-bottom: 16px;
  display: flex;
  align-items: center;
`;

export const SectionColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 18px;
`;

export const GrayButton = styled.div`
  display: inline-block;
  background-color: #e6e6e6;
  border-radius: 28px;
  padding: 4px 16px;

  color: #212121;
  font-weight: bold;
  font-size: 15px;
  text-align: center;
  margin-bottom: 12px;
`;

export const GrayButtonLine = styled.div`
  display: flex;
  gap: 500px;
`;

export const BodyText = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #545454;
  margin-bottom: 8px;
  margin-left: 3px;
  width: 590px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
`;
