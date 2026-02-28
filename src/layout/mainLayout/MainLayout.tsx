import AppRoutes from "@/routes/Routes";
import Header from "../header/Header";
import { Footer } from "../footer";

export default function MainLayout() {
  return (
      <>
      <Header/>
      <AppRoutes />
      <Footer/>
      </>
  )
}
