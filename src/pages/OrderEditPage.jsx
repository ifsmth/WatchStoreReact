import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { ArrowLeft, Save, X } from "lucide-react";
import { useOrders } from "../contexts/OrdersContext.jsx";
import NotFoundPage from "./NotFoundPage.jsx";

export default function OrderEditPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { orders, updateOrder } = useOrders();
  const [error, setError] = useState("");

  const order = orders.find((entry) => String(entry.id) === String(orderId));

  // Локальний стан для контактних даних клієнта
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    email: "",
    comment: "",
  });

  useEffect(() => {
    if (order) {
      setFormData({
        customerName: order.customer?.name || order.customerName || "",
        phone: order.customer?.phone || order.phone || "",
        email: order.customer?.email || order.email || "",
        comment: order.comment || "",
      });
    }
  }, [order]);

  if (!order) return <NotFoundPage title="Замовлення не знайдено" />;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.customerName.trim()) {
      setError("Ім'я клієнта є обов'язковим полем.");
      return;
    }

    const updatedOrder = {
      ...order,
      customer: {
        ...(order.customer || {}),
        name: formData.customerName,
        phone: formData.phone,
        email: formData.email,
      },
      customerName: formData.customerName,
      phone: formData.phone,
      comment: formData.comment,
    };

    const result = await updateOrder(order.id, updatedOrder);

    if (result.ok) {
      navigate(`/admin/orders/${order.id}`);
    } else {
      setError("Помилка при збереженні змін.");
    }
  };

  return (
    <section className="admin-container-sm">
      <div className="admin-page-header">
        <div className="admin-page-title-wrap">
          <Link
            to={`/admin/orders/${order.id}`}
            className="admin-back-btn"
            title="Назад до деталей замовлення"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h2 className="admin-page-title">
              Редагування #{order.id.toString().slice(-4)}
            </h2>
            <p className="admin-page-subtitle">
              Зміна контактної інформації отримувача
            </p>
          </div>
        </div>
      </div>

      <div className="admin-card">
        {error && <div className="admin-alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label className="admin-form-label">Ім'я клієнта *</label>
            <input
              required
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              className="admin-input"
              placeholder="Іван Франко"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Телефон клієнта</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="admin-input"
              placeholder="+380..."
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="admin-input"
              placeholder="client@example.com"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Коментар до замовлення</label>
            <textarea
              name="comment"
              rows="3"
              value={formData.comment}
              onChange={handleChange}
              className="admin-textarea"
              placeholder="Особливі побажання щодо доставки або часу дзвінка..."
            />
          </div>

          <div className="admin-form-actions">
            <button type="submit" className="admin-btn admin-btn-accent">
              <Save size={16} />
              <span>Зберегти зміни</span>
            </button>
            <Link
              to={`/admin/orders/${order.id}`}
              className="admin-btn admin-btn-secondary"
            >
              <X size={16} />
              <span>Скасувати</span>
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
