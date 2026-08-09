import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { MdMenuBook } from "react-icons/md";
import { IoChevronForward } from "react-icons/io5";
import styles from "./NotebookPage.module.css";
import { useRecipe } from "../../contexts/RecipeContext";
import { useNotebook } from "../../contexts/NotebookContext";
import RecipeCard from "../../components/Recipe/RecipeCard";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function NotebookPage() {
  const { notebookId } = useParams();
  const navigate = useNavigate();
  const { recipeInfo } = useRecipe();
  const { notebooks } = useNotebook();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const notebook = notebooks.find((n) => String(n.id) === notebookId);

  const recipesInNotebook = recipeInfo.filter(
    (recipe) => String(recipe.notebookId) === notebookId,
  );

  const filteredRecipes = recipesInNotebook.filter((recipe) => {
    const matchesSearch =
      recipe.name.toLowerCase().includes(search.toLowerCase()) ||
      recipe.tags?.some((tag) =>
        tag.toLowerCase().includes(search.toLowerCase()),
      );

    const matchesFilter = filter === "favorite" ? recipe.isFavorite : true;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className={styles.app}>
      <Sidebar />

      <div className={styles.page}>
        <button className={styles.backBtn} onClick={() => navigate("/notes")}>
          <IoChevronForward /> كل الدفاتر
        </button>

        <div className={styles.topRow}>
          <div className={styles.searchBox}>
            <FiSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="دوري على وصفة أو مكوّن..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className={styles.titleBlock}>
            <h1>
              {notebook ? `${notebook.emoji} ${notebook.name}` : "الدفتر"}
            </h1>
            <p>كل وصفات هالدفتر بمكان واحد.</p>
          </div>
        </div>

        <div className={styles.filters}>
          <button
            className={filter === "favorite" ? styles.activeTab : styles.tab}
            onClick={() => setFilter("favorite")}
          >
            المفضلة
          </button>
          <button
            className={filter === "all" ? styles.activeTab : styles.tab}
            onClick={() => setFilter("all")}
          >
            الكل
          </button>
        </div>

        {filteredRecipes.length ? (
          <div className={styles.grid}>
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <MdMenuBook className={styles.emptyIcon} />
            <p>هالدفتر لسا فاضي، ضيفي أول وصفة إله!</p>
          </div>
        )}
      </div>
    </div>
  );
}