import { createContext, useContext, useState, useEffect } from "react";
import { initialUsersDB } from "../data/users.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // 1. ІМІТАЦІЯ БАЗИ ДАНИХ (Таблиця users)
  const [usersDB, setUsersDB] = useState(() => {
    const savedDB = localStorage.getItem("mock_database_users");
    return savedDB ? JSON.parse(savedDB) : initialUsersDB;
  });

  // Зберігаємо таблицю користувачів при реєстрації нових
  useEffect(() => {
    localStorage.setItem("mock_database_users", JSON.stringify(usersDB));
  }, [usersDB]);

  // 2. СТАН ПОТОЧНОГО КОРИСТУВАЧА (Поточна сесія)
  const [user, setUser] = useState(() => {
    const savedSession = localStorage.getItem("watch_store_session");
    return savedSession ? JSON.parse(savedSession) : null;
  });

  // ЛОГІКА ВХОДУ (з жорстким розділенням ролей)
  const login = (email, password, requestedRole = "user") => {
    // 1. Шукаємо користувача
    const foundUser = usersDB.find(
      (u) => u.email === email && u.password_hash === password,
    );

    // 2. Якщо не знайдено (невірний логін або пароль)
    if (!foundUser) {
      return { success: false, message: "Невірний email або пароль." };
    }

    // 3. ЖОРСТКЕ РОЗДІЛЕННЯ: Перевіряємо, чи збігається роль користувача з формою, через яку він входить
    if (foundUser.role !== requestedRole) {
      if (requestedRole === "admin") {
        return {
          success: false,
          message: "Доступ заборонено. Ви не є адміністратором.",
        };
      } else {
        return {
          success: false,
          message: "Адміністратори повинні входити через панель управління.",
        };
      }
    }

    // 4. Якщо все добре — створюємо сесію
    const sessionData = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      phone_number: foundUser.phone_number,
      role: foundUser.role,
    };

    setUser(sessionData);
    localStorage.setItem("watch_store_session", JSON.stringify(sessionData));
    return { success: true };
  };

  // 4. ЛОГІКА РЕЄСТРАЦІЇ (Імітація INSERT INTO users ...)
  const register = (name, email, password) => {
    // Перевірка на унікальність email (як UNIQUE у SQL)
    const emailExists = usersDB.some((u) => u.email === email);
    if (emailExists) {
      return { success: false, message: "Цей email вже зареєстровано." };
    }

    // Створюємо запис згідно з SQL структурою
    const newUser = {
      id: Date.now(), // Імітація AUTO_INCREMENT
      name: name,
      email: email,
      phone_number: "", // Дефолтне пусте значення
      password_hash: password, // Імітуємо збереження хешу
      role: "user",
      created_at: new Date().toISOString(), // Імітація CURRENT_TIMESTAMP
    };

    // Оновлюємо "базу"
    setUsersDB((prev) => [...prev, newUser]);

    // Одразу логінимо після успішної реєстрації
    const sessionData = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone_number: newUser.phone_number,
      role: newUser.role,
    };
    setUser(sessionData);
    localStorage.setItem("watch_store_session", JSON.stringify(sessionData));

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("watch_store_session");
  };

  // 5. ОНОВЛЕННЯ ДАНИХ (Імітація UPDATE users SET ...)
  const updateUser = (newName, newPhone) => {
    if (user) {
      // Оновлюємо сесію
      const updatedSession = { ...user, name: newName, phone_number: newPhone };
      setUser(updatedSession);
      localStorage.setItem(
        "watch_store_session",
        JSON.stringify(updatedSession),
      );

      // Оновлюємо запис у "базі"
      setUsersDB((prevDB) =>
        prevDB.map((u) =>
          u.id === user.id
            ? { ...u, name: newName, phone_number: newPhone }
            : u,
        ),
      );
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
