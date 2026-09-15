import HomePage from "./pages/HomePage.jsx";
const appTitle =
  import.meta.env.VITE_APP_TITLE || "Магазин наручних годинників";

export default function App() {
  return (
    <>
      <header className="site-header">
        <span> {appTitle} </span>
        <nav aria-label="Основна навігація">
          <a href="#about">Про магазин</a>
          <a href="#catalog">Каталог</a>
        </nav>
      </header>
      <main>
        <HomePage />
      </main>
      <footer>Навчальний проєкт. Початковий каталог годинників.</footer>
    </>
  );
}
