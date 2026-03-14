import "./App.css";
import MainLayout from "./layout/mainLayout/MainLayout";
import PWAInstallPrompt from "./components/shared/PWAInstallPrompt";

function App() {
  return (
    <>
      <main>
        <MainLayout />
        <PWAInstallPrompt />
      </main>
    </>
  );
}

export default App;
