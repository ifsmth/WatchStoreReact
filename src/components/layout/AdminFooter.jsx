export default function AdminFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="admin-footer">
      <span>ChronoClassic Admin Panel</span>
      <span>© {currentYear}. Всі права захищено.</span>
    </footer>
  );
}
