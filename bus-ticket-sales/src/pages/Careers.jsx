import React from 'react';

export default function Careers() {
  return (
    <div className="pt-28 px-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Careers — Кар’єра в BusTickets</h1>
      <p className="mb-4 text-gray-800">
        Приєднуйтесь до нашої дружньої команди! Ми шукаємо талановитих фахівців у таких напрямках:
      </p>
      <ul className="list-disc ml-6 text-gray-700 space-y-2">
        <li>Frontend Developer (React, TypeScript)</li>
        <li>Backend Developer (Node.js, MySQL)</li>
        <li>DevOps Engineer</li>
        <li>UI/UX Designer</li>
      </ul>
      <p className="mt-6 text-gray-800">
        Надсилайте резюме на <a href="mailto:hr@bustickets.ua" className="text-blue-600">hr@bustickets.ua</a>.
      </p>
    </div>
);
}
