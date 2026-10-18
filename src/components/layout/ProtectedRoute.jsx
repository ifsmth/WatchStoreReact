import { Navigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext.jsx";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  // Якщо користувача немає (не залогінений), перекидаємо на сторінку входу
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Інакше рендеримо захищену сторінку
  return children;
}
