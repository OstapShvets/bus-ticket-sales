import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { registerUser } from '../api';
import { useLang } from '../context/LangContext';
import { useTheme } from '../context/ThemeContext';
import Loader from '../components/Loader';

const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const PageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  background: ${({ $theme }) => ($theme === 'light' ? '#f0f2f5' : '#101214')};
  color: ${({ $theme }) => ($theme === 'light' ? '#1c1c1c' : '#f1f1f1')};
`;

const Card = styled.div`
  background: ${({ $theme }) => ($theme === 'light' ? '#ffffff' : '#1a1d20')};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 450px;
  animation: ${slideDown} 0.7s ease-out;
  border: 1px solid ${({ $theme }) => ($theme === 'light' ? '#dee2e6' : '#2c2f33')};
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Label = styled.label`
  font-weight: 600;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 2px solid ${({ $theme }) => ($theme === 'light' ? '#d0d7de' : '#3a3f44')};
  border-radius: 6px;
  background: ${({ $theme }) => ($theme === 'light' ? '#ffffff' : '#2b2f35')};
  color: ${({ $theme }) => ($theme === 'light' ? '#2c2c2c' : '#e6e6e6')};
  outline: none;
  font-size: 1rem;
  transition: border-color 0.3s;
  &:focus {
    border-color: #3d8bfd;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1rem;
  background: ${({ $theme }) => ($theme === 'light' ? '#3d8bfd' : '#1e88e5')};
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
  text-transform: uppercase;

  &:hover {
    background: ${({ $theme }) => ($theme === 'light' ? '#1e6fd1' : '#1565c0')};
  }
`;

const TextLink = styled.div`
  margin-top: 1rem;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 500;

  a {
    color: #3d8bfd;
    cursor: pointer;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Message = styled.div`
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  font-size: 0.95rem;
  ${({ type }) =>
    type === 'error'
      ? `
    background: #2e1212;
    color: #e74c3c;
    border: 1px solid #e74c3c;
  `
      : `
    background: #103e26;
    color: #27ae60;
    border: 1px solid #27ae60;
  `}
  text-align: center;
`;

export default function RegisterPage() {
  const { theme } = useTheme();
  const { L } = useLang();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

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

  if (loading) return <Loader />;

  return (
    <PageWrapper $theme={theme}>
      <Card $theme={theme}>
        <Title>{L('register')}</Title>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="name">{L('Full Name')}</Label>
          <Input
            $theme={theme}
            id="name"
            name="name"
            type="text"
            placeholder={L('Enter your full name')}
            value={form.name}
            onChange={handleChange}
            required
          />

          <Label htmlFor="email">{L('Email')}</Label>
          <Input
            $theme={theme}
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
            $theme={theme}
            id="password"
            name="password"
            type="password"
            placeholder={L('Enter a secure password')}
            value={form.password}
            onChange={handleChange}
            required
          />

          <Button $theme={theme} type="submit">{L('register')}</Button>
        </Form>

        {message.text && <Message type={message.type}>{message.text}</Message>}

        <TextLink>
          {L('Already have an account?')} <a onClick={() => navigate('/login')}>{L('login')}</a>
        </TextLink>
      </Card>
    </PageWrapper>
  );
}
