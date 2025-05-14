import React from 'react';

export default function SupportContact() {
  return (
    <div className="pt-28 px-6 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Contact Us — Зв’язок із підтримкою</h1>
      <p className="mb-4 text-gray-800">
        Якщо у вас виникли питання, будь ласка, звертайтеся:
      </p>
      <ul className="list-disc ml-6 space-y-2 text-gray-700">
        <li>Email: <a href="mailto:support@bustickets.ua" className="text-blue-600">support@bustickets.ua</a></li>
        <li>Телефон: <a href="tel:+380441234567" className="text-blue-600">+38 044 123 4567</a></li>
        <li>Графік роботи: Пн–Пт 09:00–18:00</li>
      </ul>
      <p className="mt-6 text-gray-600">
        Або заповніть форму зворотного зв’язку на сайті.
      </p>
    </div>
);
}
