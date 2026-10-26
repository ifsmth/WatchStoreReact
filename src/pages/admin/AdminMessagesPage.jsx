import { useState } from "react";
import {
  MessageSquare,
  Search,
  Eye,
  Check,
  CheckCheck,
  Trash2,
  X,
  Clock,
  User,
  Phone,
  Mail,
  FileText,
} from "lucide-react";
import { useMessages } from "../../contexts/MessagesContext.jsx";

export default function AdminMessagesPage() {
  const { messages, updateMessageStatus, deleteMessage } = useMessages();
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Фільтрація повідомлень
  const filteredMessages = messages.filter((msg) => {
    const matchesFilter =
      filterStatus === "all"
        ? true
        : filterStatus === "new"
          ? msg.status === "Нове"
          : msg.status === "Опрацьовано";

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      msg.name.toLowerCase().includes(query) ||
      msg.contact.toLowerCase().includes(query) ||
      msg.message.toLowerCase().includes(query) ||
      String(msg.id).includes(query);

    return matchesFilter && matchesSearch;
  });

  const totalCount = messages.length;
  const newCount = messages.filter((m) => m.status === "Нове").length;
  const processedCount = messages.filter(
    (m) => m.status === "Опрацьовано",
  ).length;

  const handleMarkProcessed = (id, e) => {
    if (e) e.stopPropagation();
    updateMessageStatus(id, "Опрацьовано");
    if (selectedMessage && selectedMessage.id === id) {
      setSelectedMessage((prev) => ({ ...prev, status: "Опрацьовано" }));
    }
  };

  const handleDelete = (id, e) => {
    if (e) e.stopPropagation();
    if (window.confirm("Ви дійсно хочете видалити це повідомлення?")) {
      deleteMessage(id);
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage(null);
      }
    }
  };

  return (
    <section>
      {/* Header */}
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">Повідомлення від клієнтів</h2>
          <p className="admin-page-subtitle">
            Заявки та запитання, надіслані через форму зворотного зв'язку на
            сторінці «Про нас»
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="admin-messages-toolbar">
        <div className="admin-filter-tabs">
          <button
            type="button"
            className={`admin-filter-tab ${filterStatus === "all" ? "active" : ""}`}
            onClick={() => setFilterStatus("all")}
          >
            <span>Всі</span>
            <span className="admin-filter-tab-count">{totalCount}</span>
          </button>
          <button
            type="button"
            className={`admin-filter-tab ${filterStatus === "new" ? "active" : ""}`}
            onClick={() => setFilterStatus("new")}
          >
            <span>Нові</span>
            <span className="admin-filter-tab-count warning">{newCount}</span>
          </button>
          <button
            type="button"
            className={`admin-filter-tab ${filterStatus === "processed" ? "active" : ""}`}
            onClick={() => setFilterStatus("processed")}
          >
            <span>Опрацьовані</span>
            <span className="admin-filter-tab-count success">
              {processedCount}
            </span>
          </button>
        </div>

        <div className="admin-search-wrap">
          <Search size={16} className="admin-search-icon" />
          <input
            type="text"
            placeholder="Пошук за клієнтом, контактом або текстом..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="admin-input admin-search-input"
          />
        </div>
      </div>

      {/* Table */}
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th className="admin-th-id">ID</th>
              <th>Дата надходження</th>
              <th>Клієнт</th>
              <th>Контакт для зв'язку</th>
              <th>Повідомлення</th>
              <th>Статус</th>
              <th className="admin-th-actions-lg">Дії</th>
            </tr>
          </thead>
          <tbody>
            {filteredMessages.length > 0 ? (
              filteredMessages.map((msg) => {
                const isNew = msg.status === "Нове";
                return (
                  <tr
                    key={msg.id}
                    className="admin-table-clickable-row"
                    onClick={() => setSelectedMessage(msg)}
                  >
                    <td className="admin-cell-id">
                      #{String(msg.id).slice(-4)}
                    </td>
                    <td className="admin-cell-muted">{msg.createdAt}</td>
                    <td className="admin-cell-name">{msg.name}</td>
                    <td>
                      <span className="admin-cell-contact">{msg.contact}</span>
                    </td>
                    <td>
                      <p className="admin-msg-preview" title={msg.message}>
                        {msg.message}
                      </p>
                    </td>
                    <td>
                      <span
                        className={`admin-badge ${
                          isNew ? "admin-badge-warning" : "admin-badge-success"
                        }`}
                      >
                        {msg.status}
                      </span>
                    </td>
                    <td>
                      <div className="admin-table-actions">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedMessage(msg);
                          }}
                          className="admin-btn admin-btn-secondary admin-btn-sm"
                          title="Переглянути повний текст"
                        >
                          <Eye size={13} />
                          <span>Перегляд</span>
                        </button>

                        {isNew ? (
                          <button
                            type="button"
                            onClick={(e) => handleMarkProcessed(msg.id, e)}
                            className="admin-btn admin-btn-accent admin-btn-sm"
                            title="Позначити як опрацьовано"
                          >
                            <Check size={13} />
                            <span>Опрацювати</span>
                          </button>
                        ) : (
                          <span
                            className="admin-text-processed"
                            title="Заявку опрацьовано"
                          >
                            <CheckCheck size={15} />
                            <span>Опрацьовано</span>
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={(e) => handleDelete(msg.id, e)}
                          className="admin-btn admin-btn-danger admin-btn-sm"
                          title="Видалити"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="admin-empty-cell">
                  Повідомлень у цій категорії не знайдено.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal: Full Message Details */}
      {selectedMessage && (
        <div
          className="admin-modal-backdrop"
          onClick={() => setSelectedMessage(null)}
        >
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-head">
              <div className="admin-modal-head-title">
                <MessageSquare size={20} />
                <h3 className="admin-modal-title">
                  Заявка #{String(selectedMessage.id).slice(-4)}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedMessage(null)}
                className="admin-modal-close"
                title="Закрити"
              >
                <X size={18} />
              </button>
            </div>

            <div className="admin-modal-body">
              {/* Meta bar */}
              <div className="admin-modal-meta">
                <span
                  className={`admin-badge ${
                    selectedMessage.status === "Нове"
                      ? "admin-badge-warning"
                      : "admin-badge-success"
                  }`}
                >
                  {selectedMessage.status}
                </span>

                <div className="admin-modal-date">
                  <Clock size={14} />
                  <span>{selectedMessage.createdAt}</span>
                </div>
              </div>

              {/* Customer Info Card */}
              <div className="admin-modal-info-grid">
                <div className="admin-modal-info-card">
                  <div className="admin-modal-info-label">
                    <User size={13} />
                    <span>Ім'я клієнта</span>
                  </div>
                  <div className="admin-modal-info-val">
                    {selectedMessage.name}
                  </div>
                </div>

                <div className="admin-modal-info-card">
                  <div className="admin-modal-info-label">
                    {selectedMessage.contact.includes("@") ? (
                      <Mail size={13} />
                    ) : (
                      <Phone size={13} />
                    )}
                    <span>Контактні дані</span>
                  </div>
                  <div className="admin-modal-info-val">
                    <a
                      href={
                        selectedMessage.contact.includes("@")
                          ? `mailto:${selectedMessage.contact}`
                          : `tel:${selectedMessage.contact}`
                      }
                      className="admin-modal-contact-link"
                    >
                      {selectedMessage.contact}
                    </a>
                  </div>
                </div>
              </div>

              {/* Message Content */}
              <div className="admin-modal-msg-wrap">
                <div className="admin-modal-msg-label">
                  <FileText size={14} />
                  <span>Текст звернення:</span>
                </div>
                <div className="admin-modal-msg-box">
                  <p className="admin-modal-msg-text">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>
            </div>

            <div className="admin-modal-footer">
              {selectedMessage.status === "Нове" && (
                <button
                  type="button"
                  onClick={() => handleMarkProcessed(selectedMessage.id)}
                  className="admin-btn admin-btn-accent"
                >
                  <Check size={16} />
                  <span>Позначити як опрацьовано</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => setSelectedMessage(null)}
                className="admin-btn admin-btn-secondary"
              >
                Закрити
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
