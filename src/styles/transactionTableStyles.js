import styled from "styled-components";

export const TableContainer = styled.div`
  margin: 20px auto;
  max-width: 840px;
  padding: 10px;
`;

export const TableHeading = styled.h2`
  text-align: center;
  margin-bottom: 10px;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

export const StyledTh = styled.th`
  text-align: left;
  padding: 12px;
  background-color: #f0f2f5;
  font-weight: 600;
  border-bottom: 2px solid #e0e0e0;
`;

export const StyledTd = styled.td`
  padding: 12px;
  border-bottom: 1px solid #f0f0f0;
`;

export const StyledTr = styled.tr`
  &:hover {
    background-color: #f9f9f9;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  padding: 0 10px;
`;

export const PaginationButton = styled.button`
  background-color: #007bff;
  border: none;
  padding: 6px 12px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const NoDataText = styled.p`
  text-align: center;
  margin-top: 20px;
  color: #888;
`;
