import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { ArrowLeft, Save, X, Trash2 } from "lucide-react";
import { useCatalog } from "../../contexts/CatalogContext.jsx";
import { catalogService } from "../../services/catalogService.js";
import { errorMessage } from "../../services/ServiceError.js";

const emptyProduct = {
  title: "",
  brand_id: "",
  price: "",
  gender: "Чоловічий",
  mechanism: "Кварцовий",
  glass: "Мінеральне",
  strap_material: "",
  water_resistance: "",
  stock: 1,
  description: "",
};

export default function AdminProductFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, brands, reload, status } = useCatalog();
  const isEditing = Boolean(id);
  const [formData, setFormData] = useState(emptyProduct);
  const [images, setImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  // Синхронізація прев'ю-посилань для обраних нових файлів
  useEffect(() => {
    const urls = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [selectedFiles]);

  useEffect(() => {
    if (!formData.brand_id && brands[0])
      setFormData((previous) => ({ ...previous, brand_id: brands[0].id }));
  }, [brands, formData.brand_id]);

  useEffect(() => {
    if (!isEditing || status === "loading") return;
    const product = products.find((item) => String(item.id) === String(id));
    if (!product) {
      setError("Товар не знайдено.");
      return;
    }
    // Очищення значення водонепроникності від літер (наприклад, з "200m" -> "200")
    const rawWr = product.water_resistance;
    const wrDigits =
      typeof rawWr === "string" ? rawWr.replace(/\D+/g, "") : rawWr;

    setFormData({
      ...emptyProduct,
      ...product,
      water_resistance: wrDigits || rawWr || "",
    });
    setImages(product.imagesMeta || []);
  }, [id, isEditing, products, status]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: ["price", "stock", "brand_id"].includes(name)
        ? value === ""
          ? ""
          : Number(value)
        : name === "water_resistance"
          ? value.replace(/\D/g, "")
          : value,
    }));

    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleFilesChange = (event) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;
    setSelectedFiles((prev) => [...prev, ...files]);
    event.target.value = "";
  };

  const removeSelectedFile = (indexToRemove) => {
    setSelectedFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const validate = () => {
    const errors = {};

    if (!formData.title || !String(formData.title).trim()) {
      errors.title = "Вкажіть назву годинника";
    }

    if (!formData.brand_id) {
      errors.brand_id = "Оберіть бренд зі списку";
    }

    if (
      formData.price === "" ||
      formData.price === null ||
      formData.price === undefined
    ) {
      errors.price = "Вкажіть ціну товару";
    } else if (
      Number(formData.price) <= 0 ||
      Number.isNaN(Number(formData.price))
    ) {
      errors.price = "Ціна має бути більшою за 0";
    }

    if (
      formData.stock === "" ||
      formData.stock === null ||
      formData.stock === undefined
    ) {
      errors.stock = "Вкажіть кількість на складі";
    } else if (
      Number(formData.stock) < 0 ||
      Number.isNaN(Number(formData.stock))
    ) {
      errors.stock = "Кількість не може бути від'ємною";
    }

    if (!formData.gender || !String(formData.gender).trim()) {
      errors.gender = "Оберіть стать";
    }

    if (!formData.mechanism || !String(formData.mechanism).trim()) {
      errors.mechanism = "Оберіть механізм";
    }

    if (!formData.glass || !String(formData.glass).trim()) {
      errors.glass = "Вкажіть тип скла";
    }

    if (!formData.strap_material || !String(formData.strap_material).trim()) {
      errors.strap_material = "Вкажіть матеріал ремінця";
    }

    const wrString = String(formData.water_resistance ?? "").trim();
    if (!wrString) {
      errors.water_resistance =
        "Вкажіть водонепроникність (тільки цифри у метрах)";
    } else if (!/^\d+$/.test(wrString)) {
      errors.water_resistance =
        "Водонепроникність має містити виключно цифри (наприклад: 50, 100)";
    }

    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setError("Будь ласка, заповніть усі обов'язкові поля коректно.");
      return;
    }

    setSaving(true);
    setFieldErrors({});

    try {
      const payload = {
        ...formData,
        title: String(formData.title).trim(),
        brand_id: Number(formData.brand_id),
        price: Number(formData.price),
        stock: Number(formData.stock),
        water_resistance: String(formData.water_resistance).trim(),
        glass: String(formData.glass).trim(),
        strap_material: String(formData.strap_material).trim(),
        description: (formData.description || "").trim(),
      };

      const product = isEditing
        ? await catalogService.updateProduct(id, payload)
        : await catalogService.createProduct(payload);

      // Завантаження декількох фото по черзі
      if (selectedFiles.length > 0) {
        for (let i = 0; i < selectedFiles.length; i++) {
          const isMain = i === 0 && images.length === 0;
          await catalogService.uploadProductImage(
            product.id,
            selectedFiles[i],
            isMain,
          );
        }
      }

      await reload();
      navigate("/admin/products");
    } catch (cause) {
      setError(errorMessage(cause));
    } finally {
      setSaving(false);
    }
  };

  const removeImage = async (imageId) => {
    try {
      await catalogService.deleteProductImage(id, imageId);
      setImages((previous) =>
        previous.filter((image) => (image.id ?? image) !== imageId),
      );
      await reload();
    } catch (cause) {
      setError(errorMessage(cause));
    }
  };

  return (
    <section className="admin-container-lg">
      <div className="admin-page-header">
        <div className="admin-page-title-wrap">
          <Link to="/admin/products" className="admin-back-btn">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h2 className="admin-page-title">
              {isEditing ? "Редагування товару" : "Створення товару"}
            </h2>
            <p className="admin-page-subtitle">
              Заповніть характеристики годинника
            </p>
          </div>
        </div>
      </div>

      {error && <div className="admin-alert-error">{error}</div>}

      <div className="admin-card">
        <form onSubmit={handleSubmit} noValidate>
          <div className="admin-form-grid-2">
            <div>
              <Field label="Назва годинника *" error={fieldErrors.title}>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`admin-input ${
                    fieldErrors.title ? "admin-input-error" : ""
                  }`}
                  placeholder="Наприклад: Casio G-Shock GA-2100"
                />
              </Field>

              <Field label="Бренд *" error={fieldErrors.brand_id}>
                <select
                  name="brand_id"
                  value={formData.brand_id}
                  onChange={handleChange}
                  className={`admin-select ${
                    fieldErrors.brand_id ? "admin-input-error" : ""
                  }`}
                >
                  <option value="">Оберіть бренд</option>
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Ціна (₴) *" error={fieldErrors.price}>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className={`admin-input ${
                    fieldErrors.price ? "admin-input-error" : ""
                  }`}
                  placeholder="0.00"
                />
              </Field>

              <Field label="Кількість на складі *" error={fieldErrors.stock}>
                <input
                  type="number"
                  min="0"
                  step="1"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className={`admin-input ${
                    fieldErrors.stock ? "admin-input-error" : ""
                  }`}
                  placeholder="0"
                />
              </Field>

              <Field label="Стать *" error={fieldErrors.gender}>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`admin-select ${
                    fieldErrors.gender ? "admin-input-error" : ""
                  }`}
                >
                  <option value="Чоловічий">Чоловічий</option>
                  <option value="Жіночий">Жіночий</option>
                  <option value="Унісекс">Унісекс</option>
                </select>
              </Field>
            </div>

            <div>
              <Field label="Механізм *" error={fieldErrors.mechanism}>
                <select
                  name="mechanism"
                  value={formData.mechanism}
                  onChange={handleChange}
                  className={`admin-select ${
                    fieldErrors.mechanism ? "admin-input-error" : ""
                  }`}
                >
                  <option value="Кварцовий">Кварцовий</option>
                  <option value="Механічний">Механічний</option>
                </select>
              </Field>

              <Field label="Скло *" error={fieldErrors.glass}>
                <input
                  name="glass"
                  value={formData.glass}
                  onChange={handleChange}
                  className={`admin-input ${
                    fieldErrors.glass ? "admin-input-error" : ""
                  }`}
                  placeholder="Наприклад: Сапфірове, Мінеральне"
                />
              </Field>

              <Field
                label="Матеріал ремінця *"
                error={fieldErrors.strap_material}
              >
                <input
                  name="strap_material"
                  value={formData.strap_material}
                  onChange={handleChange}
                  className={`admin-input ${
                    fieldErrors.strap_material ? "admin-input-error" : ""
                  }`}
                  placeholder="Наприклад: Натуральна шкіра, Сталь, Полімер"
                />
              </Field>

              <Field
                label="Водонепроникність (м) *"
                error={fieldErrors.water_resistance}
              >
                <input
                  type="number"
                  min="0"
                  step="1"
                  name="water_resistance"
                  value={formData.water_resistance}
                  onChange={handleChange}
                  className={`admin-input ${
                    fieldErrors.water_resistance ? "admin-input-error" : ""
                  }`}
                  placeholder="Тільки число (наприклад: 50, 100, 200)"
                />
              </Field>

              <Field label="Додати фото (можна обрати декілька)">
                <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFilesChange}
                  className="admin-input"
                />
                <span className="admin-file-upload-hint">
                  Підтримуються формати JPG, PNG, WebP. Можна обрати декілька
                  фото.
                </span>
              </Field>
            </div>
          </div>

          {/* Прев'ю нових обраних файлів перед збереженням */}
          {selectedFiles.length > 0 && (
            <div className="admin-form-group admin-form-group-mt">
              <label className="admin-form-label">
                Обрані нові фото до завантаження ({selectedFiles.length})
              </label>
              <div className="admin-photo-grid">
                {selectedFiles.map((file, index) => (
                  <div
                    key={`${file.name}-${index}`}
                    className="admin-photo-card"
                  >
                    <div className="admin-photo-thumb-wrap">
                      <img
                        src={previewUrls[index]}
                        alt={file.name}
                        className="admin-photo-img"
                      />
                      {index === 0 && images.length === 0 && (
                        <span className="admin-photo-badge">Головне</span>
                      )}
                    </div>
                    <div className="admin-photo-meta" title={file.name}>
                      {file.name}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSelectedFile(index)}
                      className="admin-photo-delete-btn"
                    >
                      <Trash2 size={13} />
                      <span>Прибрати</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Field label="Опис товару (необов'язково)">
            <textarea
              name="description"
              rows="4"
              value={formData.description || ""}
              onChange={handleChange}
              className="admin-textarea"
              placeholder="Детальний опис товару, дизайн, особливості та гарантія..."
            />
          </Field>

          {/* Завантажені фото товару з прев'ю на блоці видалення */}
          {isEditing && (
            <div className="admin-form-group">
              <label className="admin-form-label">
                Завантажені фото товару ({images.length})
              </label>
              {images.length === 0 ? (
                <p className="admin-file-empty-hint">
                  У цього товару ще немає збережених фото.
                </p>
              ) : (
                <div className="admin-photo-grid">
                  {images.map((image, index) => (
                    <div
                      key={image.id ?? `img-${index}`}
                      className="admin-photo-card"
                    >
                      <div className="admin-photo-thumb-wrap">
                        <img
                          src={image.image_url}
                          alt={`Фото товару #${image.id ?? index + 1}`}
                          className="admin-photo-img"
                        />
                        {image.is_main && (
                          <span className="admin-photo-badge">Головне</span>
                        )}
                      </div>
                      <div className="admin-photo-meta">
                        {image.id ? `ID #${image.id}` : `Фото #${index + 1}`}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImage(image.id ?? index)}
                        className="admin-photo-delete-btn"
                        title="Видалити це фото товару"
                      >
                        <Trash2 size={13} />
                        <span>Видалити</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="admin-form-actions">
            <button
              type="submit"
              className="admin-btn admin-btn-accent"
              disabled={saving}
            >
              <Save size={16} />
              <span>{saving ? "Збереження..." : "Зберегти"}</span>
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

function Field({ label, error, children }) {
  return (
    <div className="admin-form-group">
      <label className="admin-form-label">{label}</label>
      {children}
      {error && <span className="admin-field-error">{error}</span>}
    </div>
  );
}
