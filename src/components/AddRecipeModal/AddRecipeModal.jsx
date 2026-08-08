import styles from "./AddRecipeModal.module.css";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { useRecipe } from "../../contexts/RecipeContext";

export default function AddRecipeModal() {
  const [Tags, setTags] = useState([]);
  const { isOpen, setIsOpen, recipeInfo, setRecipeInfo } = useRecipe();
  const [ingredient, setIngredient] = useState("");
  const [Name, setName] = useState("");
  const [Steps, setSteps] = useState("");
  const [Cals, setCals] = useState("");
  const [Time, setTime] = useState("");

  const addTag = () => {
    const trimmed = ingredient.trim();
    if (trimmed && !Tags.includes(trimmed)) {
      setTags([...Tags, trimmed]);
    }
    setIngredient("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(Tags.filter((t) => t !== tagToRemove));
  };

  function addRecipe() {
    if (!Name.trim()) {
      alert("اسم الوصفة مهم تدخليه");
      return;
    }
    setRecipeInfo((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: Name,
        steps: Steps,
        time: Time,
        cals: Cals,
        tags: Tags,
        isFavorite: false,
        isOpen: false,
      },
    ]);

    setName("");
    setSteps("");
    setTime("");
    setCals("");
    setTags([]);
    setIngredient("");

    setIsOpen(false);
  }

  return (
    <div className={styles.overlay} onClick={() => setIsOpen(false)}>
      <IoClose className={styles.close} onClick={() => setIsOpen(false)} />
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h1>وصفة جديدة</h1>

        <div className={styles.field}>
          <label className={styles.label}>اسم الوصفة</label>
          <input
            className={styles.inputField}
            placeholder="مثال: مقلوبة دجاج"
            value={Name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={styles.wrapper}>
          <label className={styles.label}>
            المكونات (اكتبي وحدة واضغطي Enter)
          </label>

          <div className={styles.inputBox}>
            {Tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                <button
                  onClick={() => removeTag(tag)}
                  className={styles.removeBtn}
                >
                  <IoClose className={styles.removeBtn} />
                </button>
                {tag}
              </span>
            ))}

            <input
              type="text"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="مثال: طماطم"
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label>طريقة التحضير </label>
            <textarea
              rows="4"
              placeholder="1. اسلقي الدجاج...
2. حمّري الرز..."
              value={Steps}
              onChange={(e) => setSteps(e.target.value)}
            ></textarea>
          </div>

          <div className={styles.fieldRow}>
            <div className={styles.field}>
              <label>وقت التحضير</label>
              <input
                placeholder="مثال: 45 دقيقة"
                value={Time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label>السعرات (تقريبي)</label>
              <input
                placeholder="مثال: 450 سعرة"
                value={Cals}
                onChange={(e) => setCals(e.target.value)}
              />
            </div>
          </div>
          <button className={styles.saveBtn} onClick={addRecipe}>
            حفظ الوصفة بالدفتر
          </button>
        </div>
      </div>
    </div>
  );
}
