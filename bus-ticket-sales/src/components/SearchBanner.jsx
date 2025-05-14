// src/components/SearchBanner.jsx
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../context/LangContext';

// Fade-in from bottom animation
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// Banner container
const Banner = styled.section`
  position: relative;
  width: 100%;
  height: 60vh;
  background: url('https://source.unsplash.com/1600x900/?bus,road,travel') center/cover no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${fadeInUp} 1s ease-out;
  overflow: hidden;
  &:before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.7));
    z-index: 1;
  }
`;

const Title = styled.h1`
  color: #ffffff;
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  z-index: 2;
  margin: 0;
  padding: 0 1rem;
  @media (max-width: 640px) { font-size: 2.5rem; }
`;

const Subtitle = styled.p`
  color: #e0e0e0;
  font-size: 1.25rem;
  margin: 0.5rem 0 2rem;
  z-index: 2;
  text-align: center;
  @media (max-width: 640px) { font-size: 1rem; }
`;

// Search form container
const FormContainer = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)) 100px;
  gap: 0.75rem;
  align-items: center;
  width: 90%;
  max-width: 800px;
  z-index: 2;
  @media (max-width: 480px) { grid-template-columns: 1fr; }
`;

// Shared input styles
const Input = styled.input`
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  outline: none;
`;

// Search button styling
const SearchButton = styled.button`
  padding: 0.75rem 1rem;
  background: #ff5a5f;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
  &:hover { background: #e0484e; }
`;

export default function SearchBanner() {
  const [form, setForm] = useState({ origin: '', destination: '', date: '', passengers: 1 });
  const navigate = useNavigate();
  const { L } = useLang();

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'passengers') {
      const num = parseInt(value, 10) || 1;
      setForm(prev => ({ ...prev, passengers: Math.min(3, Math.max(1, num)) }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const params = new URLSearchParams(form).toString();
    navigate(`/booking?${params}`);
  };

  return (
    <Banner>
      <Title>{L('home')} – {L('search')}</Title>
      <Subtitle>{L('Book your bus ride instantly')}</Subtitle>
      <FormContainer onSubmit={handleSubmit}>
        <Input
          name="origin"
          type="text"
          placeholder={L('From')}
          value={form.origin}
          onChange={handleChange}
          required
        />
        <Input
          name="destination"
          type="text"
          placeholder={L('To')}
          value={form.destination}
          onChange={handleChange}
          required
        />
        <Input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <Input
          name="passengers"
          type="number"
          min="1"
          max="3"
          placeholder={`${L('Passengers')} (max 3)`}
          value={form.passengers}
          onChange={handleChange}
        />
        <SearchButton type="submit">{L('search')}</SearchButton>
      </FormContainer>
    </Banner>
  );
}