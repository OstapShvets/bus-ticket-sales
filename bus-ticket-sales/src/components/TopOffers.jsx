// src/components/TopOffers.jsx

import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { getTopRoutes } from '../api';
import { useLang } from '../context/LangContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const pop = keyframes`
  0%   { transform: scale(1); }
  50%  { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const Section = styled.section`
  padding: 4rem 2rem;
  animation: ${fadeIn} 0.8s ease-out;
  background: ${({ $theme }) => ($theme === 'light' ? '#f9f9f9' : '#121212')};
  color: ${({ $theme }) => ($theme === 'light' ? '#333' : '#eee')};
`;

const Heading = styled.h2`
  text-align: center;
  font-size: 2.5rem;
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Card = styled.div`
  background: ${({ $theme }) => ($theme === 'light' ? '#ffffff' : '#1e1e1e')};
  color: ${({ $theme }) => ($theme === 'light' ? '#333' : '#ddd')};
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    animation: ${pop} 0.4s ease-in-out;
    box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  }
`;

const RouteInfo = styled.div`
  margin-bottom: 1rem;

  h3 {
    font-size: 1.3rem;
    margin-bottom: 0.3rem;
  }

  p {
    margin: 0.25rem 0;
    font-size: 0.95rem;
    color: ${({ $theme }) => ($theme === 'light' ? '#555' : '#aaa')};
  }
`;

const Price = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: rgb(28, 209, 24);
`;

const BookButton = styled.button`
  background: #007bff;
  color: #fff;
  border: none;
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #0056b3;
  }
`;

export default function TopOffers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { L } = useLang();
  const { theme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    getTopRoutes()
      .then(response => {
        setOffers(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching top routes:', err);
        setError(L('Failed_to_load_routes'));
        setLoading(false);
      });
  }, [L]);

  if (loading) {
    return (
      <Section $theme={theme}>
        <Heading>{L('popular_routes')}</Heading>
        <p>{L('loading')}</p>
      </Section>
    );
  }

  if (error) {
    return (
      <Section $theme={theme}>
        <Heading>{L('popular_routes')}</Heading>
        <p>{error}</p>
      </Section>
    );
  }

  return (
    <Section $theme={theme}>
      <Heading>{L('popular_routes')}</Heading>
      <Grid>
        {offers.slice(0, 4).map(route => (
          <Card key={route.id} $theme={theme}>
            <RouteInfo $theme={theme}>
              <h3>{route.origin} → {route.destination}</h3>
              <p>{new Date(route.departure_time).toLocaleDateString()}</p>
              <p>{route.seats_available} {L('seats_left')}</p>
            </RouteInfo>
            <Price>{route.price} UAH</Price>
            <BookButton onClick={() =>
              navigate(`/booking?origin=${route.origin}&destination=${route.destination}&date=${route.departure_time.split('T')[0]}&passengers=1`)
            }>
              {L('book_now')}
            </BookButton>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}
