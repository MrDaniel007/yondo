import React from 'react';
import {type Product, useShop } from '../ShopContext';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleFavorite, addToCart, increaseQuantity, decreaseQuantity, isFavorite, getCartItem } = useShop();

  const liked = isFavorite(product.id);
  const cartItem = getCartItem(product.id);
  const isInCart = !!cartItem;

  const imageUrl = product.images && product.images[0] ? product.images[0] : 'https://via.placeholder.com/300';

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative">
      
      {/* Кнопка избранного */}
      <button 
        onClick={() => toggleFavorite(product)}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm shadow hover:scale-110 transition-transform"
      >
        <svg 
          className={`w-5 h-5 ${liked ? 'text-red-500 fill-red-500' : 'text-zinc-400'}`} 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      {/* Кликабельная область (Картинка и Название ведут на детальную страницу) */}
      <Link to={`/product/${product.id}`} className="group block">
        <div className="w-full h-48 mb-4 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
          <img 
            src={imageUrl} 
            alt={product.title} 
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div>
          <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Ozon Mini</span>
          <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-100 mt-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.title}
          </h3>
        </div>
      </Link>

      {/* Цена и блок корзины (остаются кликабельными отдельно от ссылки) */}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-lg font-bold text-zinc-900 dark:text-white">
          {product.price} сом
        </span>
        
        {!isInCart ? (
          <button
            onClick={() => addToCart(product)}
            className="px-4 py-2 rounded-xl text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            В корзину
          </button>
        ) : (
          <div className="flex items-center bg-blue-50 dark:bg-zinc-800 border border-blue-200 dark:border-zinc-700 rounded-xl overflow-hidden">
            <button
              onClick={() => decreaseQuantity(product.id)}
              className="px-3 py-2 text-blue-600 dark:text-blue-400 font-bold hover:bg-blue-100 dark:hover:bg-zinc-700 transition-colors"
            >
              -
            </button>
            <span className="px-3 text-sm font-bold text-zinc-800 dark:text-white">
              {cartItem.quantity}
            </span>
            <button
              onClick={() => increaseQuantity(product.id)}
              className="px-3 py-2 text-blue-600 dark:text-blue-400 font-bold hover:bg-blue-100 dark:hover:bg-zinc-700 transition-colors"
            >
              +
            </button>
          </div>
        )}
      </div>

    </div>
  );
};