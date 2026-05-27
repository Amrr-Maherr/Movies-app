import "./App.css";
import MainLayout from "./layout/mainLayout/MainLayout";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <main>
      <MainLayout />
      <Toaster position="bottom-left" reverseOrder={false} />
    </main>
  );
}

export default App;
