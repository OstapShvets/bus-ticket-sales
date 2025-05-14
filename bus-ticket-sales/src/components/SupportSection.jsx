import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useLang } from '../context/LangContext';
import { useTheme } from '../context/ThemeContext';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const Section = styled.section`
  background: ${({ $theme }) => ($theme === 'light' ? '#f0f2f5' : '#101214')};
  color: ${({ $theme }) => ($theme === 'light' ? '#1c1c1c' : '#f1f1f1')};
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 0.8s ease-out;
`;

const Heading = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
`;

const Subtitle = styled.p`
  text-align: center;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 400;
`;

const ContactInfo = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1rem;
  color: ${({ $theme }) => ($theme === 'light' ? '#555' : '#ccc')};

  span {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
`;

const MessageInfo = styled.p`
  font-size: 1rem;
  text-align: center;
  margin-bottom: 2rem;
  max-width: 600px;
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
  padding: 0.75rem 1rem;
  border: 2px solid ${({ $theme }) => ($theme === 'light' ? '#d0d7de' : '#3a3f44')};
  border-radius: 6px;
  background: ${({ $theme }) => ($theme === 'light' ? '#ffffff' : '#2b2f35')};
  color: ${({ $theme }) => ($theme === 'light' ? '#2c2c2c' : '#e6e6e6')};
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #3d8bfd;
  }
`;

const Textarea = styled.textarea`
  padding: 0.75rem 1rem;
  border: 2px solid ${({ $theme }) => ($theme === 'light' ? '#d0d7de' : '#3a3f44')};
  border-radius: 6px;
  background: ${({ $theme }) => ($theme === 'light' ? '#ffffff' : '#2b2f35')};
  color: ${({ $theme }) => ($theme === 'light' ? '#2c2c2c' : '#e6e6e6')};
  font-size: 1rem;
  outline: none;
  resize: vertical;
  min-height: 120px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #3d8bfd;
  }
`;

const Button = styled.button`
  padding: 0.75rem;
  background: linear-gradient(to right, #007bff, #0056b3);
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: linear-gradient(to right, #0056b3, #004190);
  }
`;

const SuccessMessage = styled.div`
  margin-bottom: 1rem;
  padding: 1rem;
  background: #103e26;
  color: #27ae60;
  border: 1px solid #27ae60;
  border-radius: 6px;
  text-align: center;
  font-weight: 500;
  max-width: 600px;
  width: 100%;
`;

export default function SupportSection() {
  const { L } = useLang();
  const { theme } = useTheme();

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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    }).then(() => {
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    }).catch(err => console.error(err));
  };

  return (
    <Section $theme={theme}>
      <Heading>{L('Support')}</Heading>
      <Subtitle>{L('If you have questions, call')}:</Subtitle>

      <ContactInfo $theme={theme}>
        <span>📞 +38 (050) 212-24-76</span>
      </ContactInfo>

      <MessageInfo>{L('You can also send us a message and we will get back to you.')}</MessageInfo>

      {submitted && <SuccessMessage>{L('Your message was successfully sent!')}</SuccessMessage>}

      <ContactForm onSubmit={handleSubmit}>
        <Input
          $theme={theme}
          name="name"
          placeholder={L('Name')}
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          $theme={theme}
          name="email"
          type="email"
          placeholder={L('Email')}
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Textarea
          $theme={theme}
          name="message"
          placeholder={L('Message')}
          value={formData.message}
          onChange={handleChange}
          required
        />
        <Button type="submit">📩 {L('Send')}</Button>
      </ContactForm>
    </Section>
  );
}
