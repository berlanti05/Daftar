import styles from "./RecipeModel.module.css";
import { IoClose } from "react-icons/io5";
import { IoIosTimer } from "react-icons/io";
import { FaFire } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { useRecipe } from "../../contexts/RecipeContext";
import { useShopping } from "../../contexts/ShoppingContext";
import { useState } from "react";

export default function RecipeModel({ recipe }) {
  const { setRecipeInfo } = useRecipe();
  const { setList } = useShopping();
  const [clicked, setClicked] = useState(false);

  if (!recipe) return null;

  function closeRecipe() {
    setRecipeInfo((prevRecipes) =>
      prevRecipes.map((r) =>
        r.id === recipe.id ? { ...r, isOpen: false } : r,
      ),
    );
  }

  function deleteRecipe() {
    setRecipeInfo((prevRecipes) =>
      prevRecipes.filter((r) => {
        return r.id != recipe.id;
      }),
    );
  }

  function addToCart() {
    const newItems = recipe.tags.map((tag) => ({
      name: tag,
      check: false,
      id: crypto.randomUUID(),
    }));

    setList((prevList) => [...prevList, ...newItems]);
    setClicked(true);
  }
  return (
    <div className={styles.overlay} onClick={closeRecipe}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <IoClose className={styles.close} onClick={closeRecipe} />
        <p className={styles.name}>{recipe.name}</p>
        <div className={styles.container}>
          <div className={styles.item}>
            <FaFire />
            {recipe.cals}
          </div>
          <div className={styles.item} style={{ marginRight: "3%" }}>
            <IoIosTimer />
            {recipe.time}
          </div>
        </div>
        <div className={styles.ingredientsSection}>
          <p style={{ marginTop: "20px", fontWeight: "bold" }}>المكونات</p>

          <ul className={styles.ingredientsList}>
            {recipe.tags?.map((tag, index) => (
              <li key={index}>{tag}</li>
            ))}
          </ul>
        </div>

        <div>
          <p style={{ marginTop: "20px", fontWeight: "bold" }}>طريقة التحضير</p>
          <p style={{ minHeight: "330px" }}> {recipe.steps}</p>
        </div>
        <div className={styles.btns}>
          {clicked ? (
            <button className={styles.addToCart} onClick={addToCart} disabled>
              المكونات انضافت للتسوق
            </button>
          ) : (
            <button className={styles.addToCart} onClick={addToCart}>
              اضف المكونات للتسوق
            </button>
          )}
          <button className={styles.delete} onClick={deleteRecipe}>
            <FaRegTrashCan />
          </button>
        </div>
      </div>
    </div>
  );
}
