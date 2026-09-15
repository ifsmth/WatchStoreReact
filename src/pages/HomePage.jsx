import ProductCard from "../components/WatchCard.jsx";
import { products } from "../data/watches.js"; // Шлях до файлу з вашими тестовими даними

export default function HomePage() {
  return (
    <>
      <section id="about" aria-labelledby="about-title">
        <h1 id="about-title">Магазин годинників</h1>
        <p>
          Каталог оригінальних наручних годинників від відомих світових брендів.
        </p>
        <p>
          Перегляньте наш асортимент, детальні характеристики моделей та їх
          наявність на складі.
        </p>
      </section>

      <section id="catalog" aria-labelledby="catalog-title">
        <h2 id="catalog-title">Каталог товарів</h2>
        <p>Моделей у каталозі: {products.length}</p>

        {products.length === 0 ? (
          <p>Товари ще не додано.</p>
        ) : (
          <ul className="products-grid">
            {products.map((item) => (
              <li key={item.id}>
                <ProductCard item={item} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
