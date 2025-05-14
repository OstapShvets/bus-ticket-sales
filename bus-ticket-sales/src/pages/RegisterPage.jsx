// src/pages/RegisterPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { registerUser } from '../api';
import { useLang } from '../context/LangContext';
import Loader from '../components/Loader';

/**
 * Slide-down animation for form card
 */
const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/**
 * Full-page wrapper centering content
 */
const PageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  background: ${({ themeMode }) => (themeMode === 'light' ? '#f0f2f5' : '#16161a')};
  color: ${({ themeMode }) => (themeMode === 'light' ? '#333' : '#eee')};
`;

/**
 * Card container with animation and shadow
 */
const Card = styled.div`
  background: ${({ themeMode }) => (themeMode === 'light' ? '#ffffff' : '#242529')};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 450px;
  animation: ${slideDown} 0.6s ease-out;
`;

/**
 * Title of the registration form
 */
const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.875rem;
`;

/**
 * Form styling: vertical layout with gap
 */
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

/**
 * Label styling
 */
const Label = styled.label`
  font-weight: 500;
`;

/**
 * Shared input styles for text, email, password
 */
const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 2px solid ${({ themeMode }) => (themeMode === 'light' ? '#ccc' : '#444')};
  border-radius: 4px;
  background: ${({ themeMode }) => (themeMode === 'light' ? '#fff' : '#1e1e22')};
  color: ${({ themeMode }) => (themeMode === 'light' ? '#333' : '#eee')};
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
  }
`;

/**
 * Submit button styling with hover effect
 */
const Button = styled.button`
  padding: 0.75rem 1rem;
  background: #28a745;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
  text-transform: uppercase;

  &:hover {
    background: #218838;
  }
`;

/**
 * Text link for navigation to login
 */
const TextLink = styled.div`
  margin-top: 1rem;
  text-align: center;
  font-size: 0.9rem;

  a {
    color: #007bff;
    cursor: pointer;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;

/**
 * Message box for error/success
 */
const Message = styled.div`
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  font-size: 0.95rem;
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
  text-align: center;
`;

/**
 * RegisterPage component handles user registration:
 * - form state for name, email, password
 * - calls API registerUser
 * - displays loader, error/success messages
 * - on success, redirects to login after delay
 */
export default function RegisterPage() {
  const themeMode = document.documentElement.getAttribute('data-theme') || 'light';
  const { L } = useLang();
  const navigate = useNavigate();

  // Form state
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  /**
   * Update form fields on change
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      await registerUser(form.name, form.email, form.password);
      setMessage({ text: L('Registration successful! Redirecting to login...'), type: 'success' });
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      console.error('Registration error:', err);
      const errMsg = err.response?.data?.error || L('Registration failed. Try again.');
      setMessage({ text: errMsg, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Show loader overlay during request
  if (loading) return <Loader />;

  return (
    <PageWrapper themeMode={themeMode}>
      <Card themeMode={themeMode}>
        <Title>{L('register')}</Title>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="name">{L('Full Name')}</Label>
          <Input
            themeMode={themeMode}
            id="name"
            name="name"
            type="text"
            placeholder={L('Enter your full name')}
            value={form.name}
            onChange={handleChange}
            required
          />

          <Label htmlFor="email">{L('Email Address')}</Label>
          <Input
            themeMode={themeMode}
            id="email"
            name="email"
            type="email"
            placeholder={L('Enter your email')}
            value={form.email}
            onChange={handleChange}
            required
          />

          <Label htmlFor="password">{L('Password')}</Label>
          <Input
            themeMode={themeMode}
            id="password"
            name="password"
            type="password"
            placeholder={L('Enter a secure password')}
            value={form.password}
            onChange={handleChange}
            required
          />

          <Button type="submit">{L('register')}</Button>
        </Form>

        {/* Display error or success message */}
        {message.text && <Message type={message.type}>{message.text}</Message>}

        <TextLink>
          {L('Already have an account?')}{' '}
          <a onClick={() => navigate('/login')}>{L('login')}</a>
        </TextLink>
      </Card>
    </PageWrapper>
  );
}
