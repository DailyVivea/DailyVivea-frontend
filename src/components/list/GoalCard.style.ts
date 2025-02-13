import styled from "styled-components";

export const CardContainer = styled.div`
  position: relative;
  width: 372px;
  padding: 32px 28px;
  border: 1px solid #e6e6e6;
  border-radius: 16px;
  background-color: #fff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #212121;
  margin-bottom: 8px;
`;

export const Status = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #95e757;
  margin-bottom: 24px;
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
  width: 350px;
`;

export const GrayButton = styled.div`
  display: inline-block;
  background-color: #e6e6e6;
  border-radius: 28px;
  padding: 4px 16px;

  color: #212121;
  font-weight: bold;
  font-size: 13px;
  text-align: center;
  margin-bottom: 12px;
`;

export const GrayButtonLine = styled.div`
  display: flex;
  gap: 80px;
`;

export const BodyText = styled.div`
  font-size: 13px;
  font-weight: bold;
  color: #545454;
  margin-bottom: 8px;
  margin-left: 3px;
`;

export const DeleteButtonWrapper = styled.div`
  position: absolute;
  right: 20px;
  bottom: 20px;
`;
