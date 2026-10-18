import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useCart } from "../contexts/CartContext.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import PageHeading from "../components/ui/PageHeading.jsx";
import AppButton from "../components/ui/AppButton.jsx";

export default function CartPage() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    cartTotal,
    cartCount,
    clearCart,
  } = useCart();
  const { user } = useAuth(); // ДОДАНО
  const navigate = useNavigate(); // ДОДАНО
  const [orderSuccess, setOrderSuccess] = useState(false); // ДОДАНО

  // Якщо кошик порожній
  if (cartItems.length === 0) {
    return (
      <section
        className="empty-state"
        style={{ textAlign: "center", marginTop: "3rem", padding: "4rem 1rem" }}
      >
        <span
          style={{
            fontSize: "3.5rem",
            display: "block",
            marginBottom: "1rem",
            opacity: 0.8,
          }}
        >
          🛒
        </span>
        <h2>Ваш кошик порожній</h2>
        <p style={{ color: "#686861", marginBottom: "2rem" }}>
          Зробіть свою першу покупку, додавши товар з каталогу.
        </p>
        <Link className="app-button app-button-primary" to="/products">
          Перейти до каталогу
        </Link>
      </section>
    );
  }

  // Обробка натискання на кнопку оформлення
  const handleCheckout = () => {
    if (!user) {
      navigate("/login"); // Не залогінений -> на вхід
    } else {
      setOrderSuccess(true);
      clearCart(); // Очищаємо кошик після "успішного" замовлення
    }
  };

  // Екран успішного оформлення
  if (orderSuccess) {
    return (
      <section
        className="empty-state"
        style={{ textAlign: "center", marginTop: "3rem", padding: "4rem 1rem" }}
      >
        <span
          style={{ fontSize: "3.5rem", display: "block", marginBottom: "1rem" }}
        >
          🎉
        </span>
        <h2>Замовлення успішно оформлено!</h2>
        <p style={{ color: "#686861", marginBottom: "2rem" }}>
          Дякуємо за покупку, <strong>{user.name}</strong>. Наш менеджер
          зв'яжеться з Вами найближчим часом для підтвердження.
        </p>
        <Link className="app-button app-button-primary" to="/products">
          Повернутися до каталогу
        </Link>
      </section>
    );
  }

  return (
    <section aria-labelledby="cart-title">
      <PageHeading title="Ваш кошик" />

      <div className="order-editor-layout">
        {/* Список товарів у кошику */}
        <div className="order-form-container" style={{ padding: "1rem" }}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {cartItems.map((item) => (
              <li
                key={item.product.id}
                style={{
                  display: "flex",
                  gap: "1rem",
                  borderBottom: "1px solid #dedbd3",
                  paddingBottom: "1rem",
                  marginBottom: "1rem",
                }}
              >
                {/* Заглушка для фото */}
                <div
                  style={{
                    width: "90px",
                    height: "90px",
                    background: "#e7e8e0",
                    flexShrink: 0,
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <span style={{ fontSize: "2rem" }}>⌚</span>
                </div>

                {/* Інформація про товар */}
                <div style={{ flexGrow: 1 }}>
                  <Link
                    to={`/products/${item.product.id}`}
                    style={{
                      fontWeight: "bold",
                      textDecoration: "none",
                      color: "#1d2224",
                      fontSize: "1.1rem",
                    }}
                  >
                    {item.product.title}
                  </Link>
                  <p
                    style={{
                      margin: "0.25rem 0",
                      color: "#a74f30",
                      fontWeight: "bold",
                    }}
                  >
                    {item.product.price.toLocaleString("uk-UA")} ₴
                  </p>

                  {/* Лічильник кількості */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      marginTop: "0.5rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <AppButton
                        variant="secondary"
                        style={{ padding: "0.2rem 0.6rem" }}
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        -
                      </AppButton>
                      <span
                        style={{
                          fontWeight: "bold",
                          minWidth: "1.5rem",
                          textAlign: "center",
                        }}
                      >
                        {item.quantity}
                      </span>
                      <AppButton
                        variant="secondary"
                        style={{ padding: "0.2rem 0.6rem" }}
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        disabled={item.quantity >= item.product.stock}
                      >
                        +
                      </AppButton>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      style={{
                        color: "#d32f2f",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "0.85rem",
                        textDecoration: "underline",
                      }}
                    >
                      Видалити
                    </button>
                  </div>
                </div>

                {/* Сума за позицію */}
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    textAlign: "right",
                  }}
                >
                  {(item.product.price * item.quantity).toLocaleString("uk-UA")}{" "}
                  ₴
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Підсумок кошика */}
        <div className="order-summary-container">
          <h3>Підсумок</h3>
          <dl>
            <dt>Кількість товарів:</dt>
            <dd>{cartCount} шт.</dd>
            <dt>Загальна сума:</dt>
            <dd
              style={{
                color: "#e2ae79",
                fontSize: "1.6rem",
                marginTop: "0.5rem",
              }}
            >
              {cartTotal.toLocaleString("uk-UA")} ₴
            </dd>
          </dl>

          <AppButton
            className="app-button app-button-primary"
            style={{
              width: "100%",
              marginTop: "2rem",
              backgroundColor: "#e2ae79",
              color: "#253432",
              borderColor: "#e2ae79",
            }}
            onClick={handleCheckout}
          >
            {user ? "Підтвердити покупку" : "Увійдіть для оформлення"}
          </AppButton>
        </div>
      </div>
    </section>
  );
}
