import Section from "../components/ui/Section.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import StockBadge from "../components/products/StockBadge.jsx";
import AppButton from "../components/ui/AppButton.jsx";

export default function ProductDetailsPage({ item }) {
  return (
    <Section id="product-details" title="Деталі товару">
      {item ? (
        <div className="product-details-container">
          <h3>{item.title}</h3>

          <p className="price">
            <strong>{item.price.toLocaleString("uk-UA")} ₴</strong>
          </p>

          <div className="specs">
            <h4>Характеристики:</h4>
            <ul className="product-specs-list">
              <li>
                <strong>Стать:</strong> {item.gender}
              </li>
              <li>
                <strong>Механізм:</strong> {item.mechanism}
              </li>
              <li>
                <strong>Скло:</strong> {item.glass}
              </li>
              <li>
                <strong>Матеріал ремінця:</strong> {item.strap_material}
              </li>
              <li>
                <strong>Водозахист:</strong> {item.water_resistance}
              </li>
              <li>
                <strong>Дата додавання:</strong>{" "}
                {new Date(item.created_at).toLocaleDateString("uk-UA")}
              </li>
            </ul>
          </div>

          <div className="description">
            <h4>Опис:</h4>
            <p className="product-description-text">{item.description}</p>
          </div>

          <div className="status-container">
            <StockBadge stock={item.stock} />
          </div>

          <div className="form-actions">
            <AppButton disabled={item.stock === 0}>Додати до кошика</AppButton>
          </div>
        </div>
      ) : (
        <EmptyState title="Товар не вибрано.">
          <p>
            <a href="#catalog">Повернутися до каталогу</a>
          </p>
        </EmptyState>
      )}
    </Section>
  );
}
