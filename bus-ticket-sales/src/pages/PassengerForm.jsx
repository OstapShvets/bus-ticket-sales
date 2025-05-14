// src/pages/PassengerForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { bookTicket } from '../api';
import { useLang } from '../context/LangContext';
import Loader from '../components/Loader';

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(20px); }
  to   { opacity: 1; transform: translateX(0); }
`;

const PageWrapper = styled.div`
  padding: 3rem 2rem;
  min-height: 70vh;
  background: ${({ themeMode }) =>
    themeMode === 'light' ? '#ffffff' : '#18181b'};
  animation: ${slideIn} 0.6s ease-out;
  color: ${({ themeMode }) =>
    themeMode === 'light' ? '#333' : '#ddd'};
`;

const FormTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const FormContainer = styled.form`
  max-width: 700px;
  margin: 0 auto;
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const PassengerBlock = styled.fieldset`
  position: relative;
  border: 1px solid ${({ themeMode }) =>
    themeMode === 'light' ? '#ccc' : '#444'};
  border-radius: 6px;
  padding: 1.5rem 1rem 1rem;
  margin: 0;

  legend {
    position: absolute;
    top: -0.7em;
    left: 1rem;
    background: ${({ themeMode }) =>
      themeMode === 'light' ? '#ffffff' : '#18181b'};
    padding: 0 0.4rem;
    font-size: 0.9rem;
    font-weight: 600;
  }
`;

const ContactBlock = styled.div`
  grid-column: span 2;
  display: grid;
  gap: 1.5rem;

  @media (min-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Label = styled.label`
  display: block;
  margin-top: 0.75rem;
  font-weight: 500;
`;

const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 0.5rem 0.75rem;
  margin-top: 0.25rem;
  font-size: 1rem;
  border: 2px solid ${({ themeMode }) =>
    themeMode === 'light' ? '#ccc' : '#444'};
  border-radius: 4px;
  background: ${({ themeMode }) =>
    themeMode === 'light' ? '#fff' : '#242529'};
  color: ${({ themeMode }) =>
    themeMode === 'light' ? '#333' : '#eee'};
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #007bff;
  }
`;

const SubmitButton = styled.button`
  grid-column: span 2;
  padding: 0.75rem;
  background: #28a745;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  text-transform: uppercase;
  transition: background 0.2s;

  &:hover {
    background: #218838;
  }
`;

const Message = styled.div`
  grid-column: span 2;
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 4px;
  text-align: center;
  ${({ type }) =>
    type === 'error'
      ? `
      background: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
    `
      : `
      background: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
    `}
`;

export default function PassengerForm() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { L } = useLang();
  const themeMode =
    document.documentElement.getAttribute('data-theme') || 'light';

  const schedule_id = searchParams.get('schedule_id');
  const user_id = searchParams.get('user_id');
  const count = Math.min(
    3,
    Math.max(1, parseInt(searchParams.get('passengers'), 10) || 1)
  );

  const [names, setNames] = useState(() =>
    Array.from({ length: count }, () => '')
  );
  const [contact, setContact] = useState({ phone: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' });

  useEffect(() => {
    if (!user_id) {
      navigate('/login');
      return;
    }
    setNames(Array.from({ length: count }, () => ''));
  }, [count, user_id, navigate]);

  const handleNameChange = idx => e => {
    const v = e.target.value;
    setNames(ns => {
      const copy = [...ns];
      copy[idx] = v;
      return copy;
    });
  };

  const handleContactChange = e => {
    const { name, value } = e.target;
    setContact(c => ({ ...c, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg({ text: '', type: '' });

    // Перевіряємо, що всі імена заповнені
    for (let i = 0; i < names.length; i++) {
      if (!names[i]) {
        setMsg({
          text: L('Please fill out all passenger names'),
          type: 'error'
        });
        return;
      }
    }
    if (!contact.phone || !contact.email) {
      setMsg({
        text: L('Please fill out phone and email'),
        type: 'error'
      });
      return;
    }

    setLoading(true);
    try {
      const { data } = await bookTicket({
        user_id,
        schedule_id,
        passenger_names: names,
        passenger_phone: contact.phone,
        passenger_email: contact.email
      });
      // Переадресація на TicketPage з усіма ticket_ids через кому
      navigate(`/ticket/${data.ticket_ids.join(',')}`);
    } catch (err) {
      console.error('Booking error:', err);
      setMsg({
        text: L('Failed_to_book_ticket') || 'Failed to book ticket',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <PageWrapper themeMode={themeMode}>
      <FormTitle>{L('passenger_details')}</FormTitle>
      <FormContainer onSubmit={handleSubmit}>
        {names.map((n, idx) => (
          <PassengerBlock key={idx} themeMode={themeMode}>
            <legend>{`${L('passenger')} ${idx + 1}`}</legend>
            <Label htmlFor={`name-${idx}`}>{L('Full_Name')}</Label>
            <Input
              id={`name-${idx}`}
              themeMode={themeMode}
              type="text"
              value={n}
              onChange={handleNameChange(idx)}
              placeholder={L('Full_Name')}
              required
            />
          </PassengerBlock>
        ))}

        <ContactBlock>
          <Label htmlFor="contact_phone">{L('Phone')}</Label>
          <Input
            id="contact_phone"
            name="phone"
            themeMode={themeMode}
            type="tel"
            value={contact.phone}
            onChange={handleContactChange}
            placeholder={L('Phone')}
            required
          />

          <Label htmlFor="contact_email">{L('Email_Address')}</Label>
          <Input
            id="contact_email"
            name="email"
            themeMode={themeMode}
            type="email"
            value={contact.email}
            onChange={handleContactChange}
            placeholder={L('Email_Address')}
            required
          />
        </ContactBlock>

        <SubmitButton type="submit">{L('confirm')}</SubmitButton>

        {msg.text && <Message type={msg.type}>{msg.text}</Message>}
      </FormContainer>
    </PageWrapper>
  );
}
