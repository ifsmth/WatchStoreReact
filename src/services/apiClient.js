import { apiBaseUrl } from "./dataSource.js";
import { ServiceError } from "./ServiceError.js";

const TOKEN_KEY = "watch_store_token";

export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY) || "";
  } catch {
    return "";
  }
}

export function setToken(token) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    // ignore quota / private mode
  }
}

export function clearToken() {
  setToken("");
}

function statusMessage(status) {
  const messages = {
    400: "Сервіс відхилив надіслані дані.",
    401: "Потрібна автентифікація або сесія закінчилась.",
    403: "Немає прав для цієї дії.",
    404: "Ресурс не знайдено.",
    409: "Конфлікт даних. Оновіть сторінку та спробуйте ще раз.",
    422: "Сервіс не прийняв значення полів.",
    429: "Забагато запитів. Повторіть дію пізніше.",
  };
  return messages[status] ?? "Сервіс тимчасово не може виконати дію.";
}

async function readBody(response) {
  if (response.status === 204) return undefined;
  const text = await response.text();
  if (!text) return undefined;
  try {
    return JSON.parse(text);
  } catch {
    throw new ServiceError("Сервіс повернув відповідь не у форматі JSON.", {
      code: "BAD_DATA",
    });
  }
}

export async function apiRequest(
  path,
  { method = "GET", body, signal, auth = false, headers = {} } = {},
) {
  const isForm = typeof FormData !== "undefined" && body instanceof FormData;
  const token = auth ? getToken() : "";

  let response;
  try {
    response = await fetch(`${apiBaseUrl}${path}`, {
      method,
      signal,
      headers: {
        Accept: "application/json",
        ...(isForm || body === undefined
          ? {}
          : { "Content-Type": "application/json" }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      ...(body === undefined
        ? {}
        : { body: isForm ? body : JSON.stringify(body) }),
    });
  } catch (error) {
    if (error.name === "AbortError") throw error;
    throw new ServiceError("Не вдалося зв’язатися із сервісом.", {
      code: "NETWORK",
    });
  }

  const data = await readBody(response);

  if (!response.ok) {
    if (response.status === 401 && auth) {
      clearToken();
    }
    const message =
      (data && typeof data === "object" && data.error) ||
      statusMessage(response.status);
    throw new ServiceError(message, {
      code: response.status === 404 ? "NOT_FOUND" : "HTTP",
      status: response.status,
      errors: data?.details,
    });
  }

  return data;
}
