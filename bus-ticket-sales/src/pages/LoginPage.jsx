// src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { loginUser } from '../api';
import { useLang } from '../context/LangContext';
import Loader from '../components/Loader';

/**
 * Fade-in animation for form card
 */
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/**
 * Page wrapper
 */
const PageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  background: ${({ themeMode }) => (themeMode === 'light' ? '#f5f5f5' : '#1a1a1a')};
  color: ${({ themeMode }) => (themeMode === 'light' ? '#333' : '#eee')};
`;

/**
 * Card container for login form
 */
const Card = styled.div`
  background: ${({ themeMode }) => (themeMode === 'light' ? '#ffffff' : '#242529')};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
  animation: ${fadeIn} 0.7s ease-out;
`;

/**
 * Title styling
 */
const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
`;

/**
 * Form & input styling
 */
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const Label = styled.label`
  font-weight: 500;
`;
const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 2px solid ${({ themeMode }) => (themeMode === 'light' ? '#ccc' : '#444')};
  border-radius: 4px;
  background: ${({ themeMode }) => (themeMode === 'light' ? '#fff' : '#1e1e1e')};
  color: ${({ themeMode }) => (themeMode === 'light' ? '#333' : '#eee')};
  outline: none;
  &:focus {
    border-color: #007bff;
  }
`;

/**
 * Button styling
 */
const Button = styled.button`
  padding: 0.75rem 1rem;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s;
  text-transform: uppercase;

  &:hover {
    background: #0056b3;
  }
`;

/**
 * Link for navigation
 */
const TextLink = styled.span`
  margin-top: 1rem;
  font-size: 0.9rem;
  text-align: center;
  a {
    color: #007bff;
    text-decoration: none;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

/**
 * Error/Success message styling
 */
const Message = styled.div`
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  color: ${({ type }) => (type === 'error' ? '#721c24' : '#155724')};
  background: ${({ type }) => (type === 'error' ? '#f8d7da' : '#d4edda')};
  border: 1px solid ${({ type }) => (type === 'error' ? '#f5c6cb' : '#c3e6cb')};
  text-align: center;
`;

/**
 * LoginPage component
 */
export default function LoginPage() {
  const themeMode = document.documentElement.getAttribute('data-theme') || 'light';
  const { L } = useLang();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' });

  /**
   * Handle input change
   */
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  /**
   * Submit login
   */
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMsg({ text: '', type: '' });

    try {
      const response = await loginUser(form.email, form.password);
      // On successful login, store user_id & redirect
      localStorage.setItem('user_id', response.data.id);
      navigate('/account');
    } catch (error) {
      console.error('Login error:', error);
      setMsg({ text: L('Invalid credentials') || 'Invalid credentials', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <PageWrapper themeMode={themeMode}>
      <Card themeMode={themeMode}>
        <Title>{L('login')}</Title>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="email">{L('Email')}</Label>
          <Input
            themeMode={themeMode}
            id="email"
            name="email"
            type="email"
            placeholder={L('Enter email')}
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
            placeholder={L('Enter password')}
            value={form.password}
            onChange={handleChange}
            required
          />

          <Button type="submit">{L('login')}</Button>
        </Form>

        {msg.text && <Message type={msg.type}>{msg.text}</Message>}

        <TextLink>
          {L('No account?')} <a onClick={() => navigate('/register')}>{L('register')}</a>
        </TextLink>
      </Card>
    </PageWrapper>
  );
}
