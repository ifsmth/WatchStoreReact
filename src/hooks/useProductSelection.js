import { useSearchParams } from "react-router";

export default function useProductSelection() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Читаємо ID товару безпосередньо з адресного рядка (URL)
  const selectedId = searchParams.get("productId");

  function handleClearSelection() {
    const params = new URLSearchParams(searchParams);
    params.delete("productId");
    setSearchParams(params);
  }

  return { selectedId, handleClearSelection };
}
