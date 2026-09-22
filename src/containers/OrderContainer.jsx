import OrderPage from "../pages/OrderPage.jsx";
import { useProductSelection } from "../contexts/ProductSelectionContext.jsx";

export default function OrderContainer() {
  const { selectedItem, handleClearSelection } = useProductSelection();

  return (
    <OrderPage
      key={selectedItem?.id ?? "empty"}
      item={selectedItem}
      onClearSelection={handleClearSelection}
    />
  );
}
