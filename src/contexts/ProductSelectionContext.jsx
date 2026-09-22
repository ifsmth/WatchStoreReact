import { createContext, useState, useContext } from "react";
import { products } from "../data/products.js";

// 1. Створення об'єкта контексту
const ProductSelectionContext = createContext(undefined);

// 2. Провайдер стану
export function ProductSelectionProvider({ children }) {
  const [selectedId, setSelectedId] = useState(null);

  const selectedItem = products.find((item) => item.id === selectedId);

  function handleSelect(id) {
    if (products.some((item) => item.id === id)) {
      setSelectedId(id);
    }
  }

  function handleClearSelection() {
    setSelectedId(null);
  }

  // Передаємо стан та функції в контекст
  const contextValue = {
    selectedId,
    selectedItem,
    handleSelect,
    handleClearSelection,
  };

  return (
    <ProductSelectionContext.Provider value={contextValue}>
      {children}
    </ProductSelectionContext.Provider>
  );
}

// 3. Кастомний хук із перевіркою на помилки інтеграції
export function useProductSelection() {
  const context = useContext(ProductSelectionContext);

  if (context === undefined) {
    throw new Error(
      "useProductSelection необхідно використовувати всередині ProductSelectionProvider",
    );
  }

  return context;
}
