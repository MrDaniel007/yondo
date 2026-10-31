import React from 'react';
import { useShop } from '../ShopContext';
import { ProductCard } from '../components/ProductCard';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useShop();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-zinc-800 dark:text-white">Избранное</h1>
      
      {favorites.length === 0 ? (
        <p className="text-zinc-500">Список избранного пуст</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};