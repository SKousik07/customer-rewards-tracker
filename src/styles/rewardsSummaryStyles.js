import styled from "styled-components";

export const SummaryContainer = styled.div`
  margin: 20px auto;
  max-width: 800px;
  padding: 20px 28px;
  background: linear-gradient(135deg, #fff7f1, #fff1e7);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(255, 181, 99, 0.15);
  border: 1px solid #ffe1c2;
`;

export const SummaryItem = styled.div`
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  color: #4a2f17;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Title = styled.h3`
  text-align: center;
  margin-bottom: 20px;
  color: #2b1b0f;
  font-size: 1.3rem;
  font-weight: 600;
  border-bottom: 2px solid #ffb563;
  display: inline-block;
  padding-bottom: 4px;
`;

export const NoDataText = styled.p`
  text-align: center;
  color: #a16b3b;
  background-color: #fff7f1;
  border: 1px dashed #ffcf9e;
  padding: 12px 16px;
  margin-top: 20px;
  border-radius: 8px;
  font-style: italic;
  font-size: 0.95rem;
`;
