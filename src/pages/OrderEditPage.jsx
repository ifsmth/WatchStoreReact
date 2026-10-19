import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import PageHeading from "../components/ui/PageHeading.jsx";
import AppButton from "../components/ui/AppButton.jsx";
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

    // Зливаємо оновлені дані з існуючим замовленням
    const updatedOrder = {
      ...order,
      customer: {
        ...(order.customer || {}),
        name: formData.customerName,
        phone: formData.phone,
        email: formData.email,
      },
      // Для сумісності залишаємо старі поля, якщо вони були
      customerName: formData.customerName,
      phone: formData.phone,
      comment: formData.comment,
    };

    const result = await updateOrder(order.id, updatedOrder);

    if (result.ok) {
      navigate(`/admin/orders/${order.id}`); // Повертаємось на сторінку деталей
    } else {
      setError("Помилка при збереженні змін.");
    }
  };

  return (
    <section style={{ maxWidth: "600px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <Link
          to={`/admin/orders/${order.id}`}
          style={{
            textDecoration: "none",
            color: "#686861",
            fontSize: "1.5rem",
          }}
        >
          ←
        </Link>
        <PageHeading
          title={`Редагування даних #${order.id.toString().slice(-4)}`}
        />
      </div>

      <div className="order-form-container">
        <form onSubmit={handleSubmit} noValidate>
          {error && (
            <p role="alert" className="field-error">
              {error}
            </p>
          )}

          <div className="form-field">
            <label>Ім'я клієнта *</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label>Телефон</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label>Електронна пошта</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label>Коментар до замовлення</label>
            <textarea
              name="comment"
              rows="4"
              value={formData.comment}
              onChange={handleChange}
            ></textarea>
          </div>

          <div
            className="form-actions"
            style={{
              marginTop: "2.5rem",
              borderTop: "1px solid #dedbd3",
              paddingTop: "1.5rem",
            }}
          >
            <AppButton type="submit" className="app-button app-button-primary">
              Зберегти зміни
            </AppButton>
            <Link
              to={`/admin/orders/${order.id}`}
              className="app-button app-button-secondary"
            >
              Скасувати
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
