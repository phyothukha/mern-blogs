import ReactDOM from "react-dom/client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./App.css";
import App from "./App.tsx";
import ToastAlert from "./components/alert.tsx";

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
