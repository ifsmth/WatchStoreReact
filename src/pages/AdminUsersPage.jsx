import PageHeading from "../components/ui/PageHeading.jsx";

// Фейкові дані клієнтів для демонстрації
const mockUsers = [
  {
    id: 101,
    name: "Олександр Петренко",
    email: "alex@example.com",
    phone: "+380501234567",
    registeredAt: "2026-09-01",
  },
  {
    id: 102,
    name: "Марія Коваль",
    email: "maria@example.com",
    phone: "+380671234567",
    registeredAt: "2026-09-15",
  },
  {
    id: 103,
    name: "Іван Франко",
    email: "ivan.f@example.com",
    phone: "+380931234567",
    registeredAt: "2026-10-05",
  },
  {
    id: 104,
    name: "Олена Шевченко",
    email: "olena@example.com",
    phone: "Не вказано",
    registeredAt: "2026-10-12",
  },
];

export default function AdminUsersPage() {
  return (
    <section>
      <PageHeading title="Зареєстровані клієнти" />
      <p style={{ color: "#686861", marginBottom: "2rem" }}>
        Перегляд списку користувачів, які зареєстрували акаунт у вашому
        магазині.
      </p>

      <div className="table-scroll">
        <table className="requests-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Ім'я клієнта</th>
              <th>Електронна пошта</th>
              <th>Телефон</th>
              <th>Дата реєстрації</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((user) => (
              <tr key={user.id}>
                <td style={{ color: "#686861", fontWeight: "bold" }}>
                  #{user.id}
                </td>
                <td style={{ fontWeight: "600" }}>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td style={{ color: "#686861" }}>{user.registeredAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
