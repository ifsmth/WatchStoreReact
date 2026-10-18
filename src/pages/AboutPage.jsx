import PageHeading from "../components/ui/PageHeading.jsx";

export default function AboutPage() {
  return (
    <section aria-labelledby="about-title">
      <PageHeading title="Про нашу компанію" />

      <div
        className="info-banner"
        style={{ marginTop: "2rem", borderLeftColor: "#bd5c38" }}
      >
        Ми — мультибрендовий магазин оригінальних наручних годинників. Наша мета
        — допомогти вам знайти ідеальний аксесуар.
      </div>

      <div
        style={{
          maxWidth: "800px",
          margin: "2.5rem 0",
          lineHeight: "1.8",
          color: "#4a504a",
        }}
      >
        <h2
          style={{ fontSize: "1.4rem", color: "#1d2224", marginBottom: "1rem" }}
        >
          Наша місія
        </h2>
        <p style={{ marginBottom: "2rem" }}>
          Час — це найцінніше, що ми маємо. Ми віримо, що наручний годинник — це
          не просто пристрій для вимірювання часу, а відображення вашого стилю,
          статусу та характеру. Ми ретельно відбираємо кожну модель у наш
          каталог, щоб ви могли бути впевнені у її якості та надійності.
        </p>

        <h2
          style={{ fontSize: "1.4rem", color: "#1d2224", marginBottom: "1rem" }}
        >
          Бренди, з якими співпрацюємо
        </h2>
        <p style={{ marginBottom: "2rem" }}>
          Ми є офіційними партнерами багатьох світових виробників. В нашому
          асортименті ви знайдете оригінальні годинники від{" "}
          <strong>
            Casio, Tissot, Orient, Daniel Wellington, Michael Kors
          </strong>{" "}
          та інших. Усі товари постачаються в оригінальному пакуванні та мають
          офіційну гарантію від виробника терміном від 12 до 24 місяців.
        </p>

        <h2
          style={{ fontSize: "1.4rem", color: "#1d2224", marginBottom: "1rem" }}
        >
          Чому обирають нас?
        </h2>
        <ul
          style={{
            paddingLeft: "1.2rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <li>Тільки 100% оригінальна продукція.</li>
          <li>Актуальна інформація про наявність товарів на складі.</li>
          <li>Професійна консультація при виборі годинника.</li>
          <li>Швидка обробка замовлень та відправка по всій країні.</li>
        </ul>
      </div>
    </section>
  );
}
