import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Dismiss the HTML native loading overlay
const loader = document.getElementById("loading-overlay");
if (loader) {
  loader.style.opacity = "0";
  setTimeout(() => {
    loader.remove();
  }, 400);
}

createRoot(document.getElementById("root")!).render(<App />);
