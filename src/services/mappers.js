import { resolveAssetUrl } from "./dataSource.js";

export function formatDateTime(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return `${date.toLocaleDateString("uk-UA")}, ${date.toLocaleTimeString("uk-UA", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
}

export function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString("uk-UA");
}

export function normalizeProduct(raw) {
  if (!raw || typeof raw !== "object") return raw;

  const imagesMeta = (Array.isArray(raw.images) ? raw.images : [])
    .map((image) => {
      if (typeof image === "string") {
        const image_url = resolveAssetUrl(image);
        return { image_url, is_main: false };
      }
      return {
        ...image,
        image_url: resolveAssetUrl(image.image_url),
      };
    })
    .filter((image) => image.image_url);

  const urls = imagesMeta.map((image) => image.image_url);
  const main =
    imagesMeta.find((image) => image.is_main)?.image_url ||
    resolveAssetUrl(raw.image) ||
    urls[0] ||
    "";

  return {
    ...raw,
    id: Number(raw.id),
    brand_id: raw.brand_id == null ? null : Number(raw.brand_id),
    price: Number(raw.price),
    stock: Number(raw.stock ?? 0),
    title: raw.title || raw.name || "",
    name: raw.title || raw.name || "",
    image: main,
    images: urls.length ? urls : main ? [main] : [],
    imagesMeta,
  };
}

export function normalizeOrder(raw) {
  if (!raw || typeof raw !== "object") return raw;

  const customer = raw.customer || {
    name: raw.customerName || raw.customer_name || "",
    phone: raw.phone || "",
    email: raw.email || "",
  };

  const items = (raw.items || []).map((item) => {
    const title = item.title || item.product?.title || item.product?.name || "";
    const price = Number(
      item.price_at_purchase ?? item.product?.price ?? 0,
    );
    return {
      ...item,
      product_id: item.product_id ?? item.product?.id,
      title,
      quantity: Number(item.quantity ?? 1),
      price_at_purchase: price,
      product: {
        id: item.product_id ?? item.product?.id,
        title,
        name: title,
        price,
      },
    };
  });

  return {
    ...raw,
    customer,
    customerName: customer.name,
    phone: customer.phone,
    email: customer.email,
    totalPrice: Number(raw.total_price ?? raw.totalPrice ?? 0),
    total_price: Number(raw.total_price ?? raw.totalPrice ?? 0),
    items,
    comment: raw.comment || "",
  };
}

export function normalizeApplication(raw) {
  if (!raw || typeof raw !== "object") return raw;
  return {
    ...raw,
    id: Number(raw.id),
    contact: raw.contact_information || raw.contact || "",
    contact_information: raw.contact_information || raw.contact || "",
    createdAt: formatDateTime(raw.created_at) || raw.createdAt || "",
  };
}

export function normalizeAccount(raw, fallbackRole) {
  if (!raw || typeof raw !== "object") return raw;
  const role = raw.role || fallbackRole || "user";
  return {
    ...raw,
    role,
    name: raw.name || (role === "admin" ? "Адміністратор" : ""),
    phone_number: raw.phone_number || "",
  };
}
