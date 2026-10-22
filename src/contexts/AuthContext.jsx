import { createContext, useContext, useEffect, useState } from "react";
import { initialUsersDB } from "../data/users.js";
import { authService } from "../services/authService.js";
import { clearToken, getToken } from "../services/apiClient.js";
import { isMockData } from "../services/dataSource.js";
import { errorMessage } from "../services/ServiceError.js";

const AuthContext = createContext();

function persistSession(sessionData) {
  try {
    if (sessionData) {
      localStorage.setItem("watch_store_session", JSON.stringify(sessionData));
    } else {
      localStorage.removeItem("watch_store_session");
    }
  } catch {
    // ignore
  }
}

function readSession() {
  try {
    const savedSession = localStorage.getItem("watch_store_session");
    return savedSession ? JSON.parse(savedSession) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [usersDB, setUsersDB] = useState(() => {
    try {
      const savedDB = localStorage.getItem("mock_database_users");
      return savedDB ? JSON.parse(savedDB) : initialUsersDB;
    } catch {
      return initialUsersDB;
    }
  });
  const [user, setUser] = useState(() => readSession());
  const [ready, setReady] = useState(isMockData || !getToken());

  useEffect(() => {
    if (!isMockData) return;
    localStorage.setItem("mock_database_users", JSON.stringify(usersDB));
  }, [usersDB]);

  useEffect(() => {
    if (isMockData) {
      setReady(true);
      return;
    }

    const token = getToken();
    if (!token) {
      setReady(true);
      return;
    }

    let cancelled = false;
    authService
      .me()
      .then((account) => {
        if (cancelled) return;
        setUser(account);
        persistSession(account);
      })
      .catch(() => {
        if (cancelled) return;
        clearToken();
        setUser(null);
        persistSession(null);
      })
      .finally(() => {
        if (!cancelled) setReady(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const applyUser = (account) => {
    setUser(account);
    persistSession(account);
    return { success: true };
  };

  const login = async (emailOrPhone, password, requestedRole = "user") => {
    if (isMockData) {
      const foundUser = usersDB.find(
        (entry) =>
          (entry.email === emailOrPhone ||
            entry.phone_number === emailOrPhone) &&
          entry.password_hash === password,
      );

      if (!foundUser) {
        return { success: false, message: "Невірний email/телефон або пароль." };
      }

      if (foundUser.role !== requestedRole) {
        return {
          success: false,
          message:
            requestedRole === "admin"
              ? "Доступ заборонено. Ви не є адміністратором."
              : "Адміністратори повинні входити через панель управління.",
        };
      }

      const sessionData = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        phone_number: foundUser.phone_number,
        role: foundUser.role,
      };
      setUser(sessionData);
      persistSession(sessionData);
      return { success: true };
    }

    try {
      const account =
        requestedRole === "admin"
          ? await authService.loginAdmin(emailOrPhone, password)
          : await authService.login(emailOrPhone, password);
      return applyUser(account);
    } catch (error) {
      return { success: false, message: errorMessage(error) };
    }
  };

  const register = async (name, email, password, phoneNumber = "") => {
    if (isMockData) {
      const emailExists = usersDB.some((entry) => entry.email === email);
      if (emailExists) {
        return { success: false, message: "Цей email вже зареєстровано." };
      }

      const newUser = {
        id: Date.now(),
        name,
        email,
        phone_number: phoneNumber || "",
        password_hash: password,
        role: "user",
        created_at: new Date().toISOString(),
      };

      setUsersDB((prev) => [...prev, newUser]);
      const sessionData = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone_number: newUser.phone_number,
        role: newUser.role,
      };
      setUser(sessionData);
      persistSession(sessionData);
      return { success: true };
    }

    try {
      const account = await authService.register({
        name,
        email,
        phone_number: phoneNumber,
        password,
      });
      return applyUser(account);
    } catch (error) {
      return { success: false, message: errorMessage(error) };
    }
  };

  const logout = () => {
    if (!isMockData) authService.logout();
    setUser(null);
    persistSession(null);
  };

  const updateUser = async (newName, newPhone) => {
    if (!user) return false;

    if (isMockData) {
      const updatedSession = { ...user, name: newName, phone_number: newPhone };
      setUser(updatedSession);
      persistSession(updatedSession);
      setUsersDB((prevDB) =>
        prevDB.map((entry) =>
          entry.id === user.id
            ? { ...entry, name: newName, phone_number: newPhone }
            : entry,
        ),
      );
      return true;
    }

    try {
      const account = await authService.updateProfile({
        name: newName,
        phone_number: newPhone,
      });
      setUser(account);
      persistSession(account);
      return true;
    } catch {
      return false;
    }
  };

  const updatePassword = async (oldPassword, newPassword) => {
    if (!user) {
      return { success: false, message: "Користувач не авторизований." };
    }

    if (isMockData) {
      const foundUser = usersDB.find((entry) => entry.id === user.id);
      if (!foundUser) {
        return { success: false, message: "Користувача не знайдено." };
      }
      if (foundUser.password_hash !== oldPassword) {
        return { success: false, message: "Невірний старий пароль." };
      }
      setUsersDB((prevDB) =>
        prevDB.map((entry) =>
          entry.id === user.id
            ? { ...entry, password_hash: newPassword }
            : entry,
        ),
      );
      return { success: true };
    }

    try {
      await authService.changePassword({
        old_password: oldPassword,
        new_password: newPassword,
      });
      return { success: true };
    } catch (error) {
      return { success: false, message: errorMessage(error) };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        ready,
        login,
        register,
        logout,
        updateUser,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
