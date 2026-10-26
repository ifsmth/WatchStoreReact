import { useEffect, useState } from "react";
import { authService } from "../../services/authService.js";
import { errorMessage } from "../../services/ServiceError.js";
import { formatDate } from "../../services/mappers.js";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    authService
      .listUsers()
      .then((rows) => {
        if (!cancelled) {
          setUsers(rows);
          setStatus("success");
        }
      })
      .catch((cause) => {
        if (!cancelled) {
          setError(errorMessage(cause));
          setStatus("error");
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section>
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">Зареєстровані клієнти</h2>
          <p className="admin-page-subtitle">Список покупців з бази даних</p>
        </div>
      </div>
      {error && <div className="admin-alert-error">{error}</div>}
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
            {status === "loading" && (
              <tr>
                <td colSpan="5" className="admin-empty-cell">
                  Завантаження...
                </td>
              </tr>
            )}
            {status === "success" &&
              users.map((user) => (
                <tr key={user.id}>
                  <td className="admin-cell-id">#{user.id}</td>
                  <td className="admin-cell-name">{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone_number}</td>
                  <td className="admin-cell-muted">
                    {formatDate(user.created_at)}
                  </td>
                </tr>
              ))}
            {status === "success" && users.length === 0 && (
              <tr>
                <td colSpan="5" className="admin-empty-cell">
                  Клієнтів поки немає.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
