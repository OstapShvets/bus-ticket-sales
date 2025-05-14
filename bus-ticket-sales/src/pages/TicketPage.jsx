// src/pages/TicketPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import { jsPDF } from 'jspdf';
import 'jspdf-autotable';              // якщо знадобиться табличка
import { registerJsPdfFont } from '../utils/jsPdfFonts';

import { getTicket } from '../api';
import { useLang } from '../context/LangContext';
import Loader from '../components/Loader';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const PageWrapper  = styled.div`
  /* ваші стилі */
  animation: ${fadeIn} 0.5s ease-out;
`;

const Title        = styled.h2`
  /* стиль для заголовка */
`;

const TicketsGrid  = styled.div`
  display: grid;
  gap: 1rem;
`;

const TicketCard   = styled.div`
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: ${({ themeMode }) => (themeMode === 'dark' ? '#333' : '#fff')};
  color: ${({ themeMode }) => (themeMode === 'dark' ? '#fff' : '#333')};
`;

const CardActions  = styled.div`
  margin-top: 10px;
`;

const ActionButton = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const BackButton   = styled.button`
  background-color: #f44336;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #e53935;
  }
`;

export default function TicketPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const { L } = useLang();
  const themeMode = document.documentElement.getAttribute('data-theme') || 'light';

  const ids = id.includes(',') ? id.split(',') : [id];
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all(ids.map(tid => getTicket(tid).then(r => r.data)))
      .then(data => { setTickets(data); setLoading(false); })
      .catch(() => {
        setError(L('ticket_not_found') || 'Квиток не знайдено');
        setLoading(false);
      });
  }, [id, L]);

  const handleDownload = ticket => {
    // реєструємо шрифт
    registerJsPdfFont(jsPDF);

    const doc = new jsPDF({
      unit: 'pt',
      format: 'a4'
    });
    doc.setFont('Arial'); // Встановлюємо шрифт Arial
    doc.setFontSize(18);
    doc.text('🚌  BusTickets', 40, 60);

    doc.setFontSize(12);
    let y = 100;
    const lineHeight = 18;
    const lines = [
      `Маршрут:     ${ticket.origin} → ${ticket.destination}`,
      `Дата:        ${new Date(ticket.departure_time).toLocaleString()}`,
      `Перевізник:  ${ticket.operator}`,
      `${L('passenger')}: ${ticket.passenger_name}`,
      `Телефон:     ${ticket.passenger_phone}`,
      `Email:       ${ticket.passenger_email}`,
      `Ціна:        ${ticket.price} UAH`,
      `Квиток №${ticket.id}`
    ];
    lines.forEach(line => {
      doc.text(line, 40, y);
      y += lineHeight;
    });

    doc.save(`ticket_${ticket.id}.pdf`);
  };

  if (loading) return <Loader />;
  if (error) {
    return (
      <PageWrapper themeMode={themeMode}>
        <Title>{L('Error')}</Title>
        <p style={{ color:'#c0392b', textAlign:'center' }}>{error}</p>
        <BackButton onClick={() => nav(-1)}>◀️ {L('back')}</BackButton>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper themeMode={themeMode}>
      <Title>{L('ticket_info')}</Title>
      <TicketsGrid>
        {tickets.map(t => (
          <TicketCard key={t.id} themeMode={themeMode}>
            <div>
              <p><strong>{t.origin} → {t.destination}</strong></p>
              <p>{new Date(t.departure_time).toLocaleString()}</p>
              <p>{t.operator}</p>
              <p><strong>{L('passenger')}:</strong> {t.passenger_name}</p>
            </div>
            <CardActions>
              <ActionButton onClick={() => handleDownload(t)}>
                📄 {L('download')}
              </ActionButton>
            </CardActions>
          </TicketCard>
        ))}
      </TicketsGrid>
      <BackButton onClick={() => nav('/account')}>◀️ {L('account')}</BackButton>
    </PageWrapper>
  );
}
