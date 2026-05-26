import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const token = localStorage.getItem("token");
  const payment = localStorage.getItem("paymentStatus");
  console.log(payment, "payment");
  console.log(token, "token");

  if (payment !== "success") {
    return <Navigate to="/subscribe" replace />;
  }

  return <Outlet />;
}
