import styled from "styled-components";

export const TableContainer = styled.div`
  margin: 20px auto;
  max-width: 800px;
  max-height: 300px;
  overflow-x: auto;
`;

export const TableHeading = styled.h2`
  text-align: center;
  margin-top: 20px;
  font-size: 1.5rem;
  color: #333;
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
  cursor: ${(props) => (props.selected ? "default" : "pointer")};
  background-color: ${(props) => (props.selected ? "#e6f7ff" : "white")};
  transition: background 0.2s;

  &:hover {
    background-color: ${(props) => (props.selected ? "#d0efff" : "#f9f9f9")};
  }
`;
