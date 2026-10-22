import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { brands as mockBrands, products as mockProducts } from "../data/products.js";
import { catalogService } from "../services/catalogService.js";
import { isMockData } from "../services/dataSource.js";
import { errorMessage } from "../services/ServiceError.js";

const CatalogContext = createContext(null);

export function CatalogProvider({ children }) {
  const [products, setProducts] = useState(isMockData ? mockProducts : []);
  const [brands, setBrands] = useState(isMockData ? mockBrands : []);
  const [status, setStatus] = useState(isMockData ? "success" : "loading");
  const [error, setError] = useState("");

  const reload = useCallback(async () => {
    if (isMockData) {
      setProducts(mockProducts);
      setBrands(mockBrands);
      setStatus("success");
      setError("");
      return;
    }

    setStatus("loading");
    setError("");
    try {
      const [brandRows, productPage] = await Promise.all([
        catalogService.getBrands(),
        catalogService.getProducts({ params: { limit: 100, page: 1 } }),
      ]);
      setBrands(Array.isArray(brandRows) ? brandRows : []);
      setProducts(productPage.data);
      setStatus("success");
    } catch (cause) {
      setError(errorMessage(cause));
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  const brandsList = useMemo(
    () => ["Усі бренди", ...brands.map((brand) => brand.name)],
    [brands],
  );

  const value = useMemo(
    () => ({
      products,
      brands,
      brandsList,
      status,
      error,
      reload,
    }),
    [products, brands, brandsList, status, error, reload],
  );

  return (
    <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
  );
}

export function useCatalog() {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error("useCatalog must be used within CatalogProvider");
  }
  return context;
}
