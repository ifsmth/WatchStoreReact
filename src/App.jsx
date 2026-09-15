import HomePage from "./pages/HomePage.jsx";

export default function App() {
  return (
    <>
      <header className="site-header">
        <span>Магазин годинників</span>
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
