import styles from "./RecipeCard.module.css";
import { FaRegHeart } from "react-icons/fa";
import { IoIosTimer } from "react-icons/io";
import { FaFire } from "react-icons/fa";

export default function RecipeCard({ recipe }) {
  return (
    <div className={styles.card}>
      <FaRegHeart className={styles.heart} />
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
  );
}
