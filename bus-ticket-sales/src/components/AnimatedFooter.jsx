// src/components/AnimatedFooter.jsx

import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useLang } from '../context/LangContext';

/**
 * Wave animation keyframes for footer background
 */
const wave = keyframes`
  0%   { transform: translateX(0); }
  50%  { transform: translateX(-50%); }
  100% { transform: translateX(0); }
`;

/**
 * Footer container with position relative to hold waves
 */
const FooterContainer = styled.footer`
  position: relative;
  width: 100%;
  background: ${({ themeMode }) => (themeMode === 'light' ? '#f8f9fa' : '#1a1a1a')};
  color: ${({ themeMode }) => (themeMode === 'light' ? '#333' : '#ddd')};
  overflow: hidden;
  padding-top: 4rem;
`;

/**
 * Wave SVG wrapper with horizontal animation
 */
const WaveWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 100px;
  background: url('data:image/svg+xml;utf8,\
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 100" preserveAspectRatio="none">\
      <path d="M0,50 C150,150 350,0 600,50 C850,100 1050,0 1200,50 L1200,100 L0,100 Z" fill="${
        ({ themeMode }) => (themeMode === 'light' ? '#ffffff' : '#181a1f')
      }"/>\
    </svg>') repeat-x;
  animation: ${wave} 8s linear infinite;
  transform: translateX(0);
`;

/**
 * Footer content area
 */
const Content = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

/**
 * Column in footer
 */
const Column = styled.div`
  flex: 1;
  min-width: 200px;
  margin: 1rem 0;
`;

/**
 * Footer heading style
 */
const ColumnHeading = styled.h4`
  margin-bottom: 1rem;
  font-size: 1.125rem;
`;

/**
 * List of links in footer
 */
const FooterLink = styled.a`
  display: block;
  margin-bottom: 0.5rem;
  color: inherit;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #007bff;
  }
`;

/**
 * Social icon container
 */
const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
`;

/**
 * Individual social icon
 */
const SocialIcon = styled.a`
  font-size: 1.5rem;
  color: inherit;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.2);
    color: #007bff;
  }
`;

/**
 * Bottom text bar
 */
const BottomBar = styled.div`
  text-align: center;
  padding: 1rem;
  background: ${({ themeMode }) => (themeMode === 'light' ? '#e9ecef' : '#111')};
  color: ${({ themeMode }) => (themeMode === 'light' ? '#555' : '#888')};
  font-size: 0.875rem;
`;

/**
 * AnimatedFooter component
 */
export default function AnimatedFooter() {
  const { L } = useLang();
  const themeMode = document.documentElement.getAttribute('data-theme') || 'light';

  return (
    <FooterContainer themeMode={themeMode}>
      <WaveWrapper themeMode={themeMode} />
      <Content>
        <Column>
          <ColumnHeading>{L('support')}</ColumnHeading>
          <FooterLink href="/support">{L('support')}</FooterLink>
          <FooterLink href="/faq">FAQ</FooterLink>
        </Column>

        <Column>
          <ColumnHeading>Company</ColumnHeading>
          <FooterLink href="/about">About</FooterLink>
          <FooterLink href="/careers">Careers</FooterLink>
          <FooterLink href="/blog">Blog</FooterLink>
        </Column>

        <Column>
          <ColumnHeading>Legal</ColumnHeading>
          <FooterLink href="/terms">Terms of Service</FooterLink>
          <FooterLink href="/privacy">Privacy Policy</FooterLink>
        </Column>

        <Column>
          <ColumnHeading>Follow Us</ColumnHeading>
          <SocialIcons>
            <SocialIcon href="https://facebook.com" target="_blank">📘</SocialIcon>
            <SocialIcon href="https://twitter.com"  target="_blank">🐦</SocialIcon>
            <SocialIcon href="https://instagram.com" target="_blank">📸</SocialIcon>
          </SocialIcons>
        </Column>
      </Content>
      <BottomBar themeMode={themeMode}>
        &copy; {new Date().getFullYear()} BusTickets Inc. All rights reserved.
      </BottomBar>
    </FooterContainer>
  );
}
