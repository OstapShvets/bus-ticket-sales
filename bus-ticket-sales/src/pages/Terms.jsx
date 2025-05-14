// src/pages/Terms.jsx
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
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ $theme }) => ($theme === 'light' ? '#555' : '#ccc')};
  margin-bottom: 1.5rem;
`;

const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 1.25rem;
`;

const OrderedList = styled.ol`
  list-style: decimal;
  padding-left: 1.5rem;
  margin-bottom: 1.5rem;
`;

const ListItem = styled.li`
  margin-bottom: 0.75rem;
  font-size: 1.05rem;
`;

export default function Terms() {
  const { theme } = useTheme();
  const { L } = useLang();

  return (
    <PageWrapper $theme={theme}>
      <Container>
        <Title>{L('terms_title')}</Title>
        <Subtitle $theme={theme}>{L('terms_subtitle')}</Subtitle>

        <Paragraph>{L('terms_intro')}</Paragraph>

        <OrderedList>
          <ListItem>{L('terms_rule_1')}</ListItem>
          <ListItem>{L('terms_rule_2')}</ListItem>
        </OrderedList>
      </Container>
    </PageWrapper>
  );
}
