import React from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cartCount: number;
  favoritesCount: number;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  isDark,
  onToggleTheme,
  searchQuery,
  setSearchQuery,
  cartCount,
  favoritesCount,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex md:hidden">
      {/* Затемнение фона */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Выезжающая панель */}
      <div className="relative ml-auto w-4/5 max-w-sm h-full bg-white dark:bg-zinc-950 text-black dark:text-white p-6 flex flex-col justify-between shadow-2xl border-l border-zinc-200 dark:border-amber-500/20 z-10 transition-colors">
        
        {/* Верх: Лого и крестик */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <span className="text-2xl font-black tracking-widest uppercase text-zinc-900 dark:text-amber-400">
              YONDO
            </span>
            <button 
              onClick={onClose}
              className="p-2 text-zinc-500 hover:text-black dark:hover:text-white text-xl"
            >
              ✕
            </button>
          </div>

          {/* Поиск внутри бургера */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Поиск товаров..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 text-sm rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder:text-zinc-400 outline-none border border-transparent dark:border-amber-500/20 focus:border-amber-400 transition-all"
            />
          </div>

          {/* Избранное и Корзина в мобилке */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-sm font-medium hover:opacity-80 transition-opacity">
              ❤️ Избранное 
              {favoritesCount > 0 && (
                <span className="bg-amber-400 text-zinc-950 text-xs font-bold px-2 py-0.5 rounded-full">
                  {favoritesCount}
                </span>
              )}
            </button>
            <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-sm font-medium hover:opacity-80 transition-opacity">
              🛒 Корзина 
              {cartCount > 0 && (
                <span className="bg-amber-400 text-zinc-950 text-xs font-bold px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Навигация */}
          <nav className="flex flex-col gap-4 text-base font-medium border-t border-zinc-200 dark:border-zinc-800/80 pt-6">
            <a href="/" onClick={onClose} className="hover:text-amber-400 transition-colors">Главная</a>
            <a href="/catalog" onClick={onClose} className="hover:text-amber-400 transition-colors">Каталог</a>
            <a href="/help" onClick={onClose} className="hover:text-amber-400 transition-colors">Помощь</a>
          </nav>
        </div>

        {/* Низ: Тумблер темы */}
        <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800/80 flex items-center justify-between">
          <span className="text-sm text-zinc-500">Тёмная тема</span>
          <button
            onClick={onToggleTheme}
            className="relative w-14 h-8 rounded-full transition-colors duration-300 p-1 bg-zinc-200 dark:bg-zinc-900 border border-zinc-300 dark:border-amber-500/30 flex items-center cursor-pointer">
            <div className={`w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center text-xs ${isDark ? 'translate-x-6 bg-amber-400 text-zinc-950' : 'translate-x-0 bg-white text-zinc-800'}`}>
              {isDark ? '🌙' : '☀️'}
            </div>
          </button>
        </div>

      </div>
    </div>
  );
};