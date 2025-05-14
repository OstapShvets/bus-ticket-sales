// src/pages/SupportFAQ.jsx
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
  background: ${({ $theme }) => ($theme === 'light' ? '#f8f9fa' : '#121416')};
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
  margin-bottom: 1.5rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ $theme }) => ($theme === 'light' ? '#555' : '#ccc')};
  margin-bottom: 2.5rem;
`;

const QAList = styled.ol`
  list-style: decimal;
  padding-left: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

const Question = styled.h2`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const Answer = styled.p`
  font-size: 1.05rem;
  line-height: 1.7;
`;

export default function SupportFAQ() {
  const { theme } = useTheme();
  const { L } = useLang();

  return (
    <PageWrapper $theme={theme}>
      <Container>
        <Title>{L('faq_title')}</Title>
        <Subtitle $theme={theme}>{L('faq_subtitle')}</Subtitle>

        <QAList>
          <li>
            <Question>{L('faq_q1')}</Question>
            <Answer>{L('faq_a1')}</Answer>
          </li>
          <li>
            <Question>{L('faq_q2')}</Question>
            <Answer>{L('faq_a2')}</Answer>
          </li>
          <li>
            <Question>{L('faq_q3')}</Question>
            <Answer>{L('faq_a3')}</Answer>
          </li>
          <li>
            <Question>{L('faq_q4')}</Question>
            <Answer>{L('faq_a4')}</Answer>
          </li>
        </QAList>
      </Container>
    </PageWrapper>
  );
}
