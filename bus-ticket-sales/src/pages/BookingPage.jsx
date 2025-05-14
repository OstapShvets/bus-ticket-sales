import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { searchRoutes } from '../api';
import { useLang } from '../context/LangContext';
import { useTheme } from '../context/ThemeContext';
import Loader from '../components/Loader';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const PageContainer = styled.div`
  padding: 3rem 2rem;
  background: ${({ themeMode }) => (themeMode === 'light' ? '#fafafa' : '#181a1b')};
  min-height: 80vh;
  animation: ${fadeIn} 0.8s ease-out;
  color: ${({ themeMode }) => (themeMode === 'light' ? '#333' : '#ddd')};
`;

const Title = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
`;

const RoutesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px,1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const RouteCard = styled.div`
  background: ${({ themeMode }) => (themeMode === 'light' ? '#fff' : '#1f1f23')};
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  }
`;

const RouteDetails = styled.div`
  margin-bottom: 1rem;

  h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.25rem;
  }

  p {
    margin: 0.25rem 0;
    font-size: 0.9rem;
    color: ${({ themeMode }) => (themeMode === 'light' ? '#555' : '#aaa')};
  }
`;

const ActionBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PriceText = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: #ff5a5f;
`;

const BookBtn = styled.button`
  padding: 0.5rem 1rem;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-transform: uppercase;
  transition: background 0.3s;

  &:hover {
    background: #0056b3;
  }
`;

const ErrorMsg = styled.div`
  color: #c0392b;
  text-align: center;
  margin-top: 2rem;
  font-size: 1rem;
`;

export default function BookingPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { L } = useLang();
  const { theme } = useTheme(); // ✅ тема з контексту

  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const origin = searchParams.get('origin') || '';
  const destination = searchParams.get('destination') || '';
  const date = searchParams.get('date') || '';
  const passengers = searchParams.get('passengers') || '1';

  useEffect(() => {
    setLoading(true);
    setError(null);

    searchRoutes({ origin, destination, date })
      .then(response => {
        setRoutes(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Search error:', err);
        setError(L('Failed to load routes') || 'Failed to load routes');
        setLoading(false);
      });
  }, [origin, destination, date, L]);

  const handleBook = (schedule_id) => {
    const user_id = localStorage.getItem('user_id');
    if (!user_id) {
      navigate('/login');
    } else {
      const params = new URLSearchParams({ schedule_id, user_id, passengers });
      navigate(`/passengers?${params.toString()}`);
    }
  };

  if (loading) {
    return <Loader showSkeleton={false} />;
  }

  return (
    <PageContainer themeMode={theme}>
      <Title>{L('available_routes')}</Title>

      {error && <ErrorMsg>{error}</ErrorMsg>}

      {!error && routes.length === 0 && (
        <ErrorMsg>{L('no_routes_found')}</ErrorMsg>
      )}

      {!error && routes.length > 0 && (
        <RoutesGrid>
          {routes.map(route => (
            <RouteCard key={route.id} themeMode={theme}>
              <RouteDetails themeMode={theme}>
                <h3>{route.origin} → {route.destination}</h3>
                <p>{new Date(route.departure_time).toLocaleString()}</p>
                <p>{route.seats_available} {L('seats_left')}</p>
              </RouteDetails>
              <ActionBar>
                <PriceText>{route.price} UAH</PriceText>
                <BookBtn onClick={() => handleBook(route.id)}>
                  {L('book_now')}
                </BookBtn>
              </ActionBar>
            </RouteCard>
          ))}
        </RoutesGrid>
      )}
    </PageContainer>
  );
}
