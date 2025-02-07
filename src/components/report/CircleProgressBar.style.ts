import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CircleBackground = styled.circle`
  stroke: #F0F0F0;
  fill: none;
`;

export const CircleProgress = styled.circle`
  stroke: #95E757;
  fill: none;
  stroke-linecap: round;
`;

export const TextWrapper = styled.div`
  position: absolute;
  text-align: center;
`;
export const ProgressText = styled.p`
  color: #000000;
  font-weight: bold;
  font-size: 35px;
`;
export const DescriptionText = styled.p`
  color: #B6B6B6;
  font-weight: medium;
  font-size: 13px;
`;
