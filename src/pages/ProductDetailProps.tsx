import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useShop } from '../ShopContext';
import { mockProducts } from '../data/products'; // Укажи свой путь к массиву товаров, если он называется иначе

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Достаем всё необходимое из нашего общего контекста
  const { addToCart, increaseQuantity, decreaseQuantity, toggleFavorite, isFavorite, getCartItem } = useShop();

  // Ищем товар по id из твоей базы данных (мока)
  const product = mockProducts.find((p) => String(p.id) === String(id));

  // Состояние для выбранной миниатюры фото
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  // Если товар не найден
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-zinc-950 text-gray-800 dark:text-gray-100 p-4">
        <h2 className="text-2xl font-bold mb-4">Товар не найден</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Возможно, он был удален или указан неверный адрес.
        </p>
        <button
          onClick={() => navigate('/catalog')}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition"
        >
          Вернуться в каталог
        </button>
      </div>
    );
  }

  // Проверяем статус избранного и корзины через контекст
  const liked = isFavorite(product.id);
  const cartItem = getCartItem(product.id);
  const isInCart = !!cartItem;

  // Безопасный массив фотографий (с заглушками на случай, если фото нет)
  const productImages =
    product.images && product.images.length > 0
      ? product.images
      : [
          product.images[0] || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600',
          'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600',
        ];

  const currentImage = productImages[selectedImageIndex] || productImages[0];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-gray-800 dark:text-gray-100 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-6xl mx-auto">
        
        {/* Хлебные крошки / Навигация */}
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
            Главная
          </Link>
          <span>/</span>
          <Link to="/catalog" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
            Каталог
          </Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-gray-100 font-medium truncate max-w-xs">
            {product.title}
          </span>
        </div>

        {/* Главная карточка товара */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-gray-100 dark:border-zinc-800 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-10">
            
            {/* Левая секция: Галерея фото */}
            <div className="flex flex-col gap-4">
              <div className="w-full aspect-square bg-gray-100 dark:bg-zinc-800 rounded-2xl overflow-hidden relative group">
                <img
                  src={currentImage}
                  alt={product.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-300"
                />

                {/* Кнопка Избранного (Сердечко) */}
                <button
                  onClick={() => toggleFavorite(product)}
                  aria-label="В избранное"className="absolute top-4 right-4 p-3 rounded-full bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md shadow-md hover:scale-110 active:scale-95 transition duration-200"
                >
                  <svg
                    className={`w-6 h-6 ${liked ? 'text-rose-500 fill-rose-500' : 'text-gray-400'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                    />
                  </svg>
                </button>
              </div>

              {/* Миниатюры фотографий */}
              <div className="flex gap-3 overflow-x-auto pb-2">
                {productImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-24 h-24 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      selectedImageIndex === idx
                        ? 'border-blue-600 dark:border-blue-400 ring-2 ring-blue-600/30 opacity-100 scale-105'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`${product.title} view ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Правая секция: Информация и Кнопки */}
            <div className="flex flex-col justify-between">
              <div>
                <span className="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-semibold rounded-full uppercase tracking-wider mb-3">
                  {product.category || 'Ozon Mini'}
                </span>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
                  {product.title}
                </h1>

                <div className="text-3xl font-black text-blue-600 dark:text-blue-400 mb-6">
                  {product.price} сом
                </div>

                <div className="border-t border-b border-gray-100 dark:border-zinc-800 py-5 my-5">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-2">
                    Описание
                  </h3>
                  <p className="text-gray-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
                    {product.description ||
                      'Оригинальная продукция высочайшего качества. Изготовлено из современных материалов с гарантией долговечности и комфорта.'}
                  </p>
                </div>
              </div>

              {/* Блок управления корзиной (Кнопка «В корзину» или переключатель [- количество +]) */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                {!isInCart ? (
                  <button
                    onClick={() => addToCart(product)}
                    className="flex-1 py-3.5 px-6 rounded-2xl font-bold text-white shadow-lg bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition duration-200 flex items-center justify-center gap-2"
                  >
                    В корзину
                  </button>
                ) : (
                  <div className="flex items-center justify-center flex-1 bg-blue-50 dark:bg-zinc-800 border border-blue-200 dark:border-zinc-700 rounded-2xl overflow-hidden py-2"><button
                      onClick={() => decreaseQuantity(product.id)}
                      className="px-5 py-2 font-bold text-blue-600 dark:text-blue-400 text-lg hover:bg-blue-100 dark:hover:bg-zinc-700 transition"
                    >
                      -
                    </button>
                    <span className="px-6 font-extrabold text-gray-900 dark:text-white">
                      {cartItem?.quantity}
                    </span>
                    <button
                      onClick={() => increaseQuantity(product.id)}
                      className="px-5 py-2 font-bold text-blue-600 dark:text-blue-400 text-lg hover:bg-blue-100 dark:hover:bg-zinc-700 transition"
                    >
                      +
                    </button>
                  </div>
                )}

                <button
                  onClick={() => navigate(-1)}
                  className="py-3.5 px-6 rounded-2xl font-semibold border border-gray-200 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-200 transition"
                >
                  Назад
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;