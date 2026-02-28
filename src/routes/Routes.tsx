import NotFound from "@/pages/NotFound";
import { Routes, Route } from "react-router-dom";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
