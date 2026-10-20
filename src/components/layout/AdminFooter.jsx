export default function AdminFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: "#fffefa",
        padding: "1rem 2rem",
        borderTop: "1px solid #dedbd3",
        color: "#686861",
        fontSize: "0.85rem",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <span>WatchStore Admin Panel</span>
      <span>© {currentYear}. Всі права захищено.</span>
    </footer>
  );
}
