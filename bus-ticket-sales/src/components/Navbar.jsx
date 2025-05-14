import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import { useLang } from '../context/LangContext';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const NavContainer = styled.nav`
  position: sticky;
  top: 0;
  width: 100%;
  background: ${({ themeMode }) => (themeMode === 'light' ? '#ffffff' : '#1f1f1f')};
  color: ${({ themeMode }) => (themeMode === 'light' ? '#333333' : '#f0f0f0')};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 2rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  animation: ${fadeIn} 0.5s ease-out;
`;

const LeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Logo = styled.div`
  font-size: 1.75rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.5rem;
    fill: ${({ themeMode }) => (themeMode === 'light' ? '#007bff' : '#4dabf7')};
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.25rem;
  white-space: nowrap;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLinkStyled = styled(Link)`
  position: relative;
  font-size: 1rem;
  font-weight: 500;
  color: inherit;
  text-decoration: none;
  padding: 0.5rem 0;
  transition: color 0.3s;

  &:hover { color: #007bff; }
  &::after {
    content: '';
    position: absolute;
    height: 2px;
    width: 0;
    bottom: 0;
    left: 0;
    background: #007bff;
    transition: width 0.3s;
  }
  &:hover::after { width: 100%; }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: inherit;
  font-size: 1.25rem;
  padding: 0.5rem;
  transition: transform 0.2s;

  &:hover { transform: scale(1.1); }
`;

const MobileMenu = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
  }
`;

const slideDown = keyframes`
  from { max-height: 0; opacity: 0; }
  to   { max-height: 300px; opacity: 1; }
`;

const MobileNavLinks = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: ${({ themeMode }) => (themeMode === 'light' ? '#ffffff' : '#1f1f1f')};
  width: 220px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  border-radius: 4px;
  overflow: hidden;
  animation: ${slideDown} 0.3s ease-out;
  display: flex;
  flex-direction: column;
`;

const MobileLink = styled(Link)`
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: inherit;
  font-weight: 500;
  transition: background 0.2s;

  &:hover {
    background: ${({ themeMode }) => (themeMode === 'light' ? '#f0f0f0' : '#2a2a2a')};
  }
`;

export default function Navbar() {
  const navigate = useNavigate();
  const { theme: themeMode, toggle: toggleTheme } = useTheme();
  const { lang, toggle: toggleLang, L } = useLang();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogoClick = () => { navigate('/'); setMobileOpen(false); };
  const handleMobileToggle = () => { setMobileOpen(o => !o); };

  return (
    <NavContainer themeMode={themeMode}>
      <LeftGroup>
        <Logo themeMode={themeMode} onClick={handleLogoClick}>
          <svg width="24" height="24" viewBox="0 0 24 24"><path d="M2 12l1.5-4h17l1.5 4-1.5 4h-17L2 12z"/></svg>
          BusTickets
        </Logo>
        <Controls>
          <IconButton onClick={toggleTheme} title={themeMode==='light' ? 'Dark Mode' : 'Light Mode'}>
            {themeMode==='light' ? '🌙' : '☀️'}
          </IconButton>
          <IconButton onClick={toggleLang} title="Toggle Language">
            {lang==='ua' ? 'EN' : 'UA'}
          </IconButton>
        </Controls>
        <NavLinks>
          <NavLinkStyled to="/">{L('home')}</NavLinkStyled>
          {/* Пошукове посилання видалено */}
          {/* Акаунтове посилання видалено */}
          <NavLinkStyled to="/support">{L('support')}</NavLinkStyled>
          <NavLinkStyled to="/login">{L('personal_account')}</NavLinkStyled>
          {/* <NavLinkStyled to="/register">{L('register')}</NavLinkStyled> */}
        </NavLinks>
      </LeftGroup>

      <MobileMenu>
        <IconButton onClick={handleMobileToggle}>{ mobileOpen ? '✖️' : '☰' }</IconButton>
      </MobileMenu>

      {mobileOpen && (
        <MobileNavLinks themeMode={themeMode}>
          <MobileLink to="/" onClick={handleLogoClick}>{L('home')}</MobileLink>
          <MobileLink to="/account" onClick={handleMobileToggle}>{L('account')}</MobileLink>
          <MobileLink to="/support" onClick={handleMobileToggle}>{L('support')}</MobileLink>
          <MobileLink to="/login" onClick={handleMobileToggle}>{L('login')}</MobileLink>
          <MobileLink to="/register" onClick={handleMobileToggle}>{L('register')}</MobileLink> 
          <MobileLink as="button" onClick={() => { toggleTheme(); handleMobileToggle(); }}>
            {themeMode==='light'? '☀️ Dark':'🌙 Light'}
          </MobileLink>
          <MobileLink as="button" onClick={() => { toggleLang(); handleMobileToggle(); }}>
            {lang==='ua'? 'EN':'UA'}
          </MobileLink>
        </MobileNavLinks>
      )}
    </NavContainer>
  );
}