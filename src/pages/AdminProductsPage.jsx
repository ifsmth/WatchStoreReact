import { useState } from "react";
import { Link } from "react-router";
import { products, brands } from "../data/products.js";
import AppButton from "../components/ui/AppButton.jsx";

export default function AdminProductsPage() {
  // Для імітації видалення створимо локальний стан (в реальному проєкті це робить бекенд)
  const [items, setItems] = useState(products);

  const handleDelete = (id) => {
    if (window.confirm("Ви дійсно хочете видалити цей товар?")) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const getBrandName = (brandId) => {
    const brand = brands.find((b) => b.id === brandId);
    return brand ? brand.name : "Невідомий";
  };

  return (
    <section>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h2 style={{ margin: 0, color: "#1d2224" }}>Управління товарами</h2>
        <Link
          to="/admin/products/create"
          className="app-button app-button-primary"
        >
          + Додати товар
        </Link>
      </div>

      <div className="table-scroll">
        <table className="requests-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Назва</th>
              <th>Бренд</th>
              <th>Ціна</th>
              <th>Залишок</th>
              <th>Дії</th>
            </tr>
          </thead>
          <tbody>
            {items.map((product) => (
              <tr key={product.id}>
                <td style={{ color: "#686861", fontWeight: "bold" }}>
                  #{product.id}
                </td>
                <td style={{ fontWeight: "600" }}>{product.title}</td>
                <td>{getBrandName(product.brand_id)}</td>
                <td style={{ color: "#a74f30", fontWeight: "bold" }}>
                  {product.price.toLocaleString("uk-UA")} ₴
                </td>
                <td>
                  <span
                    style={{
                      padding: "0.2rem 0.5rem",
                      borderRadius: "4px",
                      fontSize: "0.8rem",
                      fontWeight: "bold",
                      backgroundColor:
                        product.stock > 0 ? "#f1f8f4" : "#fff9f9",
                      color: product.stock > 0 ? "#27704a" : "#d32f2f",
                    }}
                  >
                    {product.stock > 0 ? `${product.stock} шт.` : "Немає"}
                  </span>
                </td>
                <td>
                  <div className="table-actions">
                    <Link
                      to={`/admin/products/edit/${product.id}`}
                      className="action-btn action-btn-edit"
                    >
                      Редагувати
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="action-btn action-btn-delete"
                    >
                      Видалити
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
