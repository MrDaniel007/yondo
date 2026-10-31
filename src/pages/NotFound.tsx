import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      {/* Крупный градиентный заголовок */}
      <h1 className="text-9xl font-black tracking-widest text-zinc-200 dark:text-zinc-800 select-none">
        404
      </h1>
      
      <div className="-mt-12 space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-amber-400">
          Страница не найдена
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 max-w-md mx-auto text-sm md:text-base leading-relaxed">
          Кажется, вы забрели не туда. Страница, которую вы ищете, была перемещена, удалена или никогда не существовала.
        </p>

        <div className="pt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold rounded-xl bg-zinc-900 text-white dark:bg-amber-400 dark:text-zinc-950 hover:opacity-90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            ← Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  );
};