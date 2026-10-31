import { useOutletContext } from 'react-router-dom';
import { ProductsList } from '../components/ProductList';

// Описываем тип для контекста
interface ContextType {
  searchQuery: string;
}

export default function Home() {
  // Достаем searchQuery из аутлета макета
  const { searchQuery } = useOutletContext<ContextType>();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Каталог товаров</h1>
      {/* Передаем в список товаров */}
      <ProductsList searchQuery={searchQuery} />
    </div>
  );
}