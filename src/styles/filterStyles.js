import styled from "styled-components";

export const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin: 20px 0;
  flex-wrap: wrap;
`;

export const Label = styled.label`
  font-weight: 500;
`;

export const Select = styled.select`
  padding: 6px 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

export const ResetButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 6px 14px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
