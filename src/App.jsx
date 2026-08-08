import "./App.css";
import "./index.css";

import { Routes, Route } from "react-router-dom";

import ShoppingPage from "./pages/ShoppingPage/ShoppingPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ShoppingPage />} />
        <Route path="/shopping" element={<ShoppingPage />} />
      </Routes>
    </div>
  );
}

export default App;
