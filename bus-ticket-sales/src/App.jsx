// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Шапка та футер
import Navbar from './components/Navbar';
import AnimatedFooter from './components/AnimatedFooter';

// Основні сторінки
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import PassengerForm from './pages/PassengerForm';
import AccountPage from './pages/AccountPage';
import TicketPage from './pages/TicketPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Статичні сторінки
import About from './pages/About';
import Careers from './pages/Careers';
import Blog from './pages/Blog';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

// Підтримка
import SupportSection from './components/SupportSection';
import SupportContact from './pages/SupportContact';
import SupportFAQ from './pages/SupportFAQ';

export default function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Головна */}
        <Route path="/" element={<HomePage />} />

        {/* Пошук та бронювання */}
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/passengers" element={<PassengerForm />} />

        {/* Особистий кабінет */}
        <Route path="/account" element={<AccountPage />} />
        <Route path="/ticket/:id" element={<TicketPage />} />

        {/* Авторизація */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Статичні інфо-сторінки */}
        <Route path="/about" element={<About />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />

        {/* Підтримка */}
        <Route path="/support" element={<SupportSection />} />
        <Route path="/contact" element={<SupportContact />} />
        <Route path="/faq" element={<SupportFAQ />} />

        {/* Якщо нічого не знайдено — редірект на головну */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <AnimatedFooter />
    </Router>
  );
}
