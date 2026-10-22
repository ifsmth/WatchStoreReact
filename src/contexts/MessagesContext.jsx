import { createContext, useContext, useEffect, useState } from "react";
import { applicationService } from "../services/applicationService.js";
import { isMockData } from "../services/dataSource.js";
import { errorMessage } from "../services/ServiceError.js";
import { useAuth } from "./AuthContext.jsx";

const STORAGE_KEY = "chronoclassic_user_messages";

const INITIAL_MESSAGES = [
  {
    id: 1,
    name: "Олена Коваль",
    contact: "+380 67 111 22 33",
    message:
      "Доброго дня! Чи очікується нова партія годинників Tissot PRX 35mm у золотому корпусі найближчим часом? Хотіла б оформити передзамовлення.",
    status: "Нове",
    createdAt: "21.10.2026, 10:15",
  },
  {
    id: 2,
    name: "Михайло Дмитренко",
    contact: "misha.d@gmail.com",
    message:
      "Підкажіть, будь ласка, чи є можливість приміряти годинник Seiko Presage Cocktail Time безпосередньо в шоурумі в Івано-Франківську цієї суботи?",
    status: "Нове",
    createdAt: "20.10.2026, 17:40",
  },
  {
    id: 3,
    name: "Андрій Василенко",
    contact: "+380 50 999 88 77",
    message:
      "Цікавить гарантійне обслуговування механіки Orient Bambino. Які орієнтовні терміни проведення репасажу у вашому сервісному центрі?",
    status: "Опрацьовано",
    createdAt: "19.10.2026, 14:20",
  },
  {
    id: 4,
    name: "Катерина Мельник",
    contact: "kateryna.m@outlook.com",
    message:
      "Шукаю класичний жіночий годинник на подарунок з перламутровим циферблатом. Бюджет до 25 000 грн. Що можете порекомендувати?",
    status: "Опрацьовано",
    createdAt: "18.10.2026, 12:05",
  },
];

const MessagesContext = createContext(null);

function readStoredMessages() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // fallback
  }
  return INITIAL_MESSAGES;
}

export function MessagesProvider({ children }) {
  const { user, ready } = useAuth();
  const [messages, setMessages] = useState(() =>
    isMockData ? readStoredMessages() : [],
  );
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isMockData) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (err) {
      console.error("Помилка збереження повідомлень:", err);
    }
  }, [messages]);

  useEffect(() => {
    if (isMockData || !ready || user?.role !== "admin") {
      if (!isMockData && user?.role !== "admin") setMessages([]);
      return;
    }

    let cancelled = false;
    applicationService
      .list()
      .then((rows) => {
        if (!cancelled) {
          setMessages(rows);
          setError("");
        }
      })
      .catch((cause) => {
        if (!cancelled) setError(errorMessage(cause));
      });

    return () => {
      cancelled = true;
    };
  }, [user?.role, ready]);

  const addMessage = async ({ name, contact, message }) => {
    if (isMockData) {
      const now = new Date();
      const formattedDate = `${now.toLocaleDateString("uk-UA")}, ${now.toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" })}`;
      const newMsg = {
        id: Date.now(),
        name: name.trim(),
        contact: contact.trim(),
        message: message.trim(),
        status: "Нове",
        createdAt: formattedDate,
      };
      setMessages((prev) => [newMsg, ...prev]);
      return newMsg;
    }

    const created = await applicationService.create({
      name: name.trim(),
      contact: contact.trim(),
      message: message.trim(),
    });
    setMessages((prev) => [created, ...prev]);
    return created;
  };

  const updateMessageStatus = async (id, newStatus = "Опрацьовано") => {
    if (isMockData) {
      setMessages((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item,
        ),
      );
      return;
    }

    const updated = await applicationService.updateStatus(id, newStatus);
    setMessages((prev) =>
      prev.map((item) => (item.id === id ? updated : item)),
    );
    return updated;
  };

  const deleteMessage = async (id) => {
    if (!isMockData) {
      await applicationService.delete(id);
    }
    setMessages((prev) => prev.filter((item) => item.id !== id));
  };

  const newCount = messages.filter((item) => item.status === "Нове").length;

  return (
    <MessagesContext.Provider
      value={{
        messages,
        addMessage,
        updateMessageStatus,
        deleteMessage,
        newCount,
        error,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
}

export function useMessages() {
  const ctx = useContext(MessagesContext);
  if (!ctx) {
    throw new Error("useMessages must be used within a MessagesProvider");
  }
  return ctx;
}
