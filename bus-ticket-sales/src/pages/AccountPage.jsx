// src/pages/AccountPage.jsx

import React, { useState, useEffect } from 'react';
import { getTickets, cancelTicket } from '../api';
import styled, { keyframes } from 'styled-components';
import { useLang } from '../context/LangContext';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';

/**
 * Fade-in animation for tickets list
 */
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/**
 * Container wrapping the page
 */
const PageContainer = styled.div`
  padding: 3rem 2rem;
  min-height: 75vh;
  background: ${({ themeMode }) => (themeMode === 'light' ? '#f8f9fa' : '#18181b')};
  animation: ${fadeIn} 0.6s ease-out;
  color: ${({ themeMode }) => (themeMode === 'light' ? '#333' : '#ddd')};
`;

/**
 * Page title styling
 */
const Title = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
`;

/**
 * Grid for tickets
 */
const TicketsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px,1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
`;

/**
 * Individual ticket card
 */
const TicketCard = styled.div`
  background: ${({ themeMode }) => (themeMode === 'light' ? '#ffffff' : '#1e1e22')};
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s, box-shadow 0.3s;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  }
`;

/**
 * Ticket details block
 */
const TicketDetails = styled.div`
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

/**
 * Button container for actions
 */
const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
`;

/**
 * Styled button for actions
 */
const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-transform: uppercase;
  transition: background 0.3s, transform 0.2s;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  &:hover {
    transform: scale(1.05);
  }

  &.download {
    background: #28a745;
    color: #fff;
  }
  &.download:hover {
    background: #218838;
  }

  &.cancel {
    background: #dc3545;
    color: #fff;
  }
  &.cancel:hover {
    background: #c82333;
  }
`;

/**
 * No tickets message
 */
const EmptyMsg = styled.p`
  text-align: center;
  font-style: italic;
  color: ${({ themeMode }) => (themeMode === 'light' ? '#777' : '#999')};
`;

/**
 * AccountPage component:
 * - fetches and displays user tickets
 * - allows PDF download and cancellation
 */
export default function AccountPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { L } = useLang();
  const navigate = useNavigate();
  const themeMode = document.documentElement.getAttribute('data-theme') || 'light';
  const user_id = localStorage.getItem('user_id');

  // Fetch tickets on mount
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

  // PDF download handler
  const downloadPDF = (ticket) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('🚌 BusTickets', 20, 20);
    doc.setFontSize(12);
    doc.text(`Маршрут: ${ticket.origin} → ${ticket.destination}`, 20, 40);
    doc.text(`Дата: ${new Date(ticket.departure_time).toLocaleString()}`, 20, 50);
    doc.text(`Перевізник: ${ticket.operator}`, 20, 60);
    doc.text(`Пасажир: ${ticket.passenger_name}`, 20, 70);
    doc.text(`Телефон: ${ticket.passenger_phone}`, 20, 80);
    doc.text(`Email: ${ticket.passenger_email}`, 20, 90);
    doc.text(`Квиток №${ticket.id}`, 20, 100);
    doc.save(`ticket_${ticket.id}.pdf`);
  };

  // Cancel ticket handler
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
    <PageContainer themeMode={themeMode}>
      <Title>{L('Your Tickets')}</Title>
      {error && <EmptyMsg themeMode={themeMode}>{error}</EmptyMsg>}
      {!error && tickets.length === 0 && (
        <EmptyMsg themeMode={themeMode}>{L('No tickets purchased yet!')}</EmptyMsg>
      )}
      {tickets.length > 0 && (
        <TicketsGrid>
          {tickets.map(ticket => (
            <TicketCard key={ticket.id} themeMode={themeMode}>
              <TicketDetails themeMode={themeMode}>
                <h3>{ticket.origin} → {ticket.destination}</h3>
                <p>{new Date(ticket.departure_time).toLocaleString()}</p>
                <p>{ticket.operator}</p>
              </TicketDetails>
              <Actions>
                <ActionButton className="download" onClick={() => downloadPDF(ticket)}>
                  📄 {L('download')}
                </ActionButton>
                <ActionButton className="cancel" onClick={() => handleCancel(ticket.id)}>
                  ❌ {L('cancel')}
                </ActionButton>
              </Actions>
            </TicketCard>
          ))}
        </TicketsGrid>
      )}
    </PageContainer>
  );
}
