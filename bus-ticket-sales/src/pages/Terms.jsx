import React from 'react';

export default function Terms() {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-b from-gray-100 to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-12 md:p-20">
        <header className="mb-12 text-center">
          <h1 className="text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
            Terms of Service
          </h1>
          <div className="mt-4 h-1 w-24 mx-auto bg-blue-500 rounded-full"></div>
          <p className="mt-6 text-2xl text-gray-600 dark:text-gray-300">
            Умови обслуговування
          </p>
        </header>

        <div className="prose prose-xl dark:prose-dark max-w-none space-y-8">
          <p className="text-lg">
            Використовуючи наш сервіс, ви підтверджуєте, що ознайомлені та погоджуєтесь з наведеними нижче умовами:
          </p>
          <ol className="list-decimal ml-10 space-y-6">
            <li className="leading-relaxed pl-4 border-l-4 border-blue-500">
              Квитки не підлягають поверненню після відправлення автобуса.
            </li>
            <li className="leading-relaxed pl-4 border-l-4 border-blue-500">
              Ми не несемо відповідальності за затримки, спричинені форс-мажорами.
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
