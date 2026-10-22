export const dataSource = import.meta.env.VITE_DATA_SOURCE ?? "api";
export const isMockData = dataSource === "mock";

export const apiBaseUrl = (
  import.meta.env.VITE_API_BASE_URL || "/api/v1"
).replace(/\/+$/, "");

export function getAssetOrigin() {
  const configured = (import.meta.env.VITE_API_ORIGIN || "").replace(/\/+$/, "");
  if (configured) return configured;

  if (/^https?:\/\//i.test(apiBaseUrl)) {
    try {
      return new URL(apiBaseUrl).origin;
    } catch {
      return "";
    }
  }

  return "";
}

export function resolveAssetUrl(path) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path) || path.startsWith("data:")) return path;
  const origin = getAssetOrigin();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${normalized}`;
}
