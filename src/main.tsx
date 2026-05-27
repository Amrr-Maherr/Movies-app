import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Providers from "./providers/Providers.tsx";
import "@/lib/axios";
import "@/lib/i18n";

createRoot(document.getElementById("root")!).render(
  <Providers>
    <App />
  </Providers>,
);
