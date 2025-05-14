// src/components/TopOffers.jsx

import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { getTopRoutes } from '../api';
import { useLang } from '../context/LangContext';
import { useNavigate } from 'react-router-dom';

const pop = keyframes`
  0%   { transform: scale(1); }
  50%  { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const Section = styled.section`
  padding: 3rem 2rem;
  background: ${({ themeMode }) => (themeMode === 'light' ? '#f9f9f9' : '#121212')};
  color: ${({ themeMode }) => (themeMode === 'light' ? '#333' : '#eee')};
`;

const Heading = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2rem;
  opacity: 0;
  animation: ${keyframes`
    from { opacity: 0; transform: translateX(-20px); }
    to   { opacity: 1; transform: translateX(0); }
  `} 0.8s ease-out forwards;
`;

const Grid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: ${({ themeMode }) => (themeMode === 'light' ? '#ffffff' : '#1e1e1e')};
  color: ${({ themeMode }) => (themeMode === 'light' ? '#333' : '#ddd')};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    animation: ${pop} 0.4s ease-in-out;
    box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  }
`;

const RouteInfo = styled.div`
  margin-bottom: 1rem;

  h3 {
    margin: 0 0 0.5rem;
    font-size: 1.25rem;
  }

  p {
    margin: 0.25rem 0;
    font-size: 0.9rem;
    color: ${({ themeMode }) => (themeMode === 'light' ? '#555' : '#aaa')};
  }
`;

const Price = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color:rgb(28, 209, 24);
`;

const BookButton = styled.button`
  background: #007bff;
  color: #ffffff;
  border: none;
  padding: 0.75rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  text-transform: uppercase;
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
  const navigate = useNavigate();
  const themeMode = document.documentElement.getAttribute('data-theme') || 'light';

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
      <Section themeMode={themeMode}>
        <Heading themeMode={themeMode}>{L('popular_routes')}</Heading>
        <p>{L('loading')}</p>
      </Section>
    );
  }

  if (error) {
    return (
      <Section themeMode={themeMode}>
        <Heading themeMode={themeMode}>{L('popular_routes')}</Heading>
        <p>{error}</p>
      </Section>
    );
  }

  return (
    <Section themeMode={themeMode}>
      <Heading themeMode={themeMode}>{L('popular_routes')}</Heading>
      <Grid>
        {offers.map(route => (
          <Card key={route.id} themeMode={themeMode}>
            <RouteInfo themeMode={themeMode}>
              <h3>{route.origin} → {route.destination}</h3>
              <p>{new Date(route.departure_time).toLocaleDateString()}</p>
              <p>{route.seats_available} {L('seats_left')}</p>
            </RouteInfo>
            <Price>{route.price} UAH</Price>
            <BookButton onClick={() => navigate(`/booking?origin=${route.origin}&destination=${route.destination}&date=${route.departure_time.split('T')[0]}&passengers=1`)}>
              {L('book_now')}
            </BookButton>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}