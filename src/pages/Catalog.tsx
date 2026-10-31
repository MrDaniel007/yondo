import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { type Product } from '../types';




export const Catalog: React.FC = () => {
  const [sortBy, setSortBy] = useState<'asc' | 'desc' | 'default'>('default');
  const { searchQuery } = useOutletContext<{ searchQuery: string }>();

const [products, setProducts] = useState<Product[]>([]);
const [selectedCategory, setSelectedCategory] = useState<string>('all');
const [maxPrice, setMaxPrice] = useState<number>(100000);
const [loading, setLoading] = useState<boolean>(true);
useEffect(() => {
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Product[]>('http://localhost:3000/api/products', {
        timeout: 5000,
      });
      
      // Умный маппинг для категорий
      const fixedProducts = response.data.map((item: any) => {
        let cat = item.category || item.type || item.cat;
        
        if (!cat) {
          const titleLower = item.title.toLowerCase();
          if (titleLower.includes('кроссовки') || titleLower.includes('обувь') || titleLower.includes('кеды')) {
            cat = 'shoes';
          } else {
            cat = 'accessories';
          }
        }

        return {
          ...item,
          category: cat,
        };
      });

      setProducts(fixedProducts);
    } catch (err) {
      console.error('Ошибка загрузки каталога:', err);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);
  // Категории вещей
  const categories = [
    { id: 'all', name: 'Все товары' },
    { id: 'laptops', name: 'Ноутбуки' },
    { id: 'phones', name: 'Смартфоны' },
    { id: "shoes", name: 'Обувь' },
    { id: "accessories", name: 'Аксессуары' },
  ];

  // Основная логика фильтрации и сортировки
 const filteredProducts = useMemo(() => {
  return products
.filter((product) => {
  if (selectedCategory === 'all') return true;
  
  // Убираем обратные апострофы внутри логирования, передаем переменные честно:

  return String(product.category).trim().toLowerCase() === String(selectedCategory).trim().toLowerCase();
})
    .filter((product) => product.price <= maxPrice)
    .sort((a, b) => {
      if (sortBy === 'asc') return a.price - b.price;
      if (sortBy === 'desc') return b.price - a.price;
      return 0;
    });
}, [products, searchQuery, selectedCategory, maxPrice, sortBy]);

  return (
    <div className="py-6">
      <h1 className="text-3xl font-black text-zinc-900 dark:text-amber-400 mb-8">
        Каталог товаров
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* ЛЕВАЯ КОЛОНКА: Блок фильтров */}
        <aside className="lg:col-span-1 p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 h-fit space-y-6">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800 pb-3">
            Фильтры
          </h2>

          {/* 1. Фильтр по типу вещи (Категории) */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3"> Категория</h3>
            <div className="flex flex-col gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-left px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-zinc-900 text-white dark:bg-amber-400 dark:text-zinc-950 font-bold'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>{/* 2. Фильтр по цене */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Макс. цена</h3>
              <span className="text-sm font-bold text-amber-500">{maxPrice} сом</span>
            </div>
            <input
              type="range"
              min="1000"
              max="100000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>

          {/* Сброс фильтров */}
          <button
            onClick={() => {
              setSelectedCategory('all');
              setMaxPrice(100000);
              setSortBy('default');
            }}
            className="w-full py-2 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-white underline transition-colors"
          >
            Сбросить фильтры
          </button>
        </aside>

        {/* ПРАВАЯ КОЛОНКА: Сетка товаров */}
        <main className="lg:col-span-3">
          
          {/* Сортировка сверху */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm text-zinc-500">
              Найдено товаров: <strong className="text-zinc-900 dark:text-white">{filteredProducts.length}</strong>
            </span>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'asc' | 'desc' | 'default')}
              className="px-4 py-2 text-sm rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white outline-none focus:border-amber-400"
            >
              <option value="default">По умолчанию</option>
              <option value="asc">Сначала дешевле</option>
              <option value="desc">Сначала дороже</option>
            </select>
          </div>

          {/* Вывод карточек */}
          {loading ? (
<div className="text-center py-20 text-zinc-500 dark:text-zinc-400">
Загрузка товаров...
</div>
) : filteredProducts.length === 0 ? (
<div className="text-center py-16 bg-zinc-50 dark:bg-zinc-900/40 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800">
<p className="text-zinc-500 dark:text-zinc-400 text-lg">
Под эти фильтры ничего не подходит 😢
</p>
</div>
) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>

      </div>
    </div>
  );
};
   