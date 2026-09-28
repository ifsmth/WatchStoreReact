import { Link } from "react-router";
import PageHeading from "../components/ui/PageHeading.jsx";

export default function HomePage() {
  return (
    <>
      <PageHeading title="Головна сторінка" />
      <p>Вітаємо у магазині оригінальних наручних годинників.</p>
      <p>Перегляньте наш асортимент та оформіть замовлення.</p>
      <p>
        <Link to="/products">Перейти до каталогу</Link>
      </p>
      <p>
        <Link to="/orders">Переглянути замовлення</Link>
      </p>
    </>
  );
}
