import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { ArrowLeft, Save, X } from "lucide-react";
import { useCatalog } from "../contexts/CatalogContext.jsx";
import { catalogService } from "../services/catalogService.js";
import { errorMessage } from "../services/ServiceError.js";

const emptyProduct = {
  title: "", brand_id: "", price: "", gender: "Чоловічий", mechanism: "Кварцовий",
  glass: "Мінеральне", strap_material: "", water_resistance: "", stock: 1, description: "",
};

export default function AdminProductFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, brands, reload, status } = useCatalog();
  const isEditing = Boolean(id);
  const [formData, setFormData] = useState(emptyProduct);
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!formData.brand_id && brands[0]) setFormData((previous) => ({ ...previous, brand_id: brands[0].id }));
  }, [brands, formData.brand_id]);

  useEffect(() => {
    if (!isEditing || status === "loading") return;
    const product = products.find((item) => String(item.id) === String(id));
    if (!product) { setError("Товар не знайдено."); return; }
    setFormData({ ...emptyProduct, ...product });
    setImages(product.imagesMeta || []);
  }, [id, isEditing, products, status]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: ["price", "stock", "brand_id"].includes(name) ? Number(value) : value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true); setError("");
    try {
      const payload = { ...formData, brand_id: Number(formData.brand_id), price: Number(formData.price), stock: Number(formData.stock) };
      const product = isEditing ? await catalogService.updateProduct(id, payload) : await catalogService.createProduct(payload);
      if (selectedFile) await catalogService.uploadProductImage(product.id, selectedFile, images.length === 0);
      await reload();
      navigate("/admin/products");
    } catch (cause) {
      setError(errorMessage(cause));
    } finally { setSaving(false); }
  };

  const removeImage = async (imageId) => {
    try {
      await catalogService.deleteProductImage(id, imageId);
      setImages((previous) => previous.filter((image) => image.id !== imageId));
      await reload();
    } catch (cause) { setError(errorMessage(cause)); }
  };

  return (
    <section className="admin-container-lg">
      <div className="admin-page-header"><div className="admin-page-title-wrap"><Link to="/admin/products" className="admin-back-btn"><ArrowLeft size={18} /></Link><div><h2 className="admin-page-title">{isEditing ? "Редагування товару" : "Створення товару"}</h2><p className="admin-page-subtitle">Заповніть характеристики годинника</p></div></div></div>
      {error && <div className="admin-alert-error">{error}</div>}
      <div className="admin-card"><form onSubmit={handleSubmit}>
        <div className="admin-form-grid-2">
          <div>
            <Field label="Назва годинника *"><input required name="title" value={formData.title} onChange={handleChange} className="admin-input" /></Field>
            <Field label="Бренд *"><select required name="brand_id" value={formData.brand_id} onChange={handleChange} className="admin-select"><option value="">Оберіть бренд</option>{brands.map((brand) => <option key={brand.id} value={brand.id}>{brand.name}</option>)}</select></Field>
            <Field label="Ціна (₴) *"><input required type="number" min="0" step="0.01" name="price" value={formData.price} onChange={handleChange} className="admin-input" /></Field>
            <Field label="Кількість на складі"><input type="number" min="0" name="stock" value={formData.stock} onChange={handleChange} className="admin-input" /></Field>
            <Field label="Стать"><select name="gender" value={formData.gender} onChange={handleChange} className="admin-select"><option>Чоловічий</option><option>Жіночий</option><option>Унісекс</option></select></Field>
          </div>
          <div>
            <Field label="Механізм"><input name="mechanism" value={formData.mechanism} onChange={handleChange} className="admin-input" /></Field>
            <Field label="Скло"><input name="glass" value={formData.glass} onChange={handleChange} className="admin-input" /></Field>
            <Field label="Матеріал ремінця"><input name="strap_material" value={formData.strap_material} onChange={handleChange} className="admin-input" /></Field>
            <Field label="Водозахист"><input name="water_resistance" value={formData.water_resistance} onChange={handleChange} className="admin-input" /></Field>
            <Field label="Фото"><input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => setSelectedFile(event.target.files?.[0] || null)} className="admin-input" /></Field>
          </div>
        </div>
        <Field label="Опис товару"><textarea name="description" rows="4" value={formData.description || ""} onChange={handleChange} className="admin-textarea" /></Field>
        {isEditing && images.length > 0 && <div className="admin-form-group"><label className="admin-form-label">Завантажені фото</label><div className="admin-table-actions">{images.map((image) => <button key={image.id} type="button" onClick={() => removeImage(image.id)} className="admin-btn admin-btn-danger admin-btn-sm">Видалити фото #{image.id}</button>)}</div></div>}
        <div className="admin-form-actions"><button type="submit" className="admin-btn admin-btn-accent" disabled={saving}><Save size={16} /><span>{saving ? "Збереження..." : "Зберегти"}</span></button><Link to="/admin/products" className="admin-btn admin-btn-secondary"><X size={16} /><span>Скасувати</span></Link></div>
      </form></div>
    </section>
  );
}

function Field({ label, children }) { return <div className="admin-form-group"><label className="admin-form-label">{label}</label>{children}</div>; }
