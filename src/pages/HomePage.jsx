import { products } from "../data/products.js";
import Section from "../components/ui/Section.jsx";
import ProductList from "../components/products/ProductList.jsx";

export default function HomePage() {
  return (
    <>
      <Section id="about" title="Про магазин">
        <p>
          Каталог оригінальних наручних годинників від відомих світових брендів.
        </p>
        <p>
          Перегляньте наш асортимент, детальні характеристики моделей та їх
          наявність на складі.
        </p>
      </Section>

      <Section id="catalog" title="Каталог товарів">
        <p>Моделей у каталозі: {products.length}</p>
        <ProductList items={products} />
      </Section>
    </>
  );
}
