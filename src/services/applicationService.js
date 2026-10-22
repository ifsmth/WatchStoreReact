import { apiRequest } from "./apiClient.js";
import { normalizeApplication } from "./mappers.js";

export const applicationService = {
  async create({ name, contact, message }) {
    return normalizeApplication(
      await apiRequest("/applications", {
        method: "POST",
        body: {
          name,
          contact_information: contact,
          message,
        },
      }),
    );
  },

  async list({ status, search } = {}) {
    const params = new URLSearchParams();
    if (status) params.set("status", status);
    if (search) params.set("search", search);
    const query = params.toString();
    const rows = await apiRequest(
      `/admin/applications${query ? `?${query}` : ""}`,
      { auth: true },
    );
    return (Array.isArray(rows) ? rows : []).map(normalizeApplication);
  },

  async updateStatus(id, status) {
    return normalizeApplication(
      await apiRequest(`/admin/applications/${encodeURIComponent(id)}/status`, {
        method: "PATCH",
        auth: true,
        body: { status },
      }),
    );
  },

  delete(id) {
    return apiRequest(`/admin/applications/${encodeURIComponent(id)}`, {
      method: "DELETE",
      auth: true,
    });
  },
};
