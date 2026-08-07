import "./App.css";
import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar/Sidebar";
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