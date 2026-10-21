import { useState } from "react";
import { Link } from "react-router";
import {
  ChevronRight,
  ChevronDown,
  Sparkles,
  Target,
  Eye,
  Heart,
  Building,
  ShieldCheck,
  Award,
  Settings,
  User,
  Star,
  HelpCircle,
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle2,
} from "lucide-react";

import { useMessages } from "../contexts/MessagesContext.jsx";

export default function AboutPage() {
  const { addMessage } = useMessages();
  const [activeFaq, setActiveFaq] = useState(null);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    message: "",
  });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim() && formData.contact.trim()) {
      addMessage({
        name: formData.name,
        contact: formData.contact,
        message: formData.message,
      });
    }
    setContactSubmitted(true);
    setFormData({ name: "", contact: "", message: "" });
    setTimeout(() => setContactSubmitted(false), 5000);
  };

  const faqItems = [
    {
      q: "Чи є ви офіційним дистриб'ютором?",
      a: "Так, ChronoClassic є офіційним авторизованим продавцем брендів Tissot, Seiko, Orient, Casio та інших. До кожного годинника додається офіційний гарантійний талон з печаткою.",
    },
    {
      q: "Звідки надходять годинники?",
      a: "Всі товари поставляються безпосередньо зі складів офіційних імпортерів та фабрик у Швейцарії, Японії та Європі з дотриманням усіх митних норм.",
    },
    {
      q: "Чи можна приміряти годинник перед покупкою?",
      a: "Так! Ви можете завітати до нашого шоуруму в Івано-Франківську або замовити доставку Новою Поштою з післяплатою та приміркою у відділенні.",
    },
    {
      q: "Чи надаєте ви консультації щодо вибору?",
      a: "Звісно. Наші експерти з задоволенням допоможуть підібрати модель під конкретний дрес-код, розмір руки або в якості подарунка. Зв'яжіться з нами по телефону чи в месенджерах.",
    },
    {
      q: "Чи можна замовити годинник, якого немає в наявності?",
      a: "Так, ми приймаємо індивідуальні замовлення на рідкісні та лімітовані серії брендів, з якими співпрацюємо.",
    },
    {
      q: "Як дізнатися про нові надходження та акції?",
      a: "Ви можете підписатися на нашу e-mail розсилку або стежити за новинами на наших сторінках у соцмережах Telegram та Instagram.",
    },
  ];

  return (
    <div className="chrono-about-page">
      {/* 1. Hero Section */}
      <section className="chrono-hero" aria-label="Про компанію ChronoClassic">
        <div
          className="chrono-hero-bg"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=1600')`,
          }}
        />
        <div className="chrono-hero-gradient" />

        <div className="chrono-hero-content">
          {/* Breadcrumbs */}
          <div
            className="chrono-breadcrumbs"
            style={{
              justifyContent: "center",
              color: "var(--chrono-amber-400)",
              marginBottom: "1.5rem",
            }}
          >
            <Link to="/" className="chrono-breadcrumb-link">
              Головна
            </Link>
            <ChevronRight size={14} color="#f59e0b" />
            <span style={{ color: "#ffffff" }}>Про нас</span>
          </div>

          <h1 className="chrono-hero-title">
            Ми — ті, хто <span className="chrono-text-gold">цінує час</span>
          </h1>

          <p
            style={{
              color: "var(--chrono-amber-400)",
              fontSize: "1.25rem",
              fontWeight: 600,
              marginBottom: "1.5rem",
            }}
          >
            Офіційний дистриб'ютор класичних наручних годинників в Україні з
            2012 року
          </p>

          <p className="chrono-hero-text">
            ChronoClassic — це простір для тих, хто вважає наручний годинник
            чимось більшим, ніж просто інструментом. Ми об'єднуємо відданість
            годинниковій традиції, гарантію 100% автентичності та сервіс високої
            якості.
          </p>
        </div>
      </section>

      {/* 2. History Section */}
      <section className="chrono-container" aria-label="Наша історія">
        <div className="chrono-history-grid">
          {/* Left Text */}
          <div style={{ flex: 1 }}>
            <span
              className="chrono-pill-badge"
              style={{ marginBottom: "1rem" }}
            >
              <Sparkles size={14} /> Наш шлях
            </span>
            <h2
              className="chrono-section-title"
              style={{ textAlign: "left", marginBottom: "0.5rem" }}
            >
              Наша історія
            </h2>
            <div
              className="chrono-divider"
              style={{ marginLeft: 0, marginBottom: "1.5rem" }}
            />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                color: "rgba(6, 78, 59, 0.8)",
                fontSize: "0.875rem",
                lineHeight: "1.7",
                fontWeight: 300,
              }}
            >
              <p>
                Історія <strong>ChronoClassic</strong> розпочалася у 2012 році в
                Івано-Франківську із невеликої приватної майстерні та кількох
                екземплярів класичних швейцарських механік. Ми прагнули принести
                в Україну культуру вишуканого годинникарства.
              </p>
              <p>
                Перші клієнти цінували наш чесний підхід та особисті
                консультації. Згодом, завдяки бездоганній репутації, ми уклали
                перші прямі дистриб'юторські контракти з провідними брендами,
                такими як Tissot, Seiko та Orient.
              </p>
              <p>
                У 2018 році було відкрито флагманський шоурум у центрі міста та
                запущено національний онлайн-магазин. Це дозволило нам зробити
                світову класику доступною для покупців по всій Україні.
              </p>
              <p
                style={{ fontWeight: 600, color: "var(--chrono-emerald-950)" }}
              >
                Сьогодні ChronoClassic — це понад 12 брендів, власний
                авторизований сервісний центр та більше 15 000 задоволених
                власників оригінальних годинників.
              </p>
            </div>

            {/* Stats */}
            <div className="chrono-stats-grid">
              <div style={{ textAlign: "center" }}>
                <div className="chrono-stat-val">14+</div>
                <div className="chrono-stat-lbl">Років досвіду</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div className="chrono-stat-val">15k+</div>
                <div className="chrono-stat-lbl">Клієнтів</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div className="chrono-stat-val">100%</div>
                <div className="chrono-stat-lbl">Оригінал</div>
              </div>
            </div>
          </div>

          {/* Right Photos */}
          <div style={{ flex: 1, width: "100%" }}>
            <div className="chrono-history-photos">
              <img
                src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=600"
                alt="Watchmaker workshop"
                className="chrono-history-photo"
                loading="lazy"
              />
              <img
                src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=600"
                alt="Classic watch detail"
                className="chrono-history-photo"
                style={{ marginTop: "2rem" }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission, Vision, Values */}
      <section
        className="chrono-values-section"
        aria-label="Місія, бачення та цінності"
      >
        <div className="chrono-container">
          <div className="chrono-section-header">
            <span
              className="chrono-pill-badge"
              style={{ marginBottom: "0.5rem" }}
            >
              Фундамент нашої роботи
            </span>
            <h2 className="chrono-section-title" style={{ color: "#ffffff" }}>
              Те, у що ми віримо
            </h2>
            <div className="chrono-divider" />
          </div>

          <div className="chrono-values-grid">
            {/* Mission */}
            <div className="chrono-value-card">
              <div className="chrono-value-icon">
                <Target size={28} />
              </div>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "var(--chrono-amber-400)",
                  fontFamily: "var(--chrono-font-serif)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "0.75rem",
                }}
              >
                Місія
              </h3>
              <p
                style={{
                  color: "rgba(209, 250, 229, 0.8)",
                  fontSize: "0.875rem",
                  lineHeight: 1.6,
                  fontWeight: 300,
                  margin: 0,
                }}
              >
                Зробити справжню годинникову класику доступною для кожного, хто
                цінує якість, традиції та власну індивідуальність.
              </p>
            </div>

            {/* Vision */}
            <div className="chrono-value-card">
              <div className="chrono-value-icon">
                <Eye size={28} />
              </div>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "var(--chrono-amber-400)",
                  fontFamily: "var(--chrono-font-serif)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "0.75rem",
                }}
              >
                Бачення
              </h3>
              <p
                style={{
                  color: "rgba(209, 250, 229, 0.8)",
                  fontSize: "0.875rem",
                  lineHeight: 1.6,
                  fontWeight: 300,
                  margin: 0,
                }}
              >
                Бути найнадійнішим та найавторитетнішим експертом із класичних
                наручних годинників в Україні з найвищим рівнем довіри покупців.
              </p>
            </div>

            {/* Values */}
            <div className="chrono-value-card">
              <div className="chrono-value-icon">
                <Heart size={28} />
              </div>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "var(--chrono-amber-400)",
                  fontFamily: "var(--chrono-font-serif)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "0.75rem",
                }}
              >
                Цінності
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  color: "rgba(209, 250, 229, 0.8)",
                  fontSize: "0.75rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: "var(--chrono-amber-400)",
                    }}
                  />
                  <strong>Автентичність:</strong> Лише 100% оригінальні вироби.
                </li>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: "var(--chrono-amber-400)",
                    }}
                  />
                  <strong>Чесність:</strong> Прозорі ціни та умови гарантії.
                </li>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: "var(--chrono-amber-400)",
                    }}
                  />
                  <strong>Експертність:</strong> Глибокі знання годинникової
                  справи.
                </li>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: "var(--chrono-amber-400)",
                    }}
                  />
                  <strong>Турбота:</strong> Персональний підхід до кожного
                  покупця.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us */}
      <section className="chrono-container" aria-label="Чому обирають нас">
        <div className="chrono-section-header">
          <h2 className="chrono-section-title">Чому обирають нас</h2>
          <p className="chrono-section-subtitle">
            Причини, з яких тисячі клієнтів довіряють свою покупку ChronoClassic
          </p>
          <div className="chrono-divider" />
        </div>

        <div className="chrono-why-us-grid">
          {[
            {
              icon: Building,
              title: "Офіційний дистриб'ютор",
              desc: "Прямі контракти з офіційними представництвами брендів без посередників.",
            },
            {
              icon: ShieldCheck,
              title: "100% Оригінальність",
              desc: "Сертифікат автентичності, фірмова упаковка та серійний номер до кожного годинника.",
            },
            {
              icon: Award,
              title: "Гарантія 2 роки",
              desc: "Повна міжнародна та локальна гарантія від виробника на всі механізми.",
            },
            {
              icon: Settings,
              title: "Авторизований сервіс",
              desc: "Власний сервісний центр із сертифікованими майстрами та професійним обладнанням.",
            },
            {
              icon: User,
              title: "Експертна консультація",
              desc: "Допомагаємо підібрати годинник під ваш стиль, розмір зап'ястя та запланований бюджет.",
            },
            {
              icon: Star,
              title: "Тисячі відгуків",
              desc: "Понад 15 000 задоволених покупців та середній рейтинг обслуговування 4.9 / 5.",
            },
          ].map((adv, idx) => (
            <div key={idx} className="chrono-why-card">
              <div className="chrono-why-icon">
                <adv.icon size={24} />
              </div>
              <div>
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "var(--chrono-emerald-950)",
                    marginBottom: "0.375rem",
                  }}
                >
                  {adv.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "rgba(6, 78, 59, 0.7)",
                    lineHeight: "1.5",
                    margin: 0,
                  }}
                >
                  {adv.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FAQ Accordion */}
      <section className="chrono-container" aria-label="Часті запитання">
        <div className="chrono-section-header">
          <h2 className="chrono-section-title">Часті запитання про нас</h2>
          <p className="chrono-section-subtitle">
            Відповіді на популярні питання від наших покупців
          </p>
          <div className="chrono-divider" />
        </div>

        <div className="chrono-faq-list">
          {faqItems.map((faq, idx) => (
            <div key={idx} className="chrono-faq-item">
              <button
                type="button"
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="chrono-faq-btn"
                aria-expanded={activeFaq === idx}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}
                >
                  <HelpCircle
                    size={18}
                    color="#f59e0b"
                    style={{ flexShrink: 0 }}
                  />
                  {faq.q}
                </span>
                <ChevronDown
                  size={18}
                  style={{
                    color:
                      activeFaq === idx
                        ? "var(--chrono-amber-500)"
                        : "rgba(6, 78, 59, 0.4)",
                    transform:
                      activeFaq === idx ? "rotate(180deg)" : "rotate(0)",
                    transition: "transform 0.3s ease",
                    flexShrink: 0,
                  }}
                />
              </button>
              {activeFaq === idx && (
                <div className="chrono-faq-content">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 6. Contact & Showroom Section */}
      <section className="chrono-container" aria-label="Шоурум та контакти">
        <div className="chrono-contact-card">
          <div className="chrono-contact-grid">
            {/* Left: Contact Info */}
            <div>
              <span
                className="chrono-pill-badge"
                style={{ marginBottom: "0.5rem" }}
              >
                Наш Шоурум
              </span>
              <h2
                className="chrono-section-title"
                style={{
                  color: "#ffffff",
                  textAlign: "left",
                  fontSize: "2rem",
                  marginBottom: "1.5rem",
                }}
              >
                Зв'яжіться з нами
              </h2>
              <p
                style={{
                  color: "rgba(209, 250, 229, 0.7)",
                  fontSize: "0.875rem",
                  marginBottom: "2rem",
                  lineHeight: "1.6",
                  fontWeight: 300,
                }}
              >
                Завітайте до нашого затишного шоуруму для примірки годинників за
                чашкою запашної кави або зв'яжіться з нами зручним для вас
                способом.
              </p>

              <div>
                <div className="chrono-contact-item">
                  <div className="chrono-contact-icon-box">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4
                      style={{
                        color: "var(--chrono-amber-400)",
                        fontSize: "0.75rem",
                        textTransform: "uppercase",
                        margin: "0 0 0.25rem 0",
                        fontWeight: 700,
                      }}
                    >
                      Адреса шоуруму
                    </h4>
                    <p
                      style={{
                        color: "rgba(209, 250, 229, 0.9)",
                        margin: 0,
                        fontSize: "0.875rem",
                        fontWeight: 300,
                      }}
                    >
                      м. Івано-Франківськ, вул. Незалежності, 25
                    </p>
                  </div>
                </div>

                <div className="chrono-contact-item">
                  <div className="chrono-contact-icon-box">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4
                      style={{
                        color: "var(--chrono-amber-400)",
                        fontSize: "0.75rem",
                        textTransform: "uppercase",
                        margin: "0 0 0.25rem 0",
                        fontWeight: 700,
                      }}
                    >
                      Телефони
                    </h4>
                    <p
                      style={{
                        color: "rgba(209, 250, 229, 0.9)",
                        margin: 0,
                        fontSize: "0.875rem",
                        fontWeight: 300,
                      }}
                    >
                      +380 99 123 45 67 | +380 67 890 12 34
                    </p>
                  </div>
                </div>

                <div className="chrono-contact-item">
                  <div className="chrono-contact-icon-box">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4
                      style={{
                        color: "var(--chrono-amber-400)",
                        fontSize: "0.75rem",
                        textTransform: "uppercase",
                        margin: "0 0 0.25rem 0",
                        fontWeight: 700,
                      }}
                    >
                      Графік роботи
                    </h4>
                    <p
                      style={{
                        color: "rgba(209, 250, 229, 0.9)",
                        margin: 0,
                        fontSize: "0.875rem",
                        fontWeight: 300,
                      }}
                    >
                      Пн-Сб: 10:00 — 19:00 | Нд: 11:00 — 17:00
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="chrono-messenger-pills"
                style={{ marginTop: "2rem" }}
              >
                <span className="chrono-messenger-btn">Telegram</span>
                <span className="chrono-messenger-btn">Viber</span>
                <span className="chrono-messenger-btn">WhatsApp</span>
              </div>
            </div>

            {/* Right: Feedback Form */}
            <div className="chrono-feedback-form-box">
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "#ffffff",
                  fontFamily: "var(--chrono-font-serif)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "0.5rem",
                }}
              >
                Напишіть нам
              </h3>
              <p
                style={{
                  color: "rgba(209, 250, 229, 0.7)",
                  fontSize: "0.75rem",
                  marginBottom: "1.5rem",
                }}
              >
                Залиште повідомлення, і наш експерт зателефонує вам протягом 15
                хвилин.
              </p>

              {contactSubmitted ? (
                <div
                  style={{
                    backgroundColor: "rgba(245, 158, 11, 0.15)",
                    border: "1px solid rgba(245, 158, 11, 0.5)",
                    padding: "1.5rem",
                    borderRadius: "var(--chrono-radius-lg)",
                    textAlign: "center",
                    color: "var(--chrono-amber-400)",
                  }}
                >
                  <CheckCircle2
                    size={40}
                    style={{ margin: "0 auto 0.75rem auto", display: "block" }}
                  />
                  <h4
                    style={{
                      margin: "0 0 0.5rem 0",
                      fontWeight: 700,
                      fontSize: "1rem",
                    }}
                  >
                    Дякуємо за звернення!
                  </h4>
                  <p
                    style={{ margin: 0, fontSize: "0.75rem", color: "#F9F8F6" }}
                  >
                    Ваше повідомлення успішно надіслано. Ми зв'яжемося з вами
                    найближчим часом.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit}>
                  <div className="chrono-form-group">
                    <label className="chrono-label">Ваше ім'я *</label>
                    <input
                      type="text"
                      required
                      placeholder="Олександр"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="chrono-input-dark"
                    />
                  </div>

                  <div className="chrono-form-group">
                    <label className="chrono-label">Телефон або Email *</label>
                    <input
                      type="text"
                      required
                      placeholder="+380 99 000 00 00"
                      value={formData.contact}
                      onChange={(e) =>
                        setFormData({ ...formData, contact: e.target.value })
                      }
                      className="chrono-input-dark"
                    />
                  </div>

                  <div className="chrono-form-group">
                    <label className="chrono-label">Повідомлення</label>
                    <textarea
                      rows={3}
                      placeholder="Яка модель вас цікавить або яке маєте запитання?"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="chrono-textarea-dark"
                      style={{ resize: "none" }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="chrono-btn-primary"
                    style={{ width: "100%", marginTop: "1rem" }}
                  >
                    <Send size={16} /> Надіслати повідомлення
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
