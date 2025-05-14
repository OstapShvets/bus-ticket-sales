// src/pages/Blog.jsx
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

const PostList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
`;

const PostItem = styled.li`
  border-bottom: 1px solid ${({ $theme }) => ($theme === 'light' ? '#ccc' : '#333')};
  padding-bottom: 1rem;
`;

const PostLink = styled.a`
  font-size: 1.4rem;
  font-weight: 600;
  color: #3d8bfd;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const PostDate = styled.p`
  font-size: 0.9rem;
  color: ${({ $theme }) => ($theme === 'light' ? '#666' : '#aaa')};
  margin-top: 0.25rem;
`;

const posts = [
  {
    id: 1,
    title_ua: '10 порад для комфортної поїздки автобусом',
    title_en: '10 Tips for a Comfortable Bus Trip',
    date: '01.05.2025',
    url: 'https://klr.com.ua/blog/10-porad-yak-zrobyty-dovgu-poyizdku-avtobusom-bilsh-komfortnoyu'
  },
  {
    id: 2,
    title_ua: 'Документи, на підставі яких виконуються пасажирські перевезення',
    title_en: 'Documents Regulating Passenger Transportation',
    date: '15.04.2025',
    url: 'https://protocol.ua/ua/pro_avtomobilniy_transport_stattya_39/'
  }
];

export default function Blog() {
  const { theme } = useTheme();
  const { lang, L } = useLang();

  return (
    <PageWrapper $theme={theme}>
      <Container>
        <Title>{L('blog_title')}</Title>
        <PostList>
          {posts.map(post => (
            <PostItem key={post.id} $theme={theme}>
              <PostLink href={post.url} target="_blank" rel="noopener noreferrer">
                {lang === 'ua' ? post.title_ua : post.title_en}
              </PostLink>
              <PostDate $theme={theme}>{post.date}</PostDate>
            </PostItem>
          ))}
        </PostList>
      </Container>
    </PageWrapper>
  );
}
