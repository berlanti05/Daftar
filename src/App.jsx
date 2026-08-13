import "./App.css";
import "./index.css";

import { Routes, Route } from "react-router-dom";
import ShoppingPage from "./pages/ShoppingPage/ShoppingPage";
import NotesPage from "./pages/NotesPage/NotesPage";
import PlanPage from "./pages/PlanPage/PlanPage";
import NotebookPage from "./pages/NotebookPage/NotebookPage";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <div>
      <Routes>
        {/* الصفحة الرئيسية قبل تسجيل الدخول */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<HomePage />} />
        <Route path="/signup" element={<HomePage />} />

        {/* صفحات التطبيق (حاليًا بدون حماية تسجيل دخول لغاية ما نجهزه) */}
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/notes/:notebookId" element={<NotebookPage />} />
        <Route path="/shopping" element={<ShoppingPage />} />
        <Route path="/planner" element={<PlanPage />} />
      </Routes>
    </div>
  );
}

export default App;
