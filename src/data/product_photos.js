import { products } from "./products.js";

export const productPhotos = products.flatMap((product) =>
  product.images.map((imgUrl, index) => ({
    id: Number(`${product.id}${index + 1}`),
    product_id: product.id,
    image_url: imgUrl,
    is_main: index === 0,
  })),
);

export function getProductPhotos(productId) {
  const pId = Number(productId);
  return productPhotos.filter((photo) => photo.product_id === pId);
}

export function getMainProductPhoto(productId) {
  const pId = Number(productId);
  return (
    productPhotos.find((photo) => photo.product_id === pId && photo.is_main) ??
    productPhotos.find((photo) => photo.product_id === pId) ??
    null
  );
}
