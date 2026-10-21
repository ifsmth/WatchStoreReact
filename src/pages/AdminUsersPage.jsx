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
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">Зареєстровані клієнти</h2>
          <p className="admin-page-subtitle">
            Перегляд списку покупців, які створили акаунт у ChronoClassic
          </p>
        </div>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th className="admin-th-id">ID</th>
              <th>Ім'я клієнта</th>
              <th>Електронна пошта</th>
              <th>Телефон</th>
              <th>Дата реєстрації</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((user) => (
              <tr key={user.id}>
                <td className="admin-cell-id">#{user.id}</td>
                <td className="admin-cell-name">{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td className="admin-cell-muted">{user.registeredAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
