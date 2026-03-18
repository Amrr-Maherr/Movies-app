import "./App.css";
import MainLayout from "./layout/mainLayout/MainLayout";
import PWAInstallPrompt from "./components/shared/PWAInstallPrompt";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <main>
        <MainLayout />
        <PWAInstallPrompt />
        <Toaster position="bottom-left" reverseOrder={false} />
      </main>
    </>
  );
}

export default App;
