import { products } from "../data/products.js";

// Беремо перший-ліпший товар для тестів
export const testItem = products[0] || {
  id: "prod-001",
  title: "Тестовий годинник",
  stock: 5,
};

// Коректні дані, які імітують введення користувача
export const validInput = {
  productId: testItem.id,
  customerName: "Іван Франко",
  phone: "+380501234567",
  quantity: 2,
  comment: "Тестовий коментар",
};

// Запис, нібито збережений сервісом
export const savedOrder = {
  ...validInput,
  id: "ord-test-001",
};
