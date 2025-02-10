import styled from "styled-components";

export const CardGridContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3열 배치 */
  gap: 50px;
  justify-content: center; /* 가운데 정렬 */
  margin-top: 16px;
  max-width: 1200px; /* 그리드의 최대 너비 설정 */
`;
