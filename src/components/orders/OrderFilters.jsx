import AppButton from "../ui/AppButton.jsx";
import FormField from "../ui/FormField.jsx";

export default function OrderFilters({
  query,
  sort,
  onQueryChange,
  onSortChange,
  onReset,
}) {
  return (
    <div
      className="request-filters"
      style={{
        display: "flex",
        gap: "1rem",
        alignItems: "flex-end",
        flexWrap: "wrap",
        marginBottom: "1.5rem",
      }}
    >
      <FormField id="orders-query" label="Пошук (годинник, замовник)">
        <input
          id="orders-query"
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
        />
      </FormField>

      <FormField id="orders-sort" label="Упорядкування">
        <select
          id="orders-sort"
          value={sort}
          onChange={(event) => onSortChange(event.target.value)}
        >
          <option value="product">За назвою годинника</option>
          <option value="quantity-asc">Кількість: зростання</option>
          <option value="quantity-desc">Кількість: спадання</option>
        </select>
      </FormField>

      <AppButton variant="secondary" onClick={onReset}>
        Скинути умови
      </AppButton>
    </div>
  );
}
