import styles from "./AddRecipeModal.module.css";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { useRecipe } from "../../contexts/RecipeContext";
import { useNotebook } from "../../contexts/NotebookContext";

export default function AddRecipeModal() {
  const [Tags, setTags] = useState([]);
  const { isOpen, setIsOpen, recipeInfo, setRecipeInfo } = useRecipe();
  const { notebooks } = useNotebook();
  const [ingredient, setIngredient] = useState("");
  const [Name, setName] = useState("");
  const [Steps, setSteps] = useState("");
  const [Cals, setCals] = useState("");
  const [Time, setTime] = useState("");
  const [NotebookId, setNotebookId] = useState("");
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const [isCalculating, setIsCalculating] = useState(false);

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

  async function addRecipe() {
    if (!Name.trim()) {
      alert("اسم الوصفة مهم تدخليه");
      return;
    }
    const calories = await calcCals();

    setRecipeInfo((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: Name,
        steps: Steps,
        time: Time,
        cals: calories,
        tags: Tags,
        isFavorite: false,
        isOpen: false,
        notebookId: NotebookId || null,
      },
    ]);

    setName("");
    setSteps("");
    setTime("");
    setCals("");
    setTags([]);
    setIngredient("");
    setNotebookId("");

    setIsOpen(false);
  }

  async function calcCals() {
    setIsCalculating(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Estimate the total calories for ONE serving of this recipe.

Recipe:
${Name}

Ingredients:
${Tags.join(", ")}

Steps:
${Steps}

Return ONLY one whole number representing the estimated calories.

IMPORTANT:
- Calculate the calories for ONE serving only.
- Use the ingredient quantities provided.
- Return nothing except the number.
- No "calories", no kcal, no explanation, no punctuation.

Example output:
400`,
                  },
                ],
              },
            ],
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        throw new Error("يوجد خطأ");
      }

      const data = await response.json();

      const calories = data.candidates?.[0]?.content?.parts?.[0]?.text;

      setCals(calories);

      return calories;
    } catch (error) {
      console.error(error);
      return "";
    } finally {
      setIsCalculating(false);
    }
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

          <div className={styles.field}>
            <label>الدفتر (اختياري)</label>
            <select
              className={styles.inputField}
              value={NotebookId}
              onChange={(e) => setNotebookId(e.target.value)}
            >
              <option value="">بدون دفتر</option>
              {notebooks.map((notebook) => (
                <option key={notebook.id} value={notebook.id}>
                  {notebook.emoji} {notebook.name}
                </option>
              ))}
            </select>
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
            <div className={styles.caloriesBox}>
              <label>السعرات الحرارية للفرد الواحد</label>

              <div className={styles.caloriesInput}>
                <span>
                  {isCalculating
                    ? "جاري حساب السعرات..."
                    : Cals
                      ? `${Cals} سعرة`
                      : "لم يتم حسابها بعد"}
                </span>

                <button
                  type="button"
                  onClick={calcCals}
                  disabled={isCalculating}
                >
                  {isCalculating ? (
                    <>
                      <span className={styles.spinner}></span>
                      جاري الحساب
                    </>
                  ) : Cals ? (
                    "إعادة الحساب"
                  ) : (
                    "احسبي"
                  )}
                </button>
              </div>
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
