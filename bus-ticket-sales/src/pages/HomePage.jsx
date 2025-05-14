// src/pages/HomePage.jsx
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useLang } from '../context/LangContext';
import { useTheme } from '../context/ThemeContext';
import SearchBanner from '../components/SearchBanner';
import TopOffers from '../components/TopOffers';

// Animation
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// Section wrapper
const Section = styled.section`
  padding: 4rem 2rem;
  animation: ${fadeIn} 0.8s ease-out;
  background: ${({ $theme }) => ($theme === 'light' ? '#f9f9f9' : '#121212')};
  color: ${({ $theme }) => ($theme === 'light' ? '#333' : '#eee')};
`;

// Section heading
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

// Grid for features
const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px,1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

// Feature card
const FeatureCard = styled.div`
  background: ${({ $theme }) => ($theme === 'light' ? '#fff' : '#1e1e1e')};
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

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #007bff;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const FeatureDesc = styled.p`
  font-size: 1rem;
  color: ${({ $theme }) => ($theme === 'light' ? '#555' : '#ccc')};
`;

// Partners
const PartnersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px,1fr));
  gap: 2rem;
  align-items: center;
  justify-items: center;
  flex-wrap: wrap;
`;

const PartnerLogo = styled.img`
  max-width: 100px;
  opacity: 0.8;
  transition: opacity 0.3s, transform 0.3s;
  &:hover { opacity: 1; transform: scale(1.1); }
`;

// Testimonials
const TestimonialsContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px,1fr));
  gap: 2rem;
`;

const TestimonialCard = styled.div`
  background: ${({ $theme }) => ($theme === 'light' ? '#fff' : '#1e1e1e')};
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

export default function HomePage() {
  const { L } = useLang();
  const { theme } = useTheme(); // 💡 правильна тема

  const partners = [
    { name: 'Tickets.ua', logo: 'https://3dncdn.com/assets/pravda/img/logos/tickets-logo-ua.png' },
    { name: 'INFOBUS', logo: 'https://infobus.info/img/update_img/Logo_download_1.svg' },
    { name: 'KLR Bus', logo: 'https://klr.com.ua/favicon.ico' },
    { name: 'Busfor', logo: 'https://logowik.com/content/uploads/images/busfor1360.logowik.com.webp' },
  ];

  const testimonials = [
    { text: 'Швидко і зручно забронював квиток на Львів. Дуже задоволений сервісом!', author: 'Ольга Іванова' },
    { text: 'Excellent booking experience, clear UI and fast PDF ticket download.', author: 'John Smith' },
    { text: 'Підтримка відповіла миттєво, квитки завантажив без проблем.', author: 'Марина Петренко' },
  ];

  return (
    <>
      <SearchBanner />
      <TopOffers />

      {/* Features */}
      <Section $theme={theme}>
        <SectionHeading>{L('features')}</SectionHeading>
        <FeaturesGrid>
          <FeatureCard $theme={theme}>
            <FeatureIcon>🛒</FeatureIcon>
            <FeatureTitle>{L('Легке бронювання')}</FeatureTitle>
            <FeatureDesc $theme={theme}>
              {L('Швидкий пошук і бронювання квитків за лічені хвилини')}
            </FeatureDesc>
          </FeatureCard>
          <FeatureCard $theme={theme}>
            <FeatureIcon>🔒</FeatureIcon>
            <FeatureTitle>{L('Безпека даних')}</FeatureTitle>
            <FeatureDesc $theme={theme}>
              {L('Гарантована безпека ваших персональних')}
            </FeatureDesc>
          </FeatureCard>
          <FeatureCard $theme={theme}>
            <FeatureIcon>📞</FeatureIcon>
            <FeatureTitle>{L('Підтримка 24/7')}</FeatureTitle>
            <FeatureDesc $theme={theme}>
              {L('Ми завжди готові вам допомогти')}
            </FeatureDesc>
          </FeatureCard>
        </FeaturesGrid>
      </Section>

      {/* Partners */}
      <Section $theme={theme}>
        <SectionHeading>{L('partners')}</SectionHeading>
        <PartnersGrid>
          {partners.map((p, idx) => (
            <PartnerLogo key={idx} src={p.logo} alt={p.name} />
          ))}
        </PartnersGrid>
      </Section>

      {/* Testimonials */}
      <Section $theme={theme}>
        <SectionHeading>{L('testimonials')}</SectionHeading>
        <TestimonialsContainer>
          {testimonials.map((t, idx) => (
            <TestimonialCard key={idx} $theme={theme}>
              <TestimonialText>{t.text}</TestimonialText>
              <TestimonialAuthor>{t.author}</TestimonialAuthor>
            </TestimonialCard>
          ))}
        </TestimonialsContainer>
      </Section>
    </>
  );
}
