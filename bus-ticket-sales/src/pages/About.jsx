import React from 'react';

export default function About() {
  return (
    <div className="pt-28 px-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">About Us — Про нас</h1>
      <p className="mb-4 text-gray-800">
        BusTickets — це інноваційний сервіс з продажу автобусних квитків по всій Україні. Наша місія — зробити подорожі швидкими, зручними та доступними для кожного.
      </p>
      <p className="mb-4 text-gray-800">
        Ми об’єднали найкращі автобусні перевезення, щоб ви могли порівняти ціни, обрати комфортні рейси та придбати квитки онлайн за лічені хвилини.
      </p>
      <ul className="list-disc ml-6 text-gray-700">
        <li>Понад 1000 напрямків</li>
        <li>Легке бронювання за 3 кліки</li>
        <li>Миттєва генерація PDF-квитка</li>
      </ul>
    </div>
);
}
