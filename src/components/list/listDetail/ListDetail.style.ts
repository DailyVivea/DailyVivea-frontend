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

export const RecordWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
`;

export const GreenButton = styled.div`
  display: inline-block;
  background-color: #95e757;
  border-radius: 28px;
  padding: 4px 16px;

  color: #212121;
  font-weight: bold;
  font-size: 15px;
  text-align: center;
  margin-bottom: 12px;
`;

export const RecordTitle = styled.div`
  margin-top: 20px;
  margin-left: 10px;

  font-size: 24px;
  font-weight: bold;
  color: #000000;

  display: flex;
`;

export const GoalRecordContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
  border-top: 1px solid #e6e6e6;
  padding-top: 12px;
`;

export const GoalRecordItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
`;

export const GoalRecordWeek = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #212121;
`;

export const GoalRecordContent = styled.div`
  font-size: 20px;
  color: #757575;
  font-weight: bold;
`;

export const GoalRecordDate = styled.div`
  font-size: 14px;
  color: #757575;
`;

export const RecordFormWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 12px;
`;

export const RecordWeekAndImageWrapper = styled.div`
  display: flex;
  gap: 5px;
`;
