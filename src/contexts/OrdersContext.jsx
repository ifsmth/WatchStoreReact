import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { orderService } from "../services/orderService.js";
import { errorMessage } from "../services/ServiceError.js";

const OrdersContext = createContext(null);

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [isMutating, setIsMutating] = useState(false);

  const activeRead = useRef(null);
  const readVersion = useRef(0);
  const mutationLock = useRef(false);
  const mounted = useRef(false);

  const reload = useCallback(async () => {
    if (mutationLock.current) return;

    activeRead.current?.abort();
    const controller = new AbortController();
    activeRead.current = controller;
    const version = ++readVersion.current;

    setStatus("loading");
    setError("");

    try {
      const records = await orderService.getAll({ signal: controller.signal });
      if (controller.signal.aborted || version !== readVersion.current) return;

      setOrders(records);
      setStatus("success");
    } catch (cause) {
      if (controller.signal.aborted || version !== readVersion.current) return;
      setError(errorMessage(cause));
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    mounted.current = true;
    void reload();
    return () => {
      mounted.current = false;
      activeRead.current?.abort();
      readVersion.current += 1;
    };
  }, [reload]);

  async function mutate(operation, apply, message) {
    if (mutationLock.current || status !== "success") {
      return {
        ok: false,
        message: "Дочекайтеся завершення поточної операції.",
      };
    }

    mutationLock.current = true;
    setIsMutating(true);
    setNotice("");

    activeRead.current?.abort();
    readVersion.current += 1;

    try {
      const record = await operation();
      if (mounted.current) {
        setOrders((previous) => apply(previous, record));
        setNotice(message);
      }
      return { ok: true, record };
    } catch (cause) {
      return {
        ok: false,
        message: errorMessage(cause),
        errors: cause.errors,
        code: cause.code,
      };
    } finally {
      mutationLock.current = false;
      if (mounted.current) setIsMutating(false);
    }
  }

  function createOrder(input) {
    return mutate(
      () => orderService.create(input),
      (previous, record) => [
        ...previous.filter((entry) => String(entry.id) !== String(record.id)),
        record,
      ],
      "Замовлення успішно створено.",
    );
  }

  function updateOrder(id, input) {
    return mutate(
      () => orderService.update(id, input),
      (previous, record) =>
        previous.map((entry) =>
          String(entry.id) === String(id) ? record : entry,
        ),
      "Зміни замовлення збережено.",
    );
  }

  function deleteOrder(id) {
    return mutate(
      () => orderService.delete(id),
      (previous) => previous.filter((entry) => String(entry.id) !== String(id)),
      "Замовлення видалено.",
    );
  }

  return (
    <OrdersContext.Provider
      value={{
        orders,
        status,
        error,
        reload,
        isMutating,
        createOrder,
        updateOrder,
        deleteOrder,
        notice,
        dismissNotice: () => setNotice(""),
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
