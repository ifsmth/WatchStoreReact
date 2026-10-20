import { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import {
  ChevronRight,
  Search,
  SlidersHorizontal,
  RefreshCw,
  CheckCircle2,
  Watch,
} from "lucide-react";
import ProductCard from "../components/products/ProductCard.jsx";
import { brandsList, mechanismsList, gendersList } from "../data/products.js";

export default function ProductListPage({ items = [] }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlBrand = searchParams.get("brand");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("Усі бренди");
  const [selectedMechanism, setSelectedMechanism] = useState("Усі механізми");
  const [selectedGender, setSelectedGender] = useState("Всі");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [sortBy, setSortBy] = useState("default");
  const [notification, setNotification] = useState(null);

  // If URL has brand query param, set selected brand
  useEffect(() => {
    if (urlBrand && brandsList.includes(urlBrand)) {
      setSelectedBrand(urlBrand);
    }
  }, [urlBrand]);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    if (brand === "Усі бренди") {
      searchParams.delete("brand");
      setSearchParams(searchParams);
    } else {
      setSearchParams({ brand });
    }
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return items
      .filter((product) => {
        const title = (product.title || product.name || "").toLowerCase();
        const brand = (product.brand || "").toLowerCase();
        const query = searchQuery.toLowerCase().trim();

        const matchesSearch =
          !query || title.includes(query) || brand.includes(query);
        const matchesBrand =
          selectedBrand === "Усі бренди" || product.brand === selectedBrand;
        const matchesMechanism =
          selectedMechanism === "Усі механізми" ||
          product.mechanism === selectedMechanism;
        const matchesGender =
          selectedGender === "Всі" || product.gender === selectedGender;
        const matchesPrice = Number(product.price) <= maxPrice;

        return (
          matchesSearch &&
          matchesBrand &&
          matchesMechanism &&
          matchesGender &&
          matchesPrice
        );
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return Number(a.price) - Number(b.price);
        if (sortBy === "price-desc") return Number(b.price) - Number(a.price);
        if (sortBy === "rating") return (b.rating ?? 0) - (a.rating ?? 0);
        return a.id - b.id;
      });
  }, [
    items,
    searchQuery,
    selectedBrand,
    selectedMechanism,
    selectedGender,
    maxPrice,
    sortBy,
  ]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedBrand("Усі бренди");
    setSelectedMechanism("Усі механізми");
    setSelectedGender("Всі");
    setMaxPrice(100000);
    setSortBy("default");
    searchParams.delete("brand");
    setSearchParams(searchParams);
  };

  return (
    <div className="chrono-container chrono-catalog-page">
      {/* Toast Notification */}
      {notification && (
        <div className="chrono-toast">
          <CheckCircle2 size={16} />
          <span>{notification}</span>
        </div>
      )}

      {/* Breadcrumbs & Header */}
      <div style={{ marginBottom: "2rem" }}>
        <div className="chrono-breadcrumbs">
          <Link to="/" className="chrono-breadcrumb-link">
            Головна
          </Link>
          <ChevronRight size={14} color="#f59e0b" />
          <span style={{ fontWeight: 700, color: "var(--chrono-emerald-950)" }}>
            Каталог годинників
          </span>
        </div>

        <h1
          className="chrono-section-title"
          style={{ textAlign: "left", marginBottom: "0.5rem" }}
        >
          Каталог годинників
        </h1>
        <p
          className="chrono-section-subtitle"
          style={{ textAlign: "left", maxWidth: "42rem" }}
        >
          Знайдіть свій ідеальний наручний годинник серед широкого асортименту
          класичних механічних та кварцових моделей від світових брендів.
        </p>
      </div>

      {/* Filter Controls Header Bar */}
      <div className="chrono-catalog-top-bar">
        {/* Search Box */}
        <div className="chrono-search-box">
          <Search size={16} className="chrono-search-icon" />
          <input
            type="text"
            placeholder="Пошук за назвою або брендом..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="chrono-search-input"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="chrono-search-clear"
              aria-label="Очистити пошук"
            >
              ✕
            </button>
          )}
        </div>

        {/* Counter and Sort Dropdown */}
        <div className="chrono-sort-wrapper">
          <span
            style={{
              fontSize: "0.75rem",
              color: "rgba(6, 78, 59, 0.7)",
              fontWeight: 500,
            }}
          >
            Знайдено:{" "}
            <strong
              style={{ color: "var(--chrono-emerald-950)", fontWeight: 700 }}
            >
              {filteredProducts.length}
            </strong>{" "}
            моделей
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span
              style={{
                fontSize: "0.75rem",
                color: "rgba(6, 78, 59, 0.7)",
                whiteSpace: "nowrap",
              }}
            >
              Сортувати:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="chrono-select"
            >
              <option value="default">За замовчуванням</option>
              <option value="price-asc">Від дешевших до дорогих</option>
              <option value="price-desc">Від дорогих до дешевших</option>
              <option value="rating">За рейтингом</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Layout: Sidebar Filters + Products Grid */}
      <div className="chrono-catalog-layout">
        {/* Left: Sticky Sidebar Filters */}
        <aside>
          <div className="chrono-sidebar-card">
            {/* Header */}
            <div className="chrono-sidebar-head">
              <div className="chrono-sidebar-title">
                <SlidersHorizontal size={16} color="#f59e0b" />
                <span>Фільтри</span>
              </div>
              <button
                type="button"
                onClick={resetFilters}
                className="chrono-reset-btn"
              >
                <RefreshCw size={12} /> Скинути
              </button>
            </div>

            {/* Brand Filter */}
            <div className="chrono-filter-group">
              <label className="chrono-filter-label">Бренд</label>
              <div className="chrono-brand-filter-list">
                {brandsList.map((brand) => (
                  <button
                    key={brand}
                    type="button"
                    onClick={() => handleBrandSelect(brand)}
                    className={`chrono-filter-btn ${
                      selectedBrand === brand ? "active" : ""
                    }`}
                  >
                    <span>{brand}</span>
                    {selectedBrand === brand && (
                      <CheckCircle2 size={14} color="#fbbf24" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Mechanism Filter */}
            <div className="chrono-filter-group">
              <label className="chrono-filter-label">Тип механізму</label>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.375rem",
                }}
              >
                {mechanismsList.map((mech) => (
                  <button
                    key={mech}
                    type="button"
                    onClick={() => setSelectedMechanism(mech)}
                    className={`chrono-filter-btn ${
                      selectedMechanism === mech ? "active" : ""
                    }`}
                  >
                    <span>{mech}</span>
                    {selectedMechanism === mech && (
                      <CheckCircle2 size={14} color="#fbbf24" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Gender Filter */}
            <div className="chrono-filter-group">
              <label className="chrono-filter-label">Стать</label>
              <div className="chrono-gender-grid">
                {gendersList.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setSelectedGender(g)}
                    className={`chrono-gender-btn ${
                      selectedGender === g ? "active" : ""
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Max Price Range Slider */}
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <label className="chrono-filter-label" style={{ margin: 0 }}>
                  Максимальна ціна
                </label>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "var(--chrono-amber-600)",
                  }}
                >
                  {maxPrice.toLocaleString("uk-UA")} ₴
                </span>
              </div>
              <input
                type="range"
                min="4000"
                max="100000"
                step="2000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="chrono-price-range"
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "10px",
                  fontWeight: 600,
                  color: "rgba(6, 78, 59, 0.4)",
                  marginTop: "0.25rem",
                }}
              >
                <span>4 000 ₴</span>
                <span>100 000 ₴</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Right: Products Grid */}
        <section aria-label="Список товарів">
          {filteredProducts.length > 0 ? (
            <div className="chrono-products-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  item={product}
                  onAddToCartFeedback={showNotification}
                />
              ))}
            </div>
          ) : (
            <div className="chrono-empty-box">
              <Watch
                size={64}
                color="rgba(6, 78, 59, 0.2)"
                style={{ marginBottom: "1rem" }}
              />
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "var(--chrono-emerald-950)",
                  marginBottom: "0.5rem",
                }}
              >
                Товарів не знайдено
              </h3>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "rgba(6, 78, 59, 0.6)",
                  marginBottom: "1.5rem",
                  maxWidth: "24rem",
                }}
              >
                На жаль, за обраними параметрами фільтрації нічого не знайдено.
                Спробуйте змінити фільтри або пошуковий запит.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="chrono-btn-primary"
                style={{ fontSize: "0.75rem", padding: "0.75rem 1.5rem" }}
              >
                Скинути всі фільтри
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
