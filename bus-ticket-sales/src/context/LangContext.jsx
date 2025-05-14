// src/context/LangContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';

// Translation dictionary
const translations = {
  ua: {
    home: 'Головна',
    search: 'Пошук',
    account: 'Кабінет',
    login: 'Вхід',
    register: 'Реєстрація',
    features: 'Наші переваги',
    partners: 'Наші партнери',
    testimonials: 'Відгуки клієнтів',
    support: 'Підтримка',
    seats_left: 'місць',
    book_now: 'Забронювати',
    passenger_details: 'Деталі пасажира',
    confirm: 'Підтвердити',
    available_routes: 'Доступні рейси',
    Failed_to_load_routes: 'Не вдалося завантажити рейси',
    no_routes_found_for_your_search: 'Рейсів не знайдено',
    Failed_to_book_ticket: 'Не вдалося забронювати квиток',
    Your_tickets: 'Мої квитки',
    Failed_to_load_tickets: 'Не вдалося завантажити квитки',
    No_tickets_purchased_yet: 'Ще немає квитків',
    download: 'Завантажити',
    cancel: 'Скасувати',
    ticket_info: 'Інформація про квиток',
    back: 'Назад',
    ticket_not_found: 'Квиток не знайдено',
    Email: 'Email',
    Password: 'Пароль',
    Invalid_credentials: 'Невірні дані',
    Full_Name: 'ПІБ',
    Email_Address: 'Email',
    Enter_email: 'Введіть email',
    Enter_password: 'Введіть пароль',
    No_account: 'Немає акаунту?',
    registration_success: 'Реєстрація успішна! Переадресація...',
    Registration_failed: 'Реєстрація не вдалася. Спробуйте ще.',
    Already_have_an_account: 'Вже є акаунт?',
    passenger: 'Пасажир',
    operator: 'Перевізник',
    Route: 'Маршрут',
    Price: 'Ціна',
    Departure: 'Відправлення',
    Phone: 'Телефон',
    popular_routes: 'Популярні маршрути',
    loading: 'Завантаження...',
  },
  en: {
    home: 'Home',
    search: 'Search',
    account: 'Account',
    login: 'Login',
    register: 'Register',
    features: 'Our Features',
    partners: 'Our Partners',
    testimonials: 'Testimonials',
    support: 'Support',
    seats_left: 'seats left',
    book_now: 'Book Now',
    passenger_details: 'Passenger Details',
    confirm: 'Confirm',
    available_routes: 'Available Routes',
    Failed_to_load_routes: 'Failed to load routes',
    no_routes_found_for_your_search: 'No routes found',
    Failed_to_book_ticket: 'Failed to book ticket',
    Your_tickets: 'Your Tickets',
    Failed_to_load_tickets: 'Failed to load tickets',
    No_tickets_purchased_yet: 'No tickets purchased yet!',
    download: 'Download',
    cancel: 'Cancel',
    ticket_info: 'Ticket Information',
    back: 'Back',
    ticket_not_found: 'Ticket not found',
    Email: 'Email',
    Password: 'Password',
    Invalid_credentials: 'Invalid credentials',
    Full_Name: 'Full Name',
    Email_Address: 'Email Address',
    Enter_email: 'Enter email address',
    Enter_password: 'Enter password',
    No_account: 'No account?',
    registration_success: 'Registration successful! Redirecting...',
    Registration_failed: 'Registration failed. Try again.',
    Already_have_an_account: 'Already have an account?',
    passenger: 'Passenger',
    operator: 'Operator',
    Route: 'Route',
    Price: 'Price',
    Departure: 'Departure',
    Phone: 'Phone',
    popular_routes: 'Popular Routes',
    loading: 'Loading...',
  }
};

const LangContext = createContext();

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState(
    () => localStorage.getItem('lang') || 'ua'
  );

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  const toggle = () => setLang(prev => (prev === 'ua' ? 'en' : 'ua'));

  const L = key => translations[lang][key] || key;

  return (
    <LangContext.Provider value={{ lang, toggle, L }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => useContext(LangContext);
