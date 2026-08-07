import "./App.css";
import "./index.css";

import { Routes, Route } from "react-router-dom";

import ShoppingPage from "./pages/ShoppingPage/ShoppingPage";

function App() {
  return (
    <div style={{ display: "flex" }}>
      <Routes>
        <Route path="/" element={<ShoppingPage />} />
        <Route path="/shopping" element={<ShoppingPage />} />
      </Routes>
    </div>
  );
}

export default App;
