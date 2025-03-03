import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./Pages/Header/ThemeProvider";
import store from "./Redux/Store.tsx";
// Get root element and handle potential null case
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Failed to find the root element");
}

// Create root and render app
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="app-theme">
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
