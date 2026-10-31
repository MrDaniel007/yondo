import React from 'react';
import { useShop } from '../ShopContext';
import { ProductCard } from '../components/ProductCard';

export const CartPage: React.FC = () => {
  const { cart } = useShop();

  // Считаем общую сумму заказа
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-zinc-800 dark:text-white">Корзина</h1>

      {cart.length === 0 ? (
        <p className="text-zinc-500">Ваша корзина пуста</p>
      ) : (
        <div>
          {/* Блок с общей суммой */}
          <div className="mb-6 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex justify-between items-center">
            <span className="text-lg font-medium text-zinc-700 dark:text-zinc-300">Итого к оплате:</span>
            <span className="text-2xl font-bold text-zinc-900 dark:text-white">{totalPrice} сом</span>
          </div>

          {/* Сетка товаров в корзине */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cart.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};