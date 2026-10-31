import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-amber-500/20 text-zinc-600 dark:text-zinc-400 transition-colors duration-500">
      <div className="container mx-auto px-6 py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          <div className="md:col-span-1">
            <span className="text-2xl font-black tracking-widest uppercase text-zinc-900 dark:text-amber-400">
              YONDO
            </span>
            <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-500 leading-relaxed">
              Ваш премиальный интернет-магазин с быстрой доставкой и гарантией качества.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white mb-4">
              Навигация
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="/" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">Главная</a></li>
              <li><a href="/catalog" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">Каталог товаров</a></li>
              <li><a href="/help" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">Помощь и FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white mb-4">
              Контакты
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                Email: <a href="mailto:info@yondo.kg" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors font-medium">info@yondo.kg</a>
              </li>
              <li>
                Телефон: <a href="tel:+996555123456" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors font-medium">+996 (555) 123-456</a>
              </li>
              <li className="text-zinc-500">
                Адрес: г. Бишкек, ул. Ленина, д. 10
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white mb-4">
              Мы в соцсетях
            </h4>
            <p className="text-sm text-zinc-500 mb-4">Следите за скидками и новинками в наших соцсетях.</p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-900 flex items-center justify-center hover:bg-amber-400 hover:text-zinc-950 dark:hover:bg-amber-400 dark:hover:text-zinc-950 transition-all">
                <img src="https://thumb.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/3840px-Telegram_logo.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail" alt="Telegram" className="w-6 h-6" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-900 flex items-center justify-center hover:bg-amber-400 hover:text-zinc-950 dark:hover:bg-amber-400 dark:hover:text-zinc-950 transition-all">
                <img className="w-7 h-5" src="https://thumb.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/3840px-YouTube_full-color_icon_%282017%29.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail" alt="Facebook" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-900 flex items-center justify-center hover:bg-amber-400 hover:text-zinc-950 dark:hover:bg-amber-400 dark:hover:text-zinc-950 transition-all">
                <img src="https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f3/VK_Compact_Logo_%282021-present%29.svg/1280px-VK_Compact_Logo_%282021-present%29.svg.png?utm_source=ru.wikipedia.org&utm_campaign=index&utm_content=thumbnail" alt="Instagram" className="w-6 h-6" />
              </a>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-zinc-200 dark:border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4"><p>&copy; 2026 YONDO. Все права защищены.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:underline">Политика конфиденциальности</a>
            <a href="#" className="hover:underline">Условия использования</a>
          </div>
        </div>

      </div>
    </footer>
  );
};