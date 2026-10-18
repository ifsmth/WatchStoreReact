import { useState } from "react";
import { brands as initialBrands } from "../data/products.js";
import PageHeading from "../components/ui/PageHeading.jsx";
import AppButton from "../components/ui/AppButton.jsx";

export default function AdminBrandsPage() {
  const [brandsList, setBrandsList] = useState(initialBrands);
  const [newBrandName, setNewBrandName] = useState("");

  const handleAddBrand = (e) => {
    e.preventDefault();
    if (!newBrandName.trim()) return;

    const newBrand = {
      id: Date.now(), // Генеруємо тимчасовий ID
      name: newBrandName,
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
    <section style={{ maxWidth: "700px" }}>
      <PageHeading title="Управління брендами" />

      {/* Форма швидкого додавання */}
      <div
        style={{
          background: "#fffefa",
          padding: "1.5rem",
          border: "1px solid #dedbd3",
          borderRadius: "8px",
          marginBottom: "2rem",
        }}
      >
        <h3 style={{ marginTop: 0, marginBottom: "1rem", fontSize: "1rem" }}>
          Додати новий бренд
        </h3>
        <form
          onSubmit={handleAddBrand}
          style={{ display: "flex", gap: "1rem", alignItems: "flex-end" }}
        >
          <div className="form-field" style={{ margin: 0, flexGrow: 1 }}>
            <label htmlFor="brandName">Назва бренду</label>
            <input
              id="brandName"
              type="text"
              value={newBrandName}
              onChange={(e) => setNewBrandName(e.target.value)}
              placeholder="Наприклад: Seiko"
            />
          </div>
          <AppButton type="submit" className="app-button app-button-primary">
            Додати
          </AppButton>
        </form>
      </div>

      {/* Таблиця брендів */}
      <div className="table-scroll">
        <table className="requests-table">
          <thead>
            <tr>
              <th style={{ width: "80px" }}>ID</th>
              <th>Назва бренду</th>
              <th style={{ width: "150px", textAlign: "right" }}>Дії</th>
            </tr>
          </thead>
          <tbody>
            {brandsList.map((brand) => (
              <tr key={brand.id}>
                <td style={{ color: "#686861", fontWeight: "bold" }}>
                  #{brand.id.toString().slice(-4)}
                </td>
                <td style={{ fontWeight: "600" }}>{brand.name}</td>
                <td style={{ textAlign: "right" }}>
                  <button
                    onClick={() => handleDelete(brand.id)}
                    className="action-btn action-btn-delete"
                  >
                    Видалити
                  </button>
                </td>
              </tr>
            ))}
            {brandsList.length === 0 && (
              <tr>
                <td
                  colSpan="3"
                  style={{ textAlign: "center", color: "#686861" }}
                >
                  Брендів не знайдено.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
