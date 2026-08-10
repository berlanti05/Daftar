import styles from "./DayCard.module.css";
import { useRecipe } from "../../contexts/RecipeContext";
import { useState, useEffect } from "react";
import {
  MdFreeBreakfast,
  MdLunchDining,
  MdDinnerDining,
  MdIcecream,
  MdKeyboardArrowDown,
  MdLocalFireDepartment,
} from "react-icons/md";

const MEALS = [
  { key: "breakfast", label: "الفطور", icon: <MdFreeBreakfast /> },
  { key: "lunch", label: "الغداء", icon: <MdLunchDining /> },
  { key: "dinner", label: "العشاء", icon: <MdDinnerDining /> },
  { key: "dessert", label: "حلوى", icon: <MdIcecream /> },
];

export default function DayCard({ day }) {
  const { recipeInfo } = useRecipe();
  const [daysPlanning, setDaysPlanning] = useState(() => {
    const saved = localStorage.getItem(`planning-${day}`);

    return saved
      ? JSON.parse(saved)
      : {
          breakfast: "",
          lunch: "",
          dinner: "",
          dessert: "",
        };
  });

  useEffect(() => {
    localStorage.setItem(`planning-${day}`, JSON.stringify(daysPlanning));
  }, [daysPlanning, day]);

  function handleMealChange(meal, recipeId) {
    setDaysPlanning((prev) => ({
      ...prev,
      [meal]: recipeId,
    }));
  }

  const totalCals = Object.values(daysPlanning).reduce((total, recipeName) => {
    const recipe = recipeInfo.find((r) => r.name === recipeName);

    return total + (recipe ? Number(recipe.cals) : 0);
  }, 0);

  return (
    <div className={styles.card}>
      <div className={styles.dayRibbon}>
        <p className={styles.day}>{day}</p>
      </div>

      {MEALS.map((meal, index) => (
        <div key={meal.key}>
          <div className={styles.feild}>
            <label className={styles.mealLabel}>
              <span className={styles.mealIcon}>{meal.icon}</span>
              {meal.label}
            </label>
            <div className={styles.selectWrapper}>
              <select
                value={daysPlanning[meal.key]}
                onChange={(e) => handleMealChange(meal.key, e.target.value)}
              >
                <option value="" disabled>
                  اختاري وصفة
                </option>
                {recipeInfo.map((recipe) => (
                  <option value={recipe.name} key={recipe.id}>
                    {recipe.name}
                  </option>
                ))}
              </select>
              <MdKeyboardArrowDown className={styles.selectArrow} />
            </div>
          </div>

          {index < MEALS.length - 1 && (
            <div className="side-stitch">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
        </div>
      ))}

      <div className={styles.cals}>
        <MdLocalFireDepartment className={styles.calsIcon} />
        <label>السعرات الحرارية</label>
        <p>{totalCals}</p>
      </div>
    </div>
  );
}
