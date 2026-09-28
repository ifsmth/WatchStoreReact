import { Link } from "react-router";
import PageHeading from "../components/ui/PageHeading.jsx";

export default function HomePage() {
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
              Переглянути каталог
            </Link>
            <Link className="text-link" to="/orders">
              Мої замовлення →
            </Link>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <span>⌚</span>
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
          <h2>Просте замовлення</h2>
          <p>Оберіть годинник і залиште заявку за кілька кроків.</p>
        </article>
      </section>
    </>
  );
}
