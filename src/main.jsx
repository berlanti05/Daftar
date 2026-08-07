import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ShoppingProvider } from "./contexts/ShoppingContext.jsx";
import { RecipeProvider } from "./contexts/RecipeContext.jsx";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RecipeProvider>
      <ShoppingProvider>
        <App />
      </ShoppingProvider>
    </RecipeProvider>
  </StrictMode>,
);
