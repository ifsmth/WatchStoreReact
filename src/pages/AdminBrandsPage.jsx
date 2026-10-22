import { useState } from "react";
import { Plus, Trash2, Tag } from "lucide-react";
import { useCatalog } from "../contexts/CatalogContext.jsx";
import { catalogService } from "../services/catalogService.js";
import { errorMessage } from "../services/ServiceError.js";

export default function AdminBrandsPage() {
  const { brands, reload, status, error } = useCatalog();
  const [newBrandName, setNewBrandName] = useState("");
  const [actionError, setActionError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleAddBrand = async (event) => {
    event.preventDefault();
    const name = newBrandName.trim();
    if (!name) return;
    setSaving(true);
    setActionError("");
    try {
      await catalogService.createBrand(name);
      setNewBrandName("");
      await reload();
    } catch (cause) {
      setActionError(errorMessage(cause));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Ви дійсно хочете видалити цей бренд?")) return;
    setActionError("");
    try {
      await catalogService.deleteBrand(id);
      await reload();
    } catch (cause) {
      setActionError(errorMessage(cause));
    }
  };

  return (
    <section className="admin-container-md">
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">Управління брендами</h2>
          <p className="admin-page-subtitle">
            Додавання та видалення брендів каталогу
          </p>
        </div>
      </div>
      {(error || actionError) && (
        <div className="admin-alert-error">{actionError || error}</div>
      )}
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
              onChange={(event) => setNewBrandName(event.target.value)}
              className="admin-input"
              required
            />
          </div>
          <button
            type="submit"
            className="admin-btn admin-btn-accent"
            disabled={saving}
          >
            <Plus size={16} />
            <span>{saving ? "Додавання..." : "Додати"}</span>
          </button>
        </form>
      </div>
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
            {status === "loading" && (
              <tr>
                <td colSpan="3" className="admin-empty-cell">
                  Завантаження...
                </td>
              </tr>
            )}
            {status !== "loading" &&
              brands.map((brand) => (
                <tr key={brand.id}>
                  <td className="admin-cell-id">#{brand.id}</td>
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
            {status !== "loading" && brands.length === 0 && (
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
