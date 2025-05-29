import styled from "styled-components";

export const TableContainer = styled.div`
  margin: 20px auto;
  max-width: 800px;
  max-height: 300px;
  overflow-x: auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  background: #fffaf5;
`;

export const TableHeading = styled.h2`
  text-align: center;
  margin-top: 20px;
  font-size: 1.5rem;
  color: #4a2f17;
  font-weight: 700;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background-color: #ffffff;
  border-radius: 12px;
  overflow: hidden;
`;

export const StyledTh = styled.th`
  text-align: left;
  padding: 12px;
  background: linear-gradient(to right, #ffe0c2, #ffb563);
  color: #4a2f17;
  font-weight: 600;
  border-bottom: 2px solid #f1d6b8;
  position: sticky;
  top: 0;
  z-index: 1;
`;

export const StyledTd = styled.td`
  padding: 12px;
  border-bottom: 1px solid #f7e4d2;
  color: #3e3e3e;
`;

export const StyledTr = styled.tr`
  cursor: ${(props) => (props.selected ? "default" : "pointer")};
  background-color: ${(props) => (props.selected ? "#ffe9cc" : "#ffffff")};
  transition: background 0.25s ease;

  &:hover {
    background-color: ${(props) => (props.selected ? "#ffd9aa" : "#fff4e5")};
  }

  &:last-child td {
    border-bottom: none;
  }
`;
