import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ShoppingProvider } from "./contexts/ShoppingContext.jsx";
import { RecipeProvider } from "./contexts/RecipeContext.jsx";
import { NotebookProvider } from "./contexts/NotebookContext.jsx";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NotebookProvider>
      <RecipeProvider>
        <ShoppingProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ShoppingProvider>
      </RecipeProvider>
    </NotebookProvider>
  </StrictMode>,
);