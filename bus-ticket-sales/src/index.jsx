import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { LangProvider } from './context/LangContext';

// Знаходимо наш контейнер
const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element not found');
}

// Ініціалізуємо React у цьому контейнері
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <LangProvider>
        <App />
      </LangProvider>
    </ThemeProvider>
  </React.StrictMode>
);
