import { createContext, useContext, useState } from "react";
import { orders as initialOrders } from "../data/orders.js";
import { validateOrder } from "../domain/orderValidation.js";

const OrdersContext = createContext(null);

export function OrdersProvider({ items, children }) {
  // Ініціалізуємо стан із початкового масиву (робимо копію)
  const [orders, setOrders] = useState(() =>
    initialOrders.map((o) => ({ ...o })),
  );
  const [notice, setNotice] = useState("");

  function createOrder(input) {
    const validation = validateOrder(input, items);
    if (!validation.ok) return validation;

    const record = {
      id: `ord-${crypto.randomUUID()}`, // Генеруємо унікальний ID
      ...validation.value,
    };

    setOrders((previous) => [...previous, record]);
    setNotice("Замовлення створено в поточній локальній колекції.");
    return { ok: true, record };
  }

  function updateOrder(id, input) {
    const current = orders.find((order) => order.id === id);
    if (!current)
      return { ok: false, message: "Замовлення для оновлення не знайдено." };

    const validation = validateOrder(input, items);
    if (!validation.ok) return validation;

    const record = { ...validation.value, id: current.id };

    setOrders((previous) =>
      previous.map((order) => (order.id === id ? record : order)),
    );
    setNotice("Зміни збережено в поточній локальній колекції.");
    return { ok: true, record };
  }

  function deleteOrder(id) {
    if (!orders.some((order) => order.id === id)) {
      return { ok: false, message: "Замовлення для видалення не знайдено." };
    }

    setOrders((previous) => previous.filter((order) => order.id !== id));
    setNotice("Замовлення видалено з поточної локальної колекції.");
    return { ok: true };
  }

  function dismissNotice() {
    setNotice("");
  }

  return (
    <OrdersContext.Provider
      value={{
        orders,
        createOrder,
        updateOrder,
        deleteOrder,
        notice,
        dismissNotice,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (context === null) {
    throw new Error("useOrders must be used within OrdersProvider");
  }
  return context;
}
