// src/components/SupportSection.jsx

import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useLang } from '../context/LangContext';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const Section = styled.section`
  background: ${({ themeMode }) => (themeMode === 'light' ? '#f0f4f8' : '#181a1f')};
  color: ${({ themeMode }) => (themeMode === 'light' ? '#333' : '#eee')};
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 0.8s ease-out;
`;

const Heading = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  position: relative;
  padding-bottom: 0.5rem;
  &::after {
    content: '';
    width: 60px;
    height: 4px;
    background: #007bff;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const Subtitle = styled.p`
  text-align: center;
  margin-bottom: 1rem;
  font-size: 1rem;
`;

const ContactInfo = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1rem;
  color: ${({ themeMode }) => (themeMode === 'light' ? '#555' : '#ccc')};

  span, a {
    display: block;
    margin-bottom: 0.5rem;
    color: inherit;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ContactForm = styled.form`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid ${({ themeMode }) => (themeMode === 'light' ? '#ddd' : '#444')};
  border-radius: 4px;
  background: ${({ themeMode }) => (themeMode === 'light' ? '#fff' : '#222')};
  color: ${({ themeMode }) => (themeMode === 'light' ? '#333' : '#ddd')};
  outline: none;

  &:focus {
    border-color: #007bff;
  }
`;

const Textarea = styled.textarea`
  ${Input};
  resize: vertical;
  min-height: 120px;
`;

const Button = styled.button`
  padding: 0.75rem;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

const SuccessMessage = styled.div`
  padding: 1rem;
  background: #d4edda;
  color: #155724;
  border-radius: 4px;
  text-align: center;
`;

export default function SupportSection() {
  const { L } = useLang();
  const themeMode = document.documentElement.getAttribute('data-theme') || 'light';

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/support', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formData),
    }).then(() => {
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    }).catch(err => console.error(err));
  };

  return (
    <Section themeMode={themeMode}>
      <Heading>{L('Підтримка')}</Heading>
      <Subtitle>{L('Якщо у вас є питання, пишіть або телефонуйте:')}</Subtitle>

      <ContactInfo>
        <span>📞 +38 (050) 212-24-76</span>
        <a href="mailto:support@bustickets.ua">✉️ support@bustickets.ua</a>
      </ContactInfo>

      {submitted && <SuccessMessage>{L('Ваше повідомлення успішно надіслано!')}</SuccessMessage>}

      <ContactForm onSubmit={handleSubmit}>
        <Input themeMode={themeMode} name="name" placeholder={L('Ім’я')} value={formData.name} onChange={handleChange} required />
        <Input themeMode={themeMode} name="email" type="email" placeholder={L('Email')} value={formData.email} onChange={handleChange} required />
        <Textarea themeMode={themeMode} name="message" placeholder={L('Повідомлення')} value={formData.message} onChange={handleChange} required />
        <Button type="submit">{L('Надіслати')}</Button>
      </ContactForm>
    </Section>
  );
}