import { apiRequest } from "./apiClient.js";
import { normalizeOrder } from "./mappers.js";
import { ServiceError } from "./ServiceError.js";

function toCreateBody(input) {
  if (Array.isArray(input.items) && input.items.length > 0) {
    return {
      customer_name: input.customer_name || input.customerName,
      phone: input.phone,
      email: input.email,
      comment: input.comment || "",
      items: input.items.map((item) => ({
        product_id: Number(item.product_id ?? item.productId),
        quantity: Number(item.quantity),
      })),
    };
  }

  return {
    customer_name: input.customer_name || input.customerName,
    phone: input.phone,
    email: input.email,
    comment: input.comment || "",
    items: [
      {
        product_id: Number(input.product_id ?? input.productId),
        quantity: Number(input.quantity || 1),
      },
    ],
  };
}

function toContactBody(input) {
  return {
    customer_name:
      input.customer_name ||
      input.customerName ||
      input.customer?.name ||
      "",
    phone: input.phone || input.customer?.phone || "",
    email: input.email || input.customer?.email || "",
    comment: input.comment || "",
  };
}

export function createApiOrderService() {
  return {
    async getAll({ signal } = {}) {
      const rows = await apiRequest("/orders", { auth: true, signal });
      if (!Array.isArray(rows)) {
        throw new ServiceError("Джерело повернуло некоректний список.", {
          code: "BAD_DATA",
        });
      }
      return rows.map(normalizeOrder);
    },

    async getById(id, { signal } = {}) {
      return normalizeOrder(
        await apiRequest(`/orders/${encodeURIComponent(id)}`, {
          auth: true,
          signal,
        }),
      );
    },

    async create(input) {
      return normalizeOrder(
        await apiRequest("/orders", {
          method: "POST",
          auth: true,
          body: toCreateBody(input),
        }),
      );
    },

    async update(id, input) {
      if (input?.status && !input.customerName && !input.customer_name) {
        return this.updateStatus(id, input.status);
      }
      return this.updateContacts(id, input);
    },

    async updateStatus(id, status) {
      return normalizeOrder(
        await apiRequest(`/admin/orders/${encodeURIComponent(id)}/status`, {
          method: "PATCH",
          auth: true,
          body: { status },
        }),
      );
    },

    async updateContacts(id, input) {
      return normalizeOrder(
        await apiRequest(`/admin/orders/${encodeURIComponent(id)}`, {
          method: "PUT",
          auth: true,
          body: toContactBody(input),
        }),
      );
    },

    async delete(id) {
      await apiRequest(`/admin/orders/${encodeURIComponent(id)}`, {
        method: "DELETE",
        auth: true,
      });
    },
  };
}
