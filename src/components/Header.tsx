import React, { useState, useEffect } from 'react';
import { MobileMenu } from './MobileMenuProps';
import { useShop } from '../ShopContext';
import { Link, useNavigate } from 'react-router-dom'; 
import { supabase } from '../supabaseClient';
import { type User } from '@supabase/supabase-js';

interface HeaderProps {
  cartCount?: number;
  favoritesCount?: number;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, favoritesCount, searchQuery = '', setSearchQuery }) => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return document.documentElement.classList.contains('dark');
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { cart, favorites } = useShop();

  const realCartCount = cartCount ?? cart.reduce((sum, item) => sum + item.quantity, 0);
  const realFavoritesCount = favoritesCount ?? favorites.length;

  useEffect(() => {
    supabase.auth.getUser().then(({data}) => {
      setUser(data.user);
    });
 

  const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
    setUser(session?.user ?? null);
  });

  return () => {
    authListener.subscription.unsubscribe();
  };
 }, []);

 useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  // Выход из аккаунта
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsProfileMenuOpen(false);
    navigate('/');
  };
  const formattedDate = user?.created_at 
    ? new Date(user.created_at).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' })
    : '';
  return (
    <>
      <header className="sticky top-0 z-40 transition-all duration-500 bg-white/80 dark:bg-zinc-950/85 backdrop-blur-md border-b border-zinc-200/80 dark:border-amber-500/20 shadow-sm">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Бургер-кнопка слева на мобилках */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 text-zinc-800 dark:text-zinc-200 focus:outline-none"
            aria-label="Открыть меню"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Десктопная навигация */}
          <nav className="hidden md:flex items-center gap-6 w-1/3 text-sm font-semibold tracking-wide">
            <Link to="/" className="text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-amber-400 transition-colors">Главная</Link>
            <Link to="/catalog" className="text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-amber-400 transition-colors">Каталог</Link>
            <Link to="/help" className="text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-amber-400 transition-colors">Помощь</Link>
          </nav>

          {/* Логотип по центру */}
          <div className="flex justify-center md:w-1/3">
            <Link to="/" className="text-2xl md:text-3xl font-black tracking-widest uppercase transition-colors text-zinc-900 dark:text-amber-400">
              YONDO
            </Link>
          </div>

          {/* Правая часть (Десктоп: Тумблер, Поиск, Сердечко, Корзина) */}
          <div className="flex items-center justify-end gap-3 md:gap-4 md:w-1/3">
            
            {/* Тумблер темы (десктоп) */}
       <button
  onClick={toggleTheme}
  className="hidden md:flex relative items-center rounded-full transition-colors duration-500 cursor-pointer p-1 bg-zinc-200 dark:bg-zinc-900 border border-zinc-300 dark:border-amber-500/30 flex-shrink-0"
  style={{ width: '56px', height: '32px' }}
  title="Переключить тему"
>
  <div className={`w-6 h-6 rounded-full shadow-md transform transition-transform duration-500 flex items-center justify-center text-xs font-bold ${isDark ? 'translate-x-6 bg-amber-400 text-zinc-950' : 'translate-x-0 bg-white text-zinc-800'}`}>
    {isDark ? '🌙' : '☀️'}
  </div>
</button>

            {/* Десктопный поиск */}
            <form onSubmit={(e) => e.preventDefault()} className="hidden md:block relative w-full max-w-[180px] min-w-20">
              <input
                type="text"
                placeholder="Поиск..."
                value={searchQuery}
                onChange={(e) => setSearchQuery?.(e.target.value)}
                className="w-full px-4 py-2 text-sm rounded-full outline-none transition-all duration-300 bg-zinc-100 dark:bg-zinc-900/90 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 border border-transparent dark:border-amber-500/20 focus:border-zinc-400 dark:focus:border-amber-400"
              />
            </form>{/* Сердечко (Избранное) */}
            <Link to="favorites" className="relative p-2 text-zinc-700 dark:text-amber-400 hover:scale-105 transition-transform" title="Избранное">
              ❤️
              {realFavoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center bg-zinc-900 text-white dark:bg-amber-400 dark:text-zinc-950">
                  {realFavoritesCount}
                </span>
              )}
            </Link>

            {/* Корзина */}
            <Link to="cart" className="relative p-2 text-zinc-700 dark:text-amber-400 hover:scale-105 transition-transform" title="Корзина">
              🛒
              {realCartCount > 0 && (
                <span className="absolute -top-1 -right-1 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center bg-zinc-900 text-white dark:bg-amber-400 dark:text-zinc-950">
                  {realCartCount}
                </span>
              )}
            </Link>




{/* АВТОРИЗАЦИЯ / ПРОФИЛЬ */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="w-10 h-10 rounded-full bg-blue-600 dark:bg-amber-400 text-white dark:text-zinc-950 font-bold flex items-center justify-center shadow hover:scale-105 transition"
                >
                  {user.email ? user.email[0].toUpperCase() : 'U'}
                </button>

                {/* Выпадающее меню профиля */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl p-4 z-50">
                    <p className="text-xs text-zinc-400 uppercase tracking-wider font-bold mb-1">Аккаунт</p>
                    <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 truncate mb-2">{user.email}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">Создан: {formattedDate}</p>

                    <div className="border-t border-zinc-100 dark:border-zinc-800 pt-3 flex flex-col gap-2">
                      <button
                        onClick={toggleTheme}
                        className="w-full text-left px-3 py-2 text-sm rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition text-zinc-700 dark:text-zinc-300 flex items-center justify-between"
                      >
                        <span>Тема</span>
                        <span>{isDark ? '🌙 Темная' : '☀️ Светлая'}</span>
                      </button>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2 text-sm rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition font-medium"
                      >
                        Выйти из аккаунта
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth"
                className="px-4 py-2 text-sm font-bold rounded-xl bg-blue-600 dark:bg-amber-400 text-white dark:text-zinc-950 hover:opacity-90 transition shadow-sm"
              >
                Войти
              </Link>
            )}




       </div>
        </div>
      </header>

      {/* Мобильное меню выезжающее */}
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery ?? (() => {})}
        cartCount={realCartCount}
        favoritesCount={realFavoritesCount}
      />
    </>
  );
};