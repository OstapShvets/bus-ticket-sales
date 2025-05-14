import React from 'react';
import styled, { keyframes } from 'styled-components';

/**
 * Rotation keyframes for spinner
 */
const rotate = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

/**
 * Fade keyframes for skeleton shimmer
 */
const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
`;

/**
 * Fullscreen overlay for page loading
 */
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ themeMode }) => (themeMode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0,0,0,0.8)')};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

/**
 * Spinner circle
 */
const Spinner = styled.div`
  width: 80px;
  height: 80px;
  border: 8px solid ${({ themeMode }) => (themeMode === 'light' ? '#e0e0e0' : '#333')};
  border-top: 8px solid #007bff;
  border-radius: 50%;
  animation: ${rotate} 1s linear infinite;
`;

/**
 * Skeleton placeholder for content blocks
 */
const SkeletonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  width: 80%;
  max-width: 800px;
`;

const SkeletonCard = styled.div`
  height: 150px;
  background: ${({ themeMode }) =>
    themeMode === 'light'
      ? 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)'
      : 'linear-gradient(90deg, #2a2a2a 25%, #1f1f1f 50%, #2a2a2a 75%)'};
  background-size: 400px 100%;
  border-radius: 8px;
  animation: ${shimmer} 1.5s infinite linear;
`;

/**
 * Fallback text below spinner
 */
const LoadingText = styled.p`
  margin-top: 1rem;
  font-size: 1.125rem;
  color: ${({ themeMode }) => (themeMode === 'light' ? '#333' : '#eee')};
`;

/**
 * Loader component props:
 *   - showSkeleton: boolean, whether to show skeleton cards instead of spinner
 *   - count: number of skeleton cards
 */
export default function Loader({ showSkeleton = false, count = 4 }) {
  const themeMode = document.documentElement.getAttribute('data-theme') || 'light';

  return (
    <Overlay themeMode={themeMode}>
      {showSkeleton ? (
        <SkeletonContainer>
          {Array.from({ length: count }).map((_, idx) => (
            <SkeletonCard key={idx} themeMode={themeMode} />
          ))}
        </SkeletonContainer>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <Spinner themeMode={themeMode} />
          <LoadingText themeMode={themeMode}>Loading...</LoadingText>
        </div>
      )}
    </Overlay>
  );
}
