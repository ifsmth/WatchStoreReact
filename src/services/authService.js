import { apiRequest, clearToken, setToken } from "./apiClient.js";
import { normalizeAccount } from "./mappers.js";

function saveSession(token, account) {
  setToken(token);
  return normalizeAccount(account);
}

export const authService = {
  async register({ name, email, phone_number, password }) {
    const data = await apiRequest("/auth/register", {
      method: "POST",
      body: { name, email, phone_number, password },
    });
    return saveSession(data.token, data.user);
  },

  async login(login, password) {
    const data = await apiRequest("/auth/login", {
      method: "POST",
      body: { login, password },
    });
    return saveSession(data.token, data.user);
  },

  async loginAdmin(email, password) {
    const data = await apiRequest("/auth/admin/login", {
      method: "POST",
      body: { email, password },
    });
    return saveSession(data.token, data.admin);
  },

  async me() {
    return normalizeAccount(await apiRequest("/auth/me", { auth: true }));
  },

  async updateProfile({ name, phone_number }) {
    return normalizeAccount(
      await apiRequest("/users/me", {
        method: "PUT",
        auth: true,
        body: { name, phone_number },
      }),
    );
  },

  changePassword({ old_password, new_password }) {
    return apiRequest("/users/me/password", {
      method: "PUT",
      auth: true,
      body: { old_password, new_password },
    });
  },

  async listUsers() {
    const rows = await apiRequest("/admin/users", { auth: true });
    return Array.isArray(rows) ? rows : [];
  },

  logout() {
    clearToken();
  },
};
