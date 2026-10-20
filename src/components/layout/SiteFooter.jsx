import { Link, useNavigate } from "react-router";
import { Watch, Phone, Mail, MapPin } from "lucide-react";

export default function SiteFooter() {
  const navigate = useNavigate();

  const handleBrandClick = (brand) => {
    navigate(`/products?brand=${encodeURIComponent(brand)}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="chrono-footer">
      <div className="chrono-container">
        <div className="chrono-footer-grid">
          {/* Column 1: Brand & Socials */}
          <div>
            <div className="chrono-footer-brand-title">
              <Watch size={24} color="#f59e0b" />
              <span>ChronoClassic</span>
            </div>
            <p className="chrono-footer-desc">
              Класика, що не підвладна часу. Офіційний дистриб'ютор оригінальних
              наручних годинників світових брендів.
            </p>
            <div className="chrono-socials">
              <span className="chrono-social-btn" title="Facebook">
                FB
              </span>
              <span className="chrono-social-btn" title="Instagram">
                IG
              </span>
              <span className="chrono-social-btn" title="Telegram">
                TG
              </span>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="chrono-footer-heading">Навігація</h4>
            <ul className="chrono-footer-links">
              <li>
                <Link to="/" className="chrono-footer-link">
                  Головна
                </Link>
              </li>
              <li>
                <Link to="/products" className="chrono-footer-link">
                  Каталог годинників
                </Link>
              </li>
              <li>
                <Link to="/about" className="chrono-footer-link">
                  Про компанію
                </Link>
              </li>
              <li>
                <Link to="/cart" className="chrono-footer-link">
                  Кошик покупок
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Brands */}
          <div>
            <h4 className="chrono-footer-heading">Бренди</h4>
            <ul className="chrono-footer-links">
              {["Tissot", "Seiko", "Orient", "Casio"].map((brand) => (
                <li key={brand}>
                  <button
                    type="button"
                    onClick={() => handleBrandClick(brand)}
                    className="chrono-footer-link"
                  >
                    {brand}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Showroom & Contacts */}
          <div>
            <h4 className="chrono-footer-heading">Шоурум & Контакти</h4>
            <div className="chrono-footer-contact-item">
              <Phone
                size={16}
                color="#f59e0b"
                style={{ marginTop: "2px", flexShrink: 0 }}
              />
              <span>+380 99 123 45 67</span>
            </div>
            <div className="chrono-footer-contact-item">
              <Mail
                size={16}
                color="#f59e0b"
                style={{ marginTop: "2px", flexShrink: 0 }}
              />
              <span>info@chronoclassic.ua</span>
            </div>
            <div className="chrono-footer-contact-item">
              <MapPin
                size={16}
                color="#f59e0b"
                style={{ marginTop: "2px", flexShrink: 0 }}
              />
              <span>
                м. Івано-Франківськ,
                <br />
                вул. Незалежності, 25
              </span>
            </div>
          </div>
        </div>

        <div className="chrono-footer-bottom">
          © 2026 ChronoClassic Ukraine. Усі права захищені. Офіційна гарантія та
          автентичність.
        </div>
      </div>
    </footer>
  );
}
