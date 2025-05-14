import React from 'react';

export default function Privacy() {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-b from-gray-100 to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-12 md:p-20">
        <header className="mb-10 text-center">
          <h1 className="text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
            Privacy Policy
          </h1>
          <div className="mt-4 h-1 w-24 mx-auto bg-blue-500 rounded-full"></div>
          <p className="mt-6 text-2xl text-gray-600 dark:text-gray-300">
            Політика конфіденційності
          </p>
        </header>

        <div className="prose prose-xl dark:prose-dark max-w-none space-y-8">
          <p className="text-lg">
            Ми поважаємо вашу приватність і робимо все можливе для захисту ваших даних:
          </p>
          <ul className="list-disc ml-10 space-y-4">
            <li className="leading-relaxed pl-4 border-l-4 border-blue-500">
              Збираємо лише необхідну інформацію для бронювання та покращення сервісу.
            </li>
            <li className="leading-relaxed pl-4 border-l-4 border-blue-500">
              Не передаємо ваші дані третім особам без вашої явної згоди.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}