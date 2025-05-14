// src/pages/About.jsx
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useLang } from '../context/LangContext';
import { useTheme } from '../context/ThemeContext';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const PageWrapper = styled.section`
  padding: 3rem 1rem;
  min-height: 100vh;
  background: ${({ $theme }) => ($theme === 'light' ? '#f5f7fa' : '#101214')};
  color: ${({ $theme }) => ($theme === 'light' ? '#1f1f1f' : '#f0f0f0')};
  animation: ${fadeIn} 0.5s ease-out;
`;

const Container = styled.div`
  max-width: 860px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 1.25rem;
`;

const FeatureList = styled.ul`
  list-style: disc;
  padding-left: 1.5rem;
  margin-top: 1rem;
`;

const FeatureItem = styled.li`
  margin-bottom: 0.75rem;
  font-size: 1.05rem;
`;

export default function About() {
  const { L } = useLang();
  const { theme } = useTheme();

  return (
    <PageWrapper $theme={theme}>
      <Container>
        <Title>{L('about_us')}</Title>
        <Paragraph>{L('about_description_1')}</Paragraph>
        <Paragraph>{L('about_description_2')}</Paragraph>

        <FeatureList>
          <FeatureItem>{L('feature_routes')}</FeatureItem>
          <FeatureItem>{L('feature_easy_booking')}</FeatureItem>
          <FeatureItem>{L('feature_pdf')}</FeatureItem>
        </FeatureList>
      </Container>
    </PageWrapper>
  );
}
