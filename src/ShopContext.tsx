import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface Product {
  id: number;
  title: string;
  price: number;
  image?: string;
  images?: string[];
  category?: string;
}

// Товар в корзине уже содержит количество
export interface CartItem extends Product {
  quantity: number;
}

interface ShopContextType {
  favorites: Product[];
  cart: CartItem[];
  toggleFavorite: (product: Product) => void;
  addToCart: (product: Product) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  isFavorite: (id: number) => boolean;
  getCartItem: (id: number) => CartItem | undefined;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Product[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const toggleFavorite = (product: Product) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      return exists ? prev.filter((item) => item.id !== product.id) : [...prev, product];
    });
  };

  // Первое добавление в корзину (количество = 1)
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) return prev; // Если уже есть, ничего не делаем (управляем плюсом/минусом)
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Увеличить количество (с лимитом до 10)
  const increaseQuantity = (productId: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === productId) {
          if (item.quantity >= 10) return item; // Лимит 10
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    );
  };

  // Уменьшить количество (если падает до 0 — удаляем из корзины)
  const decreaseQuantity = (productId: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === productId) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter((item) => item.quantity > 0) // Убираем товар, если количество стало 0
    );
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const isFavorite = (id: number) => favorites.some((item) => item.id === id);
  const getCartItem = (id: number) => cart.find((item) => item.id === id);

  return (
    <ShopContext.Provider
      value={{
        favorites,
        cart,
        toggleFavorite,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        isFavorite,
        getCartItem,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop должен быть внутри ShopProvider!');
  return context;
};