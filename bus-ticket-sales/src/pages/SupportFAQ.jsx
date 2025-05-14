import React from 'react';

export default function SupportFAQ() {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-12 md:p-20">
        <header className="mb-10 text-center">
          <h1 className="text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
            FAQ
          </h1>
          <p className="mt-4 text-2xl text-gray-600 dark:text-gray-300">
            Часті запитання
          </p>
          <div className="mt-6 h-1 w-24 mx-auto bg-blue-500 rounded-full"></div>
        </header>

        <ol className="list-decimal list-inside space-y-12 prose prose-lg dark:prose-dark max-w-none">
          <li>
            <h2 className="font-semibold text-2xl text-gray-900 dark:text-white">
              Як забронювати квиток?
            </h2>
            <p className="mt-2 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              На головній сторінці введіть «Звідки», «Куди», дату і кількість пасажирів → натисніть «Пошук» → оберіть рейс → введіть дані пасажирів → «Підтвердити».
            </p>
          </li>
          <li>
            <h2 className="font-semibold text-2xl text-gray-900 dark:text-white">
              Як завантажити PDF-квиток?
            </h2>
            <p className="mt-2 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              Після бронювання перейдіть до «Кабінет» → знайдіть потрібний квиток → натисніть «Завантажити PDF».
            </p>
          </li>
          <li>
            <h2 className="font-semibold text-2xl text-gray-900 dark:text-white">
              Як скасувати квиток?
            </h2>
            <p className="mt-2 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              В особистому кабінеті поруч із квитком натисніть «Скасувати квиток» і підтвердіть.
            </p>
          </li>
          <li>
            <h2 className="font-semibold text-2xl text-gray-900 dark:text-white">
              Чи потрібно реєструватися для пошуку рейсу?
            </h2>
            <p className="mt-2 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              Ні, пошук рейсів та перегляд спецпропозицій доступні без авторизації.
            </p>
          </li>
        </ol>
      </div>
    </section>
  );
}
