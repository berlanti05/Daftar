import "./App.css";
import "./index.css";

import { Routes, Route } from "react-router-dom";

import ShoppingPage from "./pages/ShoppingPage/ShoppingPage";

import NotesPage from "./pages/NotesPage/NotesPage";


function App() {
  return (
    <div>
     <Routes>
        <Route path="/" element={<NotesPage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/shopping" element={<ShoppingPage />} />
      </Routes>
    </div>
  );
}

export default App;
