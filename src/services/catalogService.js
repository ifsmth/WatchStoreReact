import { apiRequest } from "./apiClient.js";
import { normalizeProduct } from "./mappers.js";

export const catalogService = {
  async getBrands({ signal } = {}) {
    return apiRequest("/brands", { signal });
  },

  async getProducts({ signal, params } = {}) {
    const search = new URLSearchParams();
    Object.entries(params || {}).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        search.set(key, String(value));
      }
    });
    const query = search.toString();
    const payload = await apiRequest(`/products${query ? `?${query}` : ""}`, {
      signal,
    });
    const rows = Array.isArray(payload) ? payload : payload?.data || [];
    return {
      data: rows.map(normalizeProduct),
      pagination: payload?.pagination || null,
    };
  },

  async getProduct(id, { signal } = {}) {
    return normalizeProduct(
      await apiRequest(`/products/${encodeURIComponent(id)}`, { signal }),
    );
  },

  createBrand(name) {
    return apiRequest("/admin/brands", {
      method: "POST",
      auth: true,
      body: { name },
    });
  },

  deleteBrand(id) {
    return apiRequest(`/admin/brands/${encodeURIComponent(id)}`, {
      method: "DELETE",
      auth: true,
    });
  },

  createProduct(body) {
    return apiRequest("/admin/products", {
      method: "POST",
      auth: true,
      body,
    }).then(normalizeProduct);
  },

  updateProduct(id, body) {
    return apiRequest(`/admin/products/${encodeURIComponent(id)}`, {
      method: "PUT",
      auth: true,
      body,
    }).then(normalizeProduct);
  },

  deleteProduct(id) {
    return apiRequest(`/admin/products/${encodeURIComponent(id)}`, {
      method: "DELETE",
      auth: true,
    });
  },

  uploadProductImage(productId, file, isMain = false) {
    const body = new FormData();
    body.append("image", file);
    body.append("is_main", isMain ? "1" : "0");
    return apiRequest(
      `/admin/products/${encodeURIComponent(productId)}/images`,
      {
        method: "POST",
        auth: true,
        body,
      },
    );
  },

  deleteProductImage(productId, imageId) {
    return apiRequest(
      `/admin/products/${encodeURIComponent(productId)}/images/${encodeURIComponent(imageId)}`,
      {
        method: "DELETE",
        auth: true,
      },
    );
  },
};
