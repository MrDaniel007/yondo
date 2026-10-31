import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'Как оформить заказ?',
    answer: 'Выберите нужные товары в каталоге, добавьте их в корзину и перейдите к оформлению. Заполните контактные данные и выберите удобный способ оплаты.',
  },
  {
    question: 'Какие варианты доставки доступны?',
    answer: 'Мы доставляем курьером по Бишкеку в день заказа. По другим регионам доставка осуществляется почтовыми и курьерскими службами в течение 2-4 дней.',
  },
  {
    question: 'Как работает гарантия и возврат?',
    answer: 'Вы можете вернуть товар в течение 14 дней с момента получения, если сохранен его товарный вид и упаковка. На все товары действует официальная гарантия.',
  },
  {
    question: 'Какие способы оплаты вы принимаете?',
    answer: 'Мы принимаем оплату наличными при получении, банковскими картами, а также через электронные кошельки и QR-код.',
  },
];

export const Help: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Заголовок страницы */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-amber-400 mb-3">
          Центр поддержки YONDO
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base">
          Ответы на популярные вопросы и связь со службой заботы о клиентах
        </p>
      </div>

      {/* Блок FAQ */}
      <div className="space-y-4 mb-12">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">
          Часто задаваемые вопросы
        </h2>

        {faqData.map((item, index) => (
          <div
            key={index}
            className="border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900/60 overflow-hidden transition-colors"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 text-left flex justify-between items-center font-semibold text-zinc-900 dark:text-zinc-100 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
            >
              <span>{item.question}</span>
              <span className="text-xl font-bold ml-4">
                {openIndex === index ? '−' : '+'}
              </span>
            </button>

            {openIndex === index && (
              <div className="px-6 pb-4 text-sm text-zinc-600 dark:text-zinc-400 border-t border-zinc-100 dark:border-zinc-800/50 pt-3 leading-relaxed">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Карточка контактов */}
      <div className="p-6 md:p-8 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-amber-500/20 text-center">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
          Остались вопросы?
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
          Наша команда поддержки готова помочь вам в любое время суток
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="mailto:info@yondo.kg"
            className="px-5 py-2.5 rounded-xl bg-zinc-900 text-white dark:bg-amber-400 dark:text-zinc-950 font-bold text-sm hover:opacity-90 transition-opacity"
          >
            Написать на Email
          </a>
          <a
            href="tel:+996555123456"
            className="px-5 py-2.5 rounded-xl bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold text-sm hover:opacity-90 transition-opacity"
          >
            Позвонить нам
          </a>
        </div>
      </div>
    </div>
  );
};