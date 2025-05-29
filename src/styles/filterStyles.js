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
  color: #4a2f17;
`;

export const Select = styled.select`
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #ffb563;
  background-color: #fff5eb;
  color: #4a2f17;
  font-weight: 500;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #e59432;
    box-shadow: 0 0 0 2px rgba(255, 181, 99, 0.3);
  }
`;

export const ResetButton = styled.button`
  background-color: #ffb563;
  color: #4a2f17;
  border: none;
  padding: 6px 14px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background-color: #e59432;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 181, 99, 0.4);
  }
`;

export const FilterSummary = styled.div`
  display: inline-block;
  background-color: #ffecd9;
  color: #4a2f17;
  padding: 4px 12px;
  font-size: 0.95rem;
  font-weight: 500;
  border-radius: 999px;
  margin-top: 12px;
  text-align: center;
`;
