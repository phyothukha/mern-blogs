import ReactDOM from "react-dom/client";
import "./App.css";
import App from "./App.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import ToastAlert from "./components/alert.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const queryClient = new QueryClient();
const googleclientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <GoogleOAuthProvider clientId={googleclientId}>
      <ToastAlert />
      <App />
    </GoogleOAuthProvider>
  </QueryClientProvider>
);
