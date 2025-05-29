import styled from "styled-components";

export const TableContainer = styled.div`
  margin: 20px auto;
  max-width: 840px;
  padding: 10px;
`;

export const TableHeading = styled.h2`
  text-align: center;
  margin-bottom: 10px;
  color: #4a2f17; /* dark warm brown */
  font-weight: 700;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff7f1;
  box-shadow: 0 2px 8px rgba(255, 181, 99, 0.15);
  border-radius: 10px;
  overflow: hidden;
`;

export const StyledTh = styled.th`
  text-align: left;
  padding: 12px;
  background-color: #ffb563;
  color: #4a2f17;
  font-weight: 600;
  border-bottom: 3px solid #bf7400;
`;

export const StyledTd = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ffe6bf;
  color: #6b4b23;
`;

export const StyledTr = styled.tr`
  &:hover {
    background-color: #fff1d6; 
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  padding: 0 10px;
`;

export const PaginationButton = styled.button`
  background-color: #ffb563;
  border: none;
  padding: 6px 12px;
  color: #4a2f17;
  font-size: 14px;
  cursor: pointer;
  border-radius: 6px;
  font-weight: 600;
  box-shadow: 0 2px 5px rgba(255, 181, 99, 0.3);
  transition: background-color 0.3s ease;

  &:hover:not(:disabled) {
    background-color: #e68a00;
    color: #fff;
  }

  &:disabled {
    background-color: #ffe6bf;
    color: #bfa373;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

export const NoDataText = styled.p`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background: linear-gradient(135deg, #fff7f1, #fff1e7);
  color: #a16b3b;
  font-style: italic;
  font-size: 1.1rem;
  text-align: center;
  border: 2px dotted #ffb563;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;
