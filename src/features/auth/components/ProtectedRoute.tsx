import { Navigate, Outlet } from "react-router-dom";
import { getLocalizedLink } from "@/lib/utils/i18n";

export default function ProtectedRoute() {
  const token = localStorage.getItem("token");
  const payment = localStorage.getItem("paymentStatus");
  console.log(payment, "payment");
  console.log(token, "token");

  if (payment !== "success") {
    return <Navigate to={getLocalizedLink("/subscribe")} replace />;
  }

  return <Outlet />;
}
