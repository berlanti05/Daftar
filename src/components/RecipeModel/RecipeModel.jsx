import styles from "./RecipeModel.module.css";
import { IoClose } from "react-icons/io5";
import { IoIosTimer } from "react-icons/io";
import { FaFire } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";

export default function RecipeModel({ recipe }) {
  if (!recipe) return null;
  return (
    <div className={styles.overlay}>
      <IoClose className={styles.close} />
      <div className={styles.modal}>
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
          <p> {recipe.steps}</p>
        </div>
        <div className={styles.btns}>
          <button className={styles.addToCart}> اضف المكونات للتسوق</button>
          <button className={styles.delete}>
            <FaRegTrashCan />
          </button>
        </div>
      </div>
    </div>
  );
}
