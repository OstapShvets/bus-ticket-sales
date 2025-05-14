// src/pages/HomePage.jsx

import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useLang } from '../context/LangContext';
import SearchBanner from '../components/SearchBanner';
import TopOffers from '../components/TopOffers';

/** 
 * Fade-in animation for sections 
 */
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/**
 * Container wrapping each section
 */
const Section = styled.section`
  padding: 4rem 2rem;
  animation: ${fadeIn} 0.8s ease-out;
  background: ${({ bg }) => bg || 'transparent'};
  color: ${({ themeMode }) => (themeMode === 'light' ? '#333' : '#eee')};
`;

/**
 * Heading style for sections
 */
const SectionHeading = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    width: 80px;
    height: 4px;
    background: #007bff;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

/**
 * Grid layout for features
 */
const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px,1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

/**
 * Individual feature card
 */
const FeatureCard = styled.div`
  background: ${({ themeMode }) => (themeMode === 'light' ? '#fff' : '#1e1e1e')};
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s;
  &:hover { transform: translateY(-5px); }
`;

/**
 * Icon wrapper for feature icons
 */
const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #007bff;
`;

/**
 * Feature title and description
 */
const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;
const FeatureDesc = styled.p`
  font-size: 1rem;
  color: ${({ themeMode }) => (themeMode === 'light' ? '#555' : '#ccc')};
`;

/**
 * Partners logos grid
 */
const PartnersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px,1fr));
  gap: 2rem;
  align-items: center;
  justify-items: center;
  flex-wrap: wrap;
`;

/**
 * Individual partner logo
 */
const PartnerLogo = styled.img`
  max-width: 100px;
  opacity: 0.8;
  transition: opacity 0.3s, transform 0.3s;
  &:hover { opacity: 1; transform: scale(1.1); }
`;

/**
 * Testimonials slider container
 */
const TestimonialsContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px,1fr));
  gap: 2rem;
`;

/**
 * Individual testimonial card
 */
const TestimonialCard = styled.div`
  background: ${({ themeMode }) => (themeMode === 'light' ? '#fff' : '#1e1e1e')};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  position: relative;
  &:before {
    content: '“';
    font-size: 4rem;
    position: absolute;
    top: -10px;
    left: 20px;
    color: #007bff;
    opacity: 0.1;
  }
`;
const TestimonialText = styled.p`
  font-style: italic;
  margin-bottom: 1rem;
`;
const TestimonialAuthor = styled.h4`
  margin: 0;
  text-align: right;
  font-weight: 600;
`;

/**
 * Main HomePage component
 */
export default function HomePage() {
  const { L } = useLang();
  const themeMode = document.documentElement.getAttribute('data-theme') || 'light';

  // Example partner data
  const partners = [
    { name: 'Tickets.ua', logo: 'https://3dncdn.com/assets/pravda/img/logos/tickets-logo-ua.png' },
    { name: 'INFOBUS', logo: 'https://infobus.info/img/update_img/Logo_download_1.svg' },
    { name: 'KLR Bus', logo: 'https://klr.com.ua/favicon.ico' },
    { name: 'Busfor', logo: 'https://logowik.com/content/uploads/images/busfor1360.logowik.com.webp' },
  ];

  // Example testimonials
  const testimonials = [
    { text: 'Швидко і зручно забронював квиток на Львів. Дуже задоволений сервісом!', author: 'Ольга Іванова' },
    { text: 'Excellent booking experience, clear UI and fast PDF ticket download.', author: 'John Smith' },
    { text: 'Підтримка відповіла миттєво, квитки завантажив без проблем.', author: 'Марина Петренко' },
  ];

  return (
    <>
      {/* Hero banner with search */}
      <SearchBanner />

      {/* Popular routes */}
      <TopOffers />

      {/* Features Section */}
      <Section themeMode={themeMode} bg={themeMode === 'light' ? '#f9f9f9' : '#121212'}>
        <SectionHeading themeMode={themeMode}>{L('features') || 'Наші переваги'}</SectionHeading>
        <FeaturesGrid>
          <FeatureCard themeMode={themeMode}>
            <FeatureIcon>🛒</FeatureIcon>
            <FeatureTitle>{L('Легке бронювання') || 'Легке бронювання'}</FeatureTitle>
            <FeatureDesc themeMode={themeMode}>
              {L('Швидкий пошук і бронювання квитків за лічені хвилини') || 'Швидкий пошук і бронювання квитків за лічені хвилини.'}
            </FeatureDesc>
          </FeatureCard>
          <FeatureCard themeMode={themeMode}>
            <FeatureIcon>🔒</FeatureIcon>
            <FeatureTitle>{L('Безпека даних') || 'Безпека даних'}</FeatureTitle>
            <FeatureDesc themeMode={themeMode}>
              {L('Гарантованана безпека ваших персональних') || 'Гарантована безпека ваших платежів та персональних даних.'}
            </FeatureDesc>
          </FeatureCard>
          <FeatureCard themeMode={themeMode}>
            <FeatureIcon>📞</FeatureIcon>
            <FeatureTitle>{L('Підтримка 24/7') || 'Підтримка 24/7'}</FeatureTitle>
            <FeatureDesc themeMode={themeMode}>
              {L('Ми завжди готові вам допомогти') || 'Наші агенти завжди готові допомогти у будь-який час доби.'}
            </FeatureDesc>
          </FeatureCard>
        </FeaturesGrid>
      </Section>

      {/* Partners Section */}
      <Section themeMode={themeMode}>
        <SectionHeading themeMode={themeMode}>{L('partners') || 'Наші партнери'}</SectionHeading>
        <PartnersGrid>
          {partners.map((p, idx) => (
            <PartnerLogo
              key={idx}
              src={p.logo}
              alt={p.name}
              themeMode={themeMode}
            />
          ))}
        </PartnersGrid>
      </Section>

      {/* Testimonials Section */}
      <Section themeMode={themeMode} bg={themeMode === 'light' ? '#f9f9f9' : '#121212'}>
        <SectionHeading themeMode={themeMode}>{L('testimonials') || 'Відгуки клієнтів'}</SectionHeading>
        <TestimonialsContainer>
          {testimonials.map((t, idx) => (
            <TestimonialCard key={idx} themeMode={themeMode}>
              <TestimonialText>{t.text}</TestimonialText>
              <TestimonialAuthor>{t.author}</TestimonialAuthor>
            </TestimonialCard>
          ))}
        </TestimonialsContainer>
      </Section>
    </>
  );
}
