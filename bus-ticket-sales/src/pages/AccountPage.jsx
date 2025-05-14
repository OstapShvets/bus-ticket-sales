import React, { useState, useEffect } from 'react';
import { getTickets, cancelTicket } from '../api';
import styled, { keyframes } from 'styled-components';
import { useLang } from '../context/LangContext';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import arialBase64 from '../fonts/arial_base64';
import { useTheme } from '../context/ThemeContext';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const PageContainer = styled.div`
  padding: 3rem 2rem;
  min-height: 75vh;
  background: ${({ theme }) => (theme.mode === 'light' ? '#f8f9fa' : '#18181b')};
  animation: ${fadeIn} 0.6s ease-out;
  color: ${({ theme }) => (theme.mode === 'light' ? '#333' : '#ddd')};
`;

const Title = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
`;

const TicketsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const TicketCard = styled.div`
  background: ${({ theme }) => (theme.mode === 'light' ? '#ffffff' : '#1e1e22')};
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s, box-shadow 0.3s;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`;

const TicketDetails = styled.div`
  margin-bottom: 1rem;

  h3 {
    margin: 0 0 0.5rem;
    font-size: 1.25rem;
  }

  p {
    margin: 0.25rem 0;
    font-size: 0.9rem;
    color: ${({ theme }) => (theme.mode === 'light' ? '#555' : '#aaa')};
  }
`;

const ActionsWrapper = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 1rem;
`;

const ActionButton = styled.button`
  padding: 0.7rem 1.4rem;
  font-size: 1rem;
  min-width: 160px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  text-transform: uppercase;
  text-align: center;
  transition: background 0.25s ease, transform 0.2s ease;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateY(-1px);
  }

  &.download {
    background: #198754;
    color: #fff;
  }

  &.download:hover {
    background: #157347;
  }

  &.cancel {
    background: #dc3545;
    color: #fff;
  }

  &.cancel:hover {
    background: #bb2d3b;
  }
`;

const EmptyMsg = styled.p`
  text-align: center;
  font-style: italic;
  color: ${({ theme }) => (theme.mode === 'light' ? '#777' : '#999')};
`;

const ToggleThemeButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 0.5rem 1rem;
  background: ${({ theme }) => (theme.mode === 'light' ? '#333' : '#fff')};
  color: ${({ theme }) => (theme.mode === 'light' ? '#fff' : '#333')};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
`;

export default function AccountPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { L } = useLang();
  const navigate = useNavigate();
  const { theme, toggle } = useTheme();
  const user_id = localStorage.getItem('user_id');

  useEffect(() => {
    if (!user_id) {
      navigate('/login');
      return;
    }
    getTickets(user_id)
      .then(res => {
        setTickets(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading tickets:', err);
        setError(L('Failed to load tickets') || 'Failed to load tickets');
        setLoading(false);
      });
  }, [user_id, navigate, L]);

  const downloadPDF = (ticket) => {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    doc.addFileToVFS('Arial.ttf', arialBase64.trim());
    doc.addFont('Arial.ttf', 'Arial', 'normal');
    doc.setFont('Arial');

    doc.setFontSize(20);
    doc.text('🚌 BusTickets', 40, 60);
    doc.setFontSize(12);

    let y = 100;
    const lines = [
      `${L('route')}:       ${ticket.origin} → ${ticket.destination}`,
      `${L('date')}:         ${new Date(ticket.departure_time).toLocaleString()}`,
      `${L('operator')}:     ${ticket.operator}`,
      `${L('passenger')}:    ${ticket.passenger_name}`,
      `${L('phone')}:        ${ticket.passenger_phone}`,
      `Email:         ${ticket.passenger_email}`,
      `${L('price')}:        ${ticket.price} грн (Оплата при посадці)`,
      `${L('ticket_number')}: ${ticket.id}`,
    ];

    lines.forEach(line => {
      doc.text(line, 40, y);
      y += 20;
    });

    doc.save(`ticket_${ticket.id}.pdf`);
  };

  const handleCancel = (id) => {
    if (!window.confirm(L('Are you sure you want to cancel this ticket?') || 'Are you sure?')) return;
    cancelTicket(id)
      .then(() => {
        setTickets(prev => prev.filter(t => t.id !== id));
      })
      .catch(err => {
        console.error('Cancel error:', err);
        alert(L('Failed to cancel ticket') || 'Failed to cancel ticket');
      });
  };

  if (loading) return <Loader />;

  return (
    <PageContainer theme={{ mode: theme }}>
      <ToggleThemeButton theme={{ mode: theme }} onClick={toggle}>
        {theme === 'light' ? '🌙 Темна тема' : '☀️ Світла тема'}
      </ToggleThemeButton>

      <Title>{L('your_tickets')}</Title>

      {error && <EmptyMsg theme={{ mode: theme }}>{error}</EmptyMsg>}
      {!error && tickets.length === 0 && (
        <EmptyMsg theme={{ mode: theme }}>{L('No tickets purchased yet!')}</EmptyMsg>
      )}
      {tickets.length > 0 && (
        <TicketsGrid>
          {tickets.map(ticket => (
            <TicketCard key={ticket.id} theme={{ mode: theme }}>
              <TicketDetails theme={{ mode: theme }}>
                <h3>{ticket.origin} → {ticket.destination}</h3>
                <p>{new Date(ticket.departure_time).toLocaleString()}</p>
                <p>{ticket.operator}</p>
              </TicketDetails>

              <ActionsWrapper>
                <ActionButton className="download" onClick={() => downloadPDF(ticket)}>
                  {L('download')}
                </ActionButton>
                <ActionButton className="cancel" onClick={() => handleCancel(ticket.id)}>
                  {L('cancel')}
                </ActionButton>
              </ActionsWrapper>
            </TicketCard>
          ))}
        </TicketsGrid>
      )}
    </PageContainer>
  );
}
