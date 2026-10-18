import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { products, brands } from "../data/products.js";
import PageHeading from "../components/ui/PageHeading.jsx";
import AppButton from "../components/ui/AppButton.jsx";

export default function AdminProductFormPage() {
  const { id } = useParams(); // Якщо id є, значить це редагування
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  // Початкові пусті дані форми
  const [formData, setFormData] = useState({
    title: "",
    brand_id: brands[0]?.id || 1,
    price: "",
    gender: "Чоловічий",
    mechanism: "Кварцовий",
    glass: "Мінеральне",
    strap_material: "",
    water_resistance: "",
    stock: 1,
    description: "",
  });

  // Якщо це редагування, заповнюємо форму даними товару
  useEffect(() => {
    if (isEditing) {
      const product = products.find((p) => p.id === Number(id));
      if (product) {
        setFormData({ ...product });
      }
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "stock" || name === "brand_id"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Тут в майбутньому буде запит до бекенду
    alert(
      isEditing ? "Зміни успішно збережено!" : "Новий товар успішно додано!",
    );
    navigate("/admin/products");
  };

  return (
    <section style={{ maxWidth: "800px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <Link
          to="/admin/products"
          style={{
            textDecoration: "none",
            color: "#686861",
            fontSize: "1.5rem",
          }}
        >
          ←
        </Link>
        <PageHeading
          title={isEditing ? "Редагування товару" : "Створення нового товару"}
        />
      </div>

      <div className="order-form-container">
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.5rem",
            }}
          >
            {/* Ліва колонка */}
            <div>
              <div className="form-field">
                <label>Назва годинника *</label>
                <input
                  required
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              <div className="form-field">
                <label>Бренд *</label>
                <select
                  name="brand_id"
                  value={formData.brand_id}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "0.7rem",
                    border: "1px solid #a9aaa3",
                  }}
                >
                  {brands.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label>Ціна (₴) *</label>
                <input
                  required
                  type="number"
                  min="0"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>

              <div className="form-field">
                <label>Залишок на складі (шт) *</label>
                <input
                  required
                  type="number"
                  min="0"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                />
              </div>

              <div className="form-field">
                <label>Стать</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "0.7rem",
                    border: "1px solid #a9aaa3",
                  }}
                >
                  <option value="Чоловічий">Чоловічий</option>
                  <option value="Жіночий">Жіночий</option>
                  <option value="Унісекс">Унісекс</option>
                </select>
              </div>
            </div>

            {/* Права колонка */}
            <div>
              <div className="form-field">
                <label>Механізм</label>
                <input
                  type="text"
                  name="mechanism"
                  value={formData.mechanism}
                  onChange={handleChange}
                  placeholder="Наприклад: Кварцовий"
                />
              </div>

              <div className="form-field">
                <label>Скло</label>
                <input
                  type="text"
                  name="glass"
                  value={formData.glass}
                  onChange={handleChange}
                  placeholder="Наприклад: Сапфірове"
                />
              </div>

              <div className="form-field">
                <label>Матеріал ремінця</label>
                <input
                  type="text"
                  name="strap_material"
                  value={formData.strap_material}
                  onChange={handleChange}
                />
              </div>

              <div className="form-field">
                <label>Водозахист</label>
                <input
                  type="text"
                  name="water_resistance"
                  value={formData.water_resistance}
                  onChange={handleChange}
                  placeholder="Наприклад: 5 ATM"
                />
              </div>
            </div>
          </div>

          <div
            className="form-field"
            style={{ maxWidth: "100%", marginTop: "1rem" }}
          >
            <label>Опис товару</label>
            <textarea
              name="description"
              rows="5"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div
            className="form-actions"
            style={{
              marginTop: "2rem",
              borderTop: "1px solid #dedbd3",
              paddingTop: "1.5rem",
            }}
          >
            <AppButton type="submit" className="app-button app-button-primary">
              {isEditing ? "Зберегти зміни" : "Створити товар"}
            </AppButton>
            <Link
              to="/admin/products"
              className="app-button app-button-secondary"
            >
              Скасувати
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
