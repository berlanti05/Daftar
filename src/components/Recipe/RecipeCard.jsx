import styles from "./RecipeCard.module.css";
import { FaRegHeart } from "react-icons/fa";
import { IoIosTimer } from "react-icons/io";
import { FaFire } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { useRecipe } from "../../contexts/RecipeContext";
import RecipeModel from "../RecipeModel/RecipeModel";

export default function RecipeCard({ recipe }) {
  const { setRecipeInfo } = useRecipe();

  function handleFavorite(e) {
    e.stopPropagation();
    setRecipeInfo((prevRecipes) =>
      prevRecipes.map((r) =>
        r.id === recipe.id ? { ...r, isFavorite: !r.isFavorite } : r,
      ),
    );
  }

  function openRecipe() {
    setRecipeInfo((prevRecipes) =>
      prevRecipes.map((r) => (r.id === recipe.id ? { ...r, isOpen: true } : r)),
    );
  }

  return (
    <>
      <div className={styles.card} onClick={openRecipe}>
        {recipe.isFavorite ? (
          <FaHeart className={styles.heart} onClick={handleFavorite} />
        ) : (
          <FaRegHeart className={styles.heartEmpty} onClick={handleFavorite} />
        )}
        <p className={styles.name}>{recipe.name}</p>
        <p className={styles.tags}> {recipe.tags.join("، ")}</p>
        <div className={styles.container}>
          <div className={styles.item}>
            <FaFire />
            {recipe.cals}
          </div>
          <div className={styles.item} style={{ marginRight: "5%" }}>
            <IoIosTimer />
            {recipe.time}
          </div>
        </div>
      </div>
      {recipe.isOpen ? <RecipeModel recipe={recipe} /> : null}
    </>
  );
}
