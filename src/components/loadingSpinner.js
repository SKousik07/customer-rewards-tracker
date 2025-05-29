import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px auto;
  color: #a16b3b;
  font-weight: 500;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f0f2f5;
  border-top-color: #ffb563;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 12px;
`;

export default function LoadingSpinner() {
  return (
    <SpinnerWrapper>
      <Spinner />
      <span>Loading transactions...</span>
    </SpinnerWrapper>
  );
}
