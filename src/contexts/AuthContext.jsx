import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Перевіряємо, чи є вже залогінений користувач у пам'яті
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("watch_store_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (email, password) => {
    if (email && password) {
      // Імітуємо перевірку на адміністратора
      const isAdmin = email === "admin@watch.com" && password === "admin123";

      const userData = {
        id: isAdmin ? 0 : 1,
        name: isAdmin ? "Головний Адмін" : email.split("@")[0],
        email,
        phone: "+380500000000",
        role: isAdmin ? "admin" : "user", // ДОДАЛИ ПОЛЕ РОЛІ
      };

      setUser(userData);
      localStorage.setItem("watch_store_user", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  // Імітація реєстрації
  const register = (name, email, password) => {
    if (name && email && password) {
      const userData = { id: Date.now(), name, email, phone: "" };
      setUser(userData);
      localStorage.setItem("watch_store_user", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  // Вихід
  const logout = () => {
    setUser(null);
    localStorage.removeItem("watch_store_user");
  };

  // Оновлення даних користувача
  const updateUser = (newName, newPhone) => {
    if (user) {
      const updatedUser = { ...user, name: newName, phone: newPhone };
      setUser(updatedUser);
      localStorage.setItem("watch_store_user", JSON.stringify(updatedUser));
      return true;
    }
    return false;
  };

  // Оновлення пароля (імітація)
  const updatePassword = (oldPass, newPass) => {
    if (user) {
      // Тут мала б бути перевірка старого пароля через бекенд.
      // Поки що вважаємо, що якщо пароль введено, то він правильний :)
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, updateUser, updatePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
