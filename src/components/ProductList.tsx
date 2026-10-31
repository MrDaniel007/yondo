import { useState, useEffect } from 'react';
import axios from 'axios';
import { type Product } from '../types'; 
import { ProductCard } from '../components/ProductCard';


interface ProductListProps {
    searchQuery: string;
}

export const ProductsList: React.FC<ProductListProps> = ({ searchQuery }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get<Product[]>('https://yondo.onrender.com/api/products', {
          timeout: 5000 
        });

        setProducts(response.data);
      } catch (err: any) {
        if (err.code === 'ECONNABORTED') {
          setError('Время ожидания истекло! Сервер упал или отвечает слишком долго.');
        } else {
          setError(err.message || 'Ошибка при получении данных');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); 


  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );


  if (loading) return <div className="text-center py-10 text-xl font-bold">Загрузка товаров...</div>;
  if (error) return <div className="text-center py-10 text-red-500 font-bold">{error}</div>;

 return (
    <div className="p-4">
      {filteredProducts.length === 0 ? (
        <p className="text-center text-zinc-500 dark:text-zinc-400 py-10">Товары не найдены 😢</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
