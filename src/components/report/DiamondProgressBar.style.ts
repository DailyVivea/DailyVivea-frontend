import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

// 바 전체 크기, 모양
export const ProgressContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  height: 7px;
  background-color: #E6E6E6;
  border-radius: 15px;
`;

// 바 배경
export const ProgressBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #E6E6E6;
  border-radius: 15px;
`;

// 바 진행상태
export const ProgressBarFill = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: #95E757;
  border-radius: 15px;
`;



export const ProgressButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
`;
// 드래그 버튼 형태
export const ProgressButton = styled.div`
  width: 10px;
  height: 30px;
  background-color: #95E757;
  border-radius: 50%;
  cursor: pointer;
  pointer-events: auto;
  position: absolute;
`;
// 버튼을 다이아몬드 모양으로 만들기위한 용도
export const ProgressButtonAccessary = styled.div`
  width: 30px;
  height: 10px;
  background-color: #95E757;
  border-radius: 50%;
  cursor: pointer;
  pointer-events: auto;
  position: absolute;
  left: 0;
  transform: translateX(-30%);
`;

export const Text = styled.div`
  color: #212121;
  font-weight: 600; //semibold;
  font-size: 16px;
  margin-bottom: 10px;
`;