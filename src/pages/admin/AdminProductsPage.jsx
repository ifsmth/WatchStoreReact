import { useState } from "react";
import { Link } from "react-router";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useCatalog } from "../../contexts/CatalogContext.jsx";
import { catalogService } from "../../services/catalogService.js";
import { errorMessage } from "../../services/ServiceError.js";

export default function AdminProductsPage() {
  const { products, brands, reload, status, error } = useCatalog();
  const [actionError, setActionError] = useState("");

  const handleDelete = async (id) => {
    if (!window.confirm("Ви дійсно хочете видалити цей товар?")) return;
    setActionError("");
    try {
      await catalogService.deleteProduct(id);
      await reload();
    } catch (cause) {
      setActionError(errorMessage(cause));
    }
  };

  const getBrandName = (brandId) => {
    const brand = brands.find((item) => item.id === brandId);
    return brand ? brand.name : "Невідомий";
  };

  return (
    <section>
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">Управління товарами</h2>
          <p className="admin-page-subtitle">
            Список годинників у каталозі магазину, зміна цін та залишків
          </p>
        </div>

        <Link
          to="/admin/products/create"
          className="admin-btn admin-btn-accent"
        >
          <Plus size={16} />
          <span>Додати товар</span>
        </Link>
      </div>

      {(error || actionError) && (
        <div className="admin-alert-error">{actionError || error}</div>
      )}

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th className="admin-th-id">ID</th>
              <th>Назва</th>
              <th>Бренд</th>
              <th>Ціна</th>
              <th>Залишок</th>
              <th>Дії</th>
            </tr>
          </thead>
          <tbody>
            {status === "loading" ? (
              <tr>
                <td colSpan="6" className="admin-empty-cell">
                  Завантаження товарів…
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id}>
                  <td className="admin-cell-id">#{product.id}</td>
                  <td className="admin-cell-name">
                    {product.title || product.name}
                  </td>
                  <td>{product.brand || getBrandName(product.brand_id)}</td>
                  <td className="admin-cell-price">
                    {Number(product.price).toLocaleString("uk-UA")} ₴
                  </td>
                  <td>
                    <span
                      className={`admin-badge ${
                        product.stock > 0
                          ? "admin-badge-success"
                          : "admin-badge-danger"
                      }`}
                    >
                      {product.stock > 0 ? `${product.stock} шт.` : "Немає"}
                    </span>
                  </td>
                  <td>
                    <div className="admin-table-actions">
                      <Link
                        to={`/admin/products/edit/${product.id}`}
                        className="admin-btn admin-btn-secondary admin-btn-sm"
                        title="Редагувати"
                      >
                        <Edit size={14} />
                        <span>Редагувати</span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(product.id)}
                        className="admin-btn admin-btn-danger admin-btn-sm"
                        title="Видалити"
                      >
                        <Trash2 size={14} />
                        <span>Видалити</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
