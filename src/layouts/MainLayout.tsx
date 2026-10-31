import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const MainLayout: React.FC = () => {
  // 1. Создаем стейт поиска прямо здесь, в общем макете
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-black dark:text-white transition-colors duration-300 flex flex-col">
      {/* 2. Передаем стейт в Хедер (теперь поиск в шапке оживет) */}
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <main className="flex-grow container mx-auto px-6 py-8">
        {/* 3. Прокидываем searchQuery в дочерние страницы через контекст Outlet */}
        <Outlet context={{ searchQuery }} />
      </main>

      <Footer />
    </div>
  );
};