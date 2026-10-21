import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { ArrowLeft, Save, X } from "lucide-react";
import { products, brands } from "../data/products.js";

export default function AdminProductFormPage() {
  const { id } = useParams();
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
    alert(
      isEditing ? "Зміни успішно збережено!" : "Новий товар успішно додано!",
    );
    navigate("/admin/products");
  };

  return (
    <section className="admin-container-lg">
      <div className="admin-page-header">
        <div className="admin-page-title-wrap">
          <Link
            to="/admin/products"
            className="admin-back-btn"
            title="Назад до товарів"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h2 className="admin-page-title">
              {isEditing ? "Редагування товару" : "Створення нового товару"}
            </h2>
            <p className="admin-page-subtitle">
              {isEditing
                ? `Редагування параметрів товару #${id}`
                : "Внесіть характеристики нового наручного годинника"}
            </p>
          </div>
        </div>
      </div>

      <div className="admin-card">
        <form onSubmit={handleSubmit}>
          <div className="admin-form-grid-2">
            {/* Ліва колонка */}
            <div>
              <div className="admin-form-group">
                <label className="admin-form-label">Назва годинника *</label>
                <input
                  required
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="admin-input"
                  placeholder="Наприклад: Tissot PRX"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Бренд *</label>
                <select
                  name="brand_id"
                  value={formData.brand_id}
                  onChange={handleChange}
                  className="admin-select"
                >
                  {brands.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Ціна (₴) *</label>
                <input
                  required
                  type="number"
                  min="0"
                  step="0.01"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="admin-input"
                  placeholder="0.00"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Кількість на складі</label>
                <input
                  type="number"
                  min="0"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="admin-input"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Стать</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="admin-select"
                >
                  <option value="Чоловічий">Чоловічий</option>
                  <option value="Жіночий">Жіночий</option>
                  <option value="Унісекс">Унісекс</option>
                </select>
              </div>
            </div>

            {/* Права колонка */}
            <div>
              <div className="admin-form-group">
                <label className="admin-form-label">Тип механізму</label>
                <select
                  name="mechanism"
                  value={formData.mechanism}
                  onChange={handleChange}
                  className="admin-select"
                >
                  <option value="Кварцовий">Кварцовий</option>
                  <option value="Механічний">Механічний</option>
                  <option value="Механічний з автопідзаводом">
                    Механічний з автопідзаводом
                  </option>
                </select>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Тип скла</label>
                <input
                  type="text"
                  name="glass"
                  value={formData.glass}
                  onChange={handleChange}
                  className="admin-input"
                  placeholder="Сапфірове / Мінеральне"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Матеріал ремінця</label>
                <input
                  type="text"
                  name="strap_material"
                  value={formData.strap_material}
                  onChange={handleChange}
                  className="admin-input"
                  placeholder="Натуральна шкіра / Сталь"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Водозахист</label>
                <input
                  type="text"
                  name="water_resistance"
                  value={formData.water_resistance}
                  onChange={handleChange}
                  className="admin-input"
                  placeholder="30m / 50m / 100m"
                />
              </div>
            </div>
          </div>

          {/* Опис на всю ширину */}
          <div className="admin-form-group admin-form-group-mt">
            <label className="admin-form-label">Опис товару</label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="admin-textarea"
              placeholder="Детальний опис товару..."
            />
          </div>

          <div className="admin-form-actions">
            <button type="submit" className="admin-btn admin-btn-accent">
              <Save size={16} />
              <span>{isEditing ? "Зберегти зміни" : "Створити товар"}</span>
            </button>
            <Link
              to="/admin/products"
              className="admin-btn admin-btn-secondary"
            >
              <X size={16} />
              <span>Скасувати</span>
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
