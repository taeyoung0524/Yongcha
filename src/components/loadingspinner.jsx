// LoadingSpinner.js
import React from 'react';
import styled, { keyframes } from 'styled-components';

// 스피너 회전 애니메이션
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// 스피너 스타일
const Spinner = styled.div`
  border: 8px solid #f3f3f3;         // 회색 테두리
  border-top: 8px solid #3498db;     // 파란색 상단 테두리
  border-radius: 50%;                // 원형
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite; // 회전 애니메이션 적용
  margin: auto;                      // 가운데 정렬
`;

const LoadingSpinner = () => <Spinner/>;

export default LoadingSpinner;
