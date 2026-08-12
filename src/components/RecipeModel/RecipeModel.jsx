import styles from "./RecipeModel.module.css";
import { IoClose } from "react-icons/io5";
import { IoIosTimer } from "react-icons/io";
import { FaFire } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { useRecipe } from "../../contexts/RecipeContext";
import { useShopping } from "../../contexts/ShoppingContext";
import { BsCartCheckFill } from "react-icons/bs";

export default function RecipeModel({ recipe }) {
  const { setRecipeInfo } = useRecipe();
  const { list, setList } = useShopping();
  const isAdded = recipe.tags.every((tag) =>
    list.some((item) => item.name === tag),
  );

  if (!recipe) return null;

  function closeRecipe() {
    setRecipeInfo((prevRecipes) =>
      prevRecipes.map((r) =>
        r.id === recipe.id ? { ...r, isOpen: false } : r,
      ),
    );
  }

  function addIngredientToCart(tag) {
    const alreadyAdded = list.some((item) => item.name === tag);

    if (alreadyAdded) return;

    setList((prevList) => [
      ...prevList,
      {
        name: tag,
        check: false,
        id: crypto.randomUUID(),
      },
    ]);
  }

  function deleteRecipe() {
    setRecipeInfo((prevRecipes) =>
      prevRecipes.filter((r) => {
        return r.id != recipe.id;
      }),
    );
  }

  function addToCart() {
    const newItems = recipe.tags
      .filter((tag) => !list.some((item) => item.name === tag))
      .map((tag) => ({
        name: tag,
        check: false,
        id: crypto.randomUUID(),
      }));

    setList((prevList) => [...prevList, ...newItems]);
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
          <p
            style={{
              fontWeight: "lighter",
              fontSize: "15px",
              marginTop: "-15px",
            }}
          >
            اضغطي على المكون لاضافته على السلة
          </p>
          <ul className={styles.ingredientsList}>
            {recipe.tags?.map((tag) => {
              const isAdded = list.some((item) => item.name === tag);

              return (
                <li key={tag}>
                  <button
                    onClick={() => addIngredientToCart(tag)}
                    disabled={isAdded}
                  >
                    <span>{tag}</span>
                    {isAdded ? (
                      <BsCartCheckFill
                        style={{ marginRight: "10px", color: "var(--primary)" }}
                      />
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <p style={{ marginTop: "20px", fontWeight: "bold" }}>طريقة التحضير</p>
          <p> {recipe.steps}</p>
        </div>
        <div className={styles.btns}>
          {isAdded ? (
            <button className={styles.addToCart} disabled>
              المكونات انضافت للتسوق
            </button>
          ) : (
            <button className={styles.addToCart} onClick={addToCart}>
              اضف جميع المكونات للتسوق
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
