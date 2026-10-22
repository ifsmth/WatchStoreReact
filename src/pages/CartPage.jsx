import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ShoppingCart, Trash2, CheckCircle2 } from "lucide-react";
import { useCart } from "../contexts/CartContext.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useOrders } from "../contexts/OrdersContext.jsx";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } =
    useCart();
  const { user } = useAuth();
  const { createOrder } = useOrders();
  const navigate = useNavigate();
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [notification, setNotification] = useState(null);
  const [checkoutError, setCheckoutError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCheckout = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setCheckoutError("");
    setSubmitting(true);
    const result = await createOrder({
      customer_name: user.name,
      customerName: user.name,
      phone: user.phone_number || user.phone || "",
      email: user.email,
      comment: "",
      items: cartItems.map((item) => ({
        product_id: item.product.id,
        quantity: item.quantity,
      })),
    });
    setSubmitting(false);

    if (result.ok) {
      setOrderSuccess(true);
      clearCart();
    } else {
      setCheckoutError(result.message || "Не вдалося оформити замовлення.");
    }
  };

  if (orderSuccess) {
    return (
      <div
        className="chrono-container"
        style={{ maxWidth: "42rem", padding: "4rem 1rem", textAlign: "center" }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "3rem 2rem",
            borderRadius: "var(--chrono-radius-2xl)",
            border: "1px solid var(--chrono-emerald-100)",
            boxShadow: "var(--chrono-shadow-sm)",
          }}
        >
          <CheckCircle2
            size={64}
            color="#10b981"
            style={{ margin: "0 auto 1.5rem auto", display: "block" }}
          />
          <h1
            style={{
              fontSize: "1.75rem",
              fontFamily: "var(--chrono-font-serif)",
              color: "var(--chrono-emerald-950)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "1rem",
            }}
          >
            Замовлення успішно оформлено!
          </h1>
          <p
            style={{
              color: "rgba(6, 78, 59, 0.7)",
              fontSize: "0.875rem",
              lineHeight: 1.6,
              marginBottom: "2rem",
              maxWidth: "28rem",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Дякуємо за покупку, <strong>{user?.name}</strong>! Наш менеджер
            зателефонує вам найближчим часом для підтвердження деталей доставки.
          </p>
          <Link to="/products" className="chrono-btn-primary">
            Повернутися до каталогу
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="chrono-container"
      style={{ maxWidth: "48rem", paddingTop: "3rem", paddingBottom: "4rem" }}
    >
      {/* Toast Notification */}
      {notification && (
        <div className="chrono-toast">
          <CheckCircle2 size={16} />
          <span>{notification}</span>
        </div>
      )}

      <h1
        style={{
          fontSize: "2rem",
          fontWeight: 700,
          color: "var(--chrono-emerald-950)",
          fontFamily: "var(--chrono-font-serif)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginBottom: "2rem",
        }}
      >
        Ваш кошик
      </h1>

      {cartItems.length === 0 ? (
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "3rem 2rem",
            borderRadius: "var(--chrono-radius-2xl)",
            border: "1px solid var(--chrono-emerald-100)",
            textAlign: "center",
          }}
        >
          <ShoppingCart
            size={64}
            color="rgba(6, 78, 59, 0.2)"
            style={{ margin: "0 auto 1rem auto", display: "block" }}
          />
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: 700,
              color: "var(--chrono-emerald-950)",
              marginBottom: "0.5rem",
            }}
          >
            Кошик порожній
          </h2>
          <p
            style={{
              fontSize: "0.875rem",
              color: "rgba(6, 78, 59, 0.6)",
              marginBottom: "1.5rem",
            }}
          >
            Ви ще не додали жодного годинника до вашого замовлення.
          </p>
          <Link to="/products" className="chrono-btn-primary">
            Перейти до каталогу
          </Link>
        </div>
      ) : (
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "1.5rem",
            borderRadius: "var(--chrono-radius-2xl)",
            border: "1px solid var(--chrono-emerald-100)",
            boxShadow: "var(--chrono-shadow-sm)",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {cartItems.map((item) => {
              const product = item.product;
              const img =
                product.images?.[0] ||
                product.image ||
                "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=600";

              return (
                <div
                  key={product.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingBottom: "1rem",
                    borderBottom: "1px solid rgba(209, 250, 229, 0.6)",
                    gap: "1rem",
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <img
                      src={img}
                      alt={product.title || product.name}
                      style={{
                        width: "4rem",
                        height: "4rem",
                        objectFit: "contain",
                        backgroundColor: "var(--chrono-bg-photo)",
                        borderRadius: "var(--chrono-radius-md)",
                        padding: "0.5rem",
                      }}
                    />
                    <div>
                      <h4
                        style={{
                          fontWeight: 700,
                          color: "var(--chrono-emerald-950)",
                          fontSize: "0.875rem",
                          margin: "0 0 0.25rem 0",
                        }}
                      >
                        {product.title || product.name}
                      </h4>
                      <p
                        style={{
                          fontSize: "0.8125rem",
                          color: "var(--chrono-amber-600)",
                          fontWeight: 700,
                          margin: 0,
                        }}
                      >
                        {Number(product.price).toLocaleString("uk-UA")} ₴
                      </p>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1.5rem",
                    }}
                  >
                    {/* Quantity controls */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            product.id,
                            Math.max(1, item.quantity - 1),
                          )
                        }
                        style={{
                          width: "2rem",
                          height: "2rem",
                          borderRadius: "var(--chrono-radius-sm)",
                          border: "1px solid var(--chrono-emerald-200)",
                          backgroundColor: "var(--chrono-emerald-50)",
                          cursor: "pointer",
                          fontWeight: 700,
                        }}
                      >
                        -
                      </button>
                      <span
                        style={{
                          fontWeight: 700,
                          fontSize: "0.875rem",
                          minWidth: "1.5rem",
                          textAlign: "center",
                        }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(product.id, item.quantity + 1)
                        }
                        style={{
                          width: "2rem",
                          height: "2rem",
                          borderRadius: "var(--chrono-radius-sm)",
                          border: "1px solid var(--chrono-emerald-200)",
                          backgroundColor: "var(--chrono-emerald-50)",
                          cursor: "pointer",
                          fontWeight: 700,
                        }}
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(product.id)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#ef4444",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        fontSize: "0.75rem",
                      }}
                      title="Видалити з кошика"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            style={{
              paddingTop: "1.5rem",
              marginTop: "0.5rem",
              borderTop: "2px solid var(--chrono-emerald-100)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontWeight: 700,
                color: "var(--chrono-emerald-950)",
                fontSize: "1rem",
              }}
            >
              Загальна сума:
            </span>
            <span
              style={{
                fontSize: "1.5rem",
                fontWeight: 800,
                color: "var(--chrono-amber-600)",
              }}
            >
              {cartTotal.toLocaleString("uk-UA")} ₴
            </span>
          </div>

          {checkoutError && (
            <p
              role="alert"
              style={{
                color: "#b91c1c",
                marginTop: "1rem",
                fontSize: "0.875rem",
              }}
            >
              {checkoutError}
            </p>
          )}

          <button
            type="button"
            onClick={handleCheckout}
            className="chrono-btn-primary"
            style={{ width: "100%", marginTop: "1.5rem", padding: "1rem" }}
            disabled={submitting}
          >
            {submitting ? "Оформлення..." : "Оформити замовлення"}
          </button>
        </div>
      )}
    </div>
  );
}
