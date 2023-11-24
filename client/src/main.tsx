import ReactDOM from "react-dom/client";
import "./App.css";
import App from "./App.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import ToastAlert from "./components/alert.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ToastAlert />
    <App />
  </QueryClientProvider>
);
