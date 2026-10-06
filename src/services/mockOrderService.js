import { orders as initialOrders } from "../data/orders.js";
import { ServiceError } from "./ServiceError.js";
import { toOrderInput, toOrderList } from "./orderContract.js";

const storageKey = "watchstore.orders.v1";
const failures = new Set();

// Функція для штучного викликання помилки (для тестування)
export function failNextMockRequest(operation) {
  failures.add(operation);
}

// Штучна затримка (імітація мережі)
function pause(signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException("Aborted", "AbortError"));
      return;
    }
    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", abort);
      resolve();
    }, 600);

    function abort() {
      clearTimeout(timer);
      signal?.removeEventListener("abort", abort);
      reject(new DOMException("Aborted", "AbortError"));
    }
    signal?.addEventListener("abort", abort, { once: true });
  });
}

// Хук перед кожною операцією
async function before(operation, signal) {
  await pause(signal);
  if (failures.delete(operation)) {
    throw new ServiceError("Навчальна відмова сервісу. Повторіть дію.", {
      code: "MOCK_FAILURE",
    });
  }
}

// Читання з localStorage
function read() {
  try {
    const raw = localStorage.getItem(storageKey);
    return toOrderList(raw === null ? initialOrders : JSON.parse(raw));
  } catch (error) {
    if (error instanceof ServiceError) throw error;
    throw new ServiceError("Не вдалося прочитати локальні дані.", {
      code: "STORAGE_READ",
    });
  }
}

// Запис у localStorage
function write(records) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(records));
  } catch {
    throw new ServiceError("Не вдалося зберегти локальні дані.", {
      code: "STORAGE_WRITE",
    });
  }
}

function findRecord(records, id) {
  const record = records.find((entry) => String(entry.id) === String(id));
  if (!record) {
    throw new ServiceError("Замовлення не знайдено.", { code: "NOT_FOUND" });
  }
  return record;
}

// Сам сервіс (наш 5-методовий контракт)
export const mockOrderService = {
  async getAll({ signal } = {}) {
    await before("getAll", signal);
    return read();
  },

  async getById(id, { signal } = {}) {
    await before("getById", signal);
    return findRecord(read(), id);
  },

  async create(input) {
    const value = toOrderInput(input);
    await before("create");
    const records = read();
    const record = { ...value, id: `ord-${crypto.randomUUID()}` };
    write([...records, record]);
    return { ...record };
  },

  async update(id, input) {
    const value = toOrderInput(input);
    await before("update");
    const records = read();
    findRecord(records, id); // Перевіряємо чи існує
    const record = { ...value, id: String(id) };
    write(
      records.map((entry) =>
        String(entry.id) === String(id) ? record : entry,
      ),
    );
    return { ...record };
  },

  async delete(id) {
    await before("delete");
    const records = read();
    findRecord(records, id);
    write(records.filter((entry) => String(entry.id) !== String(id)));
  },
};
