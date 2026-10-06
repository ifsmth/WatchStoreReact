import { ServiceError } from "./ServiceError.js";
import { toOrder, toOrderInput, toOrderList } from "./orderContract.js";

export function createApiOrderService(baseUrl) {
  if (!baseUrl?.trim()) {
    throw new ServiceError("Не налаштовано адресу API.", { code: "CONFIG" });
  }
  const base = baseUrl.trim().replace(/\/+$/, "");

  async function request(path, { method = "GET", body, signal } = {}) {
    let response;
    try {
      response = await fetch(`${base}${path}`, {
        method,
        signal,
        headers: {
          Accept: "application/json",
          ...(body === undefined ? {} : { "Content-Type": "application/json" }),
        },
        ...(body === undefined ? {} : { body: JSON.stringify(body) }),
      });
    } catch (error) {
      if (error.name === "AbortError") throw error;
      throw new ServiceError("Не вдалося зв’язатися із сервісом.", {
        code: "NETWORK",
      });
    }

    if (!response.ok) {
      const messages = {
        400: "Сервіс відхилив дані замовлення.",
        401: "Для цієї дії потрібна автентифікація.",
        403: "Сервіс не дозволяє цю дію.",
        404: "Замовлення не знайдено.",
        409: "Дані змінилися. Оновіть їх перед повторною дією.",
        422: "Сервіс не прийняв значення полів.",
        429: "Забагато запитів. Повторіть дію пізніше.",
      };
      throw new ServiceError(
        messages[response.status] ?? "Сервіс тимчасово не може виконати дію.",
        {
          code: response.status === 404 ? "NOT_FOUND" : "HTTP",
          status: response.status,
        },
      );
    }

    if (response.status === 204) return undefined;

    try {
      return await response.json();
    } catch (error) {
      if (error.name === "AbortError") throw error;
      throw new ServiceError("Сервіс повернув відповідь не у форматі JSON.", {
        code: "BAD_DATA",
      });
    }
  }

  function recordPath(id) {
    return `/orders/${encodeURIComponent(id)}`;
  }

  return {
    async getAll({ signal } = {}) {
      return toOrderList(await request("/orders", { signal }));
    },
    async getById(id, { signal } = {}) {
      const record = toOrder(await request(recordPath(id), { signal }));
      if (String(record.id) !== String(id)) {
        throw new ServiceError("Сервіс повернув інше замовлення.", {
          code: "BAD_DATA",
        });
      }
      return record;
    },
    async create(input) {
      return toOrder(
        await request("/orders", {
          method: "POST",
          body: toOrderInput(input),
        }),
      );
    },
    async update(id, input) {
      const record = toOrder(
        await request(recordPath(id), {
          method: "PUT",
          body: toOrderInput(input),
        }),
      );
      if (String(record.id) !== String(id)) {
        throw new ServiceError("Сервіс змінив ідентифікатор замовлення.", {
          code: "BAD_DATA",
        });
      }
      return record;
    },
    async delete(id) {
      await request(recordPath(id), { method: "DELETE" });
    },
  };
}
