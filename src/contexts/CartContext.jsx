import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // Ініціалізуємо кошик з localStorage, якщо там щось є
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("watch_store_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Зберігаємо кошик у localStorage при кожній зміні
  useEffect(() => {
    localStorage.setItem("watch_store_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Додавання товару
  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.product.id === product.id,
      );
      if (existingItem) {
        // Якщо товар вже є, просто збільшуємо кількість
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      // Якщо немає — додаємо новий
      return [...prevItems, { product, quantity }];
    });
  };

  // Видалення товару
  const removeFromCart = (productId) => {
    setCartItems((prev) =>
      prev.filter((item) => item.product.id !== productId),
    );
  };

  // Оновлення кількості
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item,
      ),
    );
  };

  // Очищення кошика
  const clearCart = () => setCartItems([]);

  // Загальна кількість товарів (для іконки в Header)
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Загальна сума
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
