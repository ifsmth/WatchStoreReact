// Тимчасовий фронтенд-аналог таблиці product_images.
// Після підключення API цей масив можна замінити відповіддю сервера без змін
// у компонентах: кожен запис відповідає одному рядку майбутньої таблиці.
export const productPhotos = [
  {
    id: 1,
    product_id: 1,
    image_url: "/images/products/casio-ga-2100-main.jpg",
    is_main: true,
  },
  {
    id: 2,
    product_id: 1,
    image_url: "/images/products/casio-ga-2100-side.jpg",
    is_main: false,
  },
  {
    id: 3,
    product_id: 2,
    image_url: "/images/products/orient-bambino-main.jpg",
    is_main: true,
  },
  {
    id: 4,
    product_id: 2,
    image_url: "/images/products/orient-bambino-detail.jpg",
    is_main: false,
  },
  {
    id: 5,
    product_id: 3,
    image_url: "/images/products/tissot-prx-main.jpg",
    is_main: true,
  },
  {
    id: 6,
    product_id: 3,
    image_url: "/images/products/tissot-prx-side.jpg",
    is_main: false,
  },
  {
    id: 7,
    product_id: 4,
    image_url: "/images/products/daniel-wellington-main.jpg",
    is_main: true,
  },
  {
    id: 8,
    product_id: 4,
    image_url: "/images/products/daniel-wellington-detail.jpg",
    is_main: false,
  },
  {
    id: 9,
    product_id: 5,
    image_url: "/images/products/michael-kors-main.jpg",
    is_main: true,
  },
  {
    id: 10,
    product_id: 5,
    image_url: "/images/products/michael-kors-detail.jpg",
    is_main: false,
  },
];

export function getProductPhotos(productId) {
  return productPhotos.filter((photo) => photo.product_id === productId);
}

export function getMainProductPhoto(productId) {
  return getProductPhotos(productId).find((photo) => photo.is_main) ?? null;
}
