import styled from "styled-components";

export const CenterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

export const VerticalCenterWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const ErrorMessage = styled.div`
  margin: 16px auto;
  padding: 12px 16px;
  max-width: 600px;
  background-color: #fff3e6;
  color: #a94442;
  border: 1px dashed #ffb563;
  border-radius: 6px;
  font-weight: 500;
  text-align: center;
`;
