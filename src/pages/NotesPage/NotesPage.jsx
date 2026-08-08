import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { MdMenuBook } from "react-icons/md";
import styles from "./NotesPage.module.css";
import { useRecipe } from "../../contexts/RecipeContext";
import RecipeCard from "../../components/Recipe/RecipeCard";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function NotesPage() {
  const { recipeInfo } = useRecipe();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // "all" | "favorite"

  const filteredRecipes = recipeInfo.filter((recipe) => {
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
        <div className={styles.header}>
          <div className={styles.titleBlock}>
            <h1>دفتري</h1>
            <p>كل وصفاتك المحفوظة بمكان واحد.</p>
          </div>

          <div className={styles.searchBox}>
            <FiSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="دوري على وصفة أو مكوّن..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
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
            <p>دفترك لسا فاضي، ضيفي أول وصفة إلك!</p>
          </div>
        )}
      </div>
    </div>
  );
}