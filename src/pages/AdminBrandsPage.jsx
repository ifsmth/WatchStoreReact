import { useState } from "react";
import { Plus, Trash2, Tag } from "lucide-react";
import { brands as initialBrands } from "../data/products.js";

export default function AdminBrandsPage() {
  const [brandsList, setBrandsList] = useState(initialBrands);
  const [newBrandName, setNewBrandName] = useState("");

  const handleAddBrand = (e) => {
    e.preventDefault();
    if (!newBrandName.trim()) return;

    const newBrand = {
      id: Date.now(),
      name: newBrandName.trim(),
    };

    setBrandsList([...brandsList, newBrand]);
    setNewBrandName("");
  };

  const handleDelete = (id) => {
    if (
      window.confirm(
        "Ви дійсно хочете видалити цей бренд? Це може вплинути на товари, прив'язані до нього.",
      )
    ) {
      setBrandsList(brandsList.filter((b) => b.id !== id));
    }
  };

  return (
    <section className="admin-container-md">
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">Управління брендами</h2>
          <p className="admin-page-subtitle">
            Додавання нових марок та редагування списку дистрибуції
          </p>
        </div>
      </div>

      {/* Форма швидкого додавання */}
      <div className="admin-card">
        <div className="admin-card-head">
          <h3 className="admin-card-title">
            <Tag size={16} />
            Додати новий бренд
          </h3>
        </div>

        <form onSubmit={handleAddBrand} className="admin-quick-add">
          <div className="admin-form-group admin-quick-add-group">
            <label htmlFor="brandName" className="admin-form-label">
              Назва бренду *
            </label>
            <input
              id="brandName"
              type="text"
              value={newBrandName}
              onChange={(e) => setNewBrandName(e.target.value)}
              placeholder="Наприклад: Seiko"
              className="admin-input"
              required
            />
          </div>
          <button type="submit" className="admin-btn admin-btn-accent">
            <Plus size={16} />
            <span>Додати</span>
          </button>
        </form>
      </div>

      {/* Таблиця брендів */}
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th className="admin-th-id">ID</th>
              <th>Назва бренду</th>
              <th className="admin-th-actions">Дії</th>
            </tr>
          </thead>
          <tbody>
            {brandsList.map((brand) => (
              <tr key={brand.id}>
                <td className="admin-cell-id">#{String(brand.id).slice(-4)}</td>
                <td className="admin-cell-name">{brand.name}</td>
                <td className="admin-cell-right">
                  <button
                    type="button"
                    onClick={() => handleDelete(brand.id)}
                    className="admin-btn admin-btn-danger admin-btn-sm"
                  >
                    <Trash2 size={13} />
                    <span>Видалити</span>
                  </button>
                </td>
              </tr>
            ))}
            {brandsList.length === 0 && (
              <tr>
                <td colSpan="3" className="admin-empty-cell">
                  Брендів поки немає.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
