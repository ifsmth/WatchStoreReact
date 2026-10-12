import { createContext, useContext } from "react";
import { useSearchParams } from "react-router";
import { products } from "../data/products.js";

const ProductSelectionContext = createContext(undefined);

export function ProductSelectionProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlProductId = searchParams.get("productId");
  const selectedId = urlProductId ? Number(urlProductId) : null;

  const selectedItem = products.find((item) => item.id === selectedId);

  function handleSelect(id) {
    if (products.some((item) => item.id === id)) {
      const params = new URLSearchParams(searchParams);
      params.set("productId", String(id));
      setSearchParams(params);
    }
  }

  function handleClearSelection() {
    const params = new URLSearchParams(searchParams);
    params.delete("productId");
    setSearchParams(params);
  }

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

// eslint-disable-next-line react-refresh/only-export-components
export function useProductSelection() {
  const context = useContext(ProductSelectionContext);
  if (context === undefined) {
    throw new Error(
      "useProductSelection необхідно використовувати всередині ProductSelectionProvider",
    );
  }
  return context;
}
