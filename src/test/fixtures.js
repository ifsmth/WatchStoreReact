import { products } from "../data/products.js";

// Беремо перший товар для тестів
export const testItem = products[0] || {
  id: 1,
  title: "Casio G-Shock GA-2100-1AER",
  name: "Casio G-Shock GA-2100-1AER",
  price: 4850,
  stock: 12,
  brand: "Casio",
  image:
    "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=600",
};

// Коректні дані, які імітують введення користувача
export const validInput = {
  productId: testItem.id,
  customerName: "Іван Франко",
  phone: "+380501234567",
  quantity: 2,
  comment: "Тестовий коментар",
};

// Запис, збережений сервісом
export const savedOrder = {
  ...validInput,
  id: "ord-test-001",
  totalPrice: 9700,
  total_price: 9700,
  status: "Нове",
  customer: {
    name: "Іван Франко",
    phone: "+380501234567",
    email: "ivan@example.com",
  },
  items: [
    {
      product_id: testItem.id,
      product: testItem,
      title: testItem.title,
      price: testItem.price,
      quantity: 2,
    },
  ],
};
