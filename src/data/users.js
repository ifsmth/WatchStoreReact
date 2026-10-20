// Імітація початкових даних таблиці users
export const initialUsersDB = [
  {
    id: 1,
    name: "Головний Адмін",
    email: "admin@watch.com",
    phone_number: "+380500000000",
    password_hash: "admin123", // Для мок-бекенду зберігаємо як текст
    role: "admin", // Додаткове поле для розділення прав доступу на фронті
    created_at: "2026-01-01T10:00:00Z",
  },
  {
    id: 2,
    name: "Тестовий Клієнт",
    email: "client@watch.com",
    phone_number: "+380931234567",
    password_hash: "client123",
    role: "user",
    created_at: "2026-10-15T14:30:00Z",
  },
];
