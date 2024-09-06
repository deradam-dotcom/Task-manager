import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { TaskManagerProvider } from "./context/TaskManagerContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TaskManagerProvider>
      <App />
    </TaskManagerProvider>
  </StrictMode>
);
