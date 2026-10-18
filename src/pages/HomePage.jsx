import { Link } from "react-router";
import PageHeading from "../components/ui/PageHeading.jsx";
import ProductCard from "../components/products/ProductCard.jsx"; // Перевір, чи правильний шлях
import { products } from "../data/products.js";

export default function HomePage() {
  // Беремо перші 4 товари для вітрини
  const featuredProducts = products.slice(0, 4);

  return (
    <>
      <section className="hero" aria-labelledby="home-title">
        <div className="hero-content">
          <p className="eyebrow">TIME, REFINED</p>
          <PageHeading title="Годинник, що пасує вашому ритму" />
          <p className="hero-text">
            Добірка надійних моделей для щоденних справ, важливих подій і
            моментів, які хочеться запам’ятати.
          </p>
          <div className="hero-actions">
            <Link className="app-button app-button-primary" to="/products">
              Перейти до каталогу
            </Link>
            <Link className="text-link" to="/about">
              Більше про компанію →
            </Link>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <span>⌚</span>
        </div>
      </section>

      {/* НОВА СЕКЦІЯ: Популярні моделі */}
      <section
        className="popular-products"
        aria-label="Популярні моделі"
        style={{ marginTop: "5rem" }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          Популярні моделі
        </h2>
        <ul className="products-grid">
          {featuredProducts.map((product) => (
            <li key={product.id}>
              {/* onSelect поки залишаємо пустим, щоб просто рендерилась картка без кнопки кошика (або можна передати функцію) */}
              <ProductCard item={product} selected={false} />
            </li>
          ))}
        </ul>
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link className="app-button app-button-secondary" to="/products">
            Дивитись усі годинники
          </Link>
        </div>
      </section>

      <section className="benefits" aria-label="Переваги магазину">
        <article>
          <span>01</span>
          <h2>Перевірені бренди</h2>
          <p>Моделі Casio, Tissot, Orient та інших відомих марок.</p>
        </article>
        <article>
          <span>02</span>
          <h2>Чесна наявність</h2>
          <p>Статус товару видно одразу в каталозі.</p>
        </article>
        <article>
          <span>03</span>
          <h2>Швидка доставка</h2>
          <p>Відправляємо замовлення в день оформлення по всій Україні.</p>
        </article>
      </section>
    </>
  );
}
