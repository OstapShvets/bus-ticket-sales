// src/pages/Careers.jsx
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

const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 1.25rem;
`;

const List = styled.ul`
  list-style: disc;
  padding-left: 1.5rem;
  margin-bottom: 1.5rem;
`;

const ListItem = styled.li`
  margin-bottom: 0.75rem;
  font-size: 1.05rem;
`;

const EmailLink = styled.a`
  color: #3d8bfd;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export default function Careers() {
  const { theme } = useTheme();
  const { L, lang } = useLang();

  const jobs = [
    {
      ua: 'Frontend-розробник (React, TypeScript)',
      en: 'Frontend Developer (React, TypeScript)',
    },
    {
      ua: 'Backend-розробник (Node.js, MySQL)',
      en: 'Backend Developer (Node.js, MySQL)',
    },
    {
      ua: 'Інженер DevOps',
      en: 'DevOps Engineer',
    },
    {
      ua: 'UI/UX Дизайнер',
      en: 'UI/UX Designer',
    },
  ];

  return (
    <PageWrapper $theme={theme}>
      <Container>
        <Title>{L('careers_title')}</Title>
        <Paragraph>{L('careers_intro')}</Paragraph>

        <List>
          {jobs.map((job, index) => (
            <ListItem key={index}>{lang === 'ua' ? job.ua : job.en}</ListItem>
          ))}
        </List>

        <Paragraph>
          {L('careers_contact')}{' '}
          <EmailLink href="mailto:hr@bustickets.ua">hr@bustickets.ua</EmailLink>.
        </Paragraph>
      </Container>
    </PageWrapper>
  );
}
