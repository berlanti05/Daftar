import styles from "./RecipeResult.module.css";
import { TbSparkleHighlight } from "react-icons/tb";
import { GiCookingPot } from "react-icons/gi";
import { FaFire } from "react-icons/fa";
import { IoIosTimer } from "react-icons/io";
import { useRecipe } from "../../contexts/RecipeContext";

import { useEffect, useState } from "react";
import { useNotebook } from "../../contexts/NotebookContext";

export default function RecipeResult({ Tags }) {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [NotebookId, setNotebookId] = useState("");
  const { setRecipeInfo } = useRecipe();
  const [saved, setSaved] = useState(false);
  const { notebooks } = useNotebook();

  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  function tryAgain() {
    setError(false);
    setSaved(false);
    setNotebookId("");

    getRecipe();
  }

  function addRecipe() {
    if (!recipe) return;

    setRecipeInfo((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: recipe.name,
        steps: recipe.steps,
        time: recipe.time,
        cals: recipe.cals,
        tags: recipe.tags,
        isFavorite: false,
        isOpen: false,
        notebookId: NotebookId ? Number(NotebookId) : null,
      },
    ]);
    setSaved(true);
  }
  const getRecipe = async () => {
    setLoading(true);
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
                    text: `You are "سيدة الملعقة", a warm Arabic cooking assistant. Suggest ONE simple, delicious recipe using mainly these ingredients the user has at home: ${Tags.join(", ")}.


You may add a few very common pantry staples (salt, pepper, oil, water) if needed, but rely mainly on the given ingredients.

Reply in Arabic (warm, simple, friendly tone), and return ONLY valid JSON, no markdown, no backticks, in exactly this shape:
{
  "name": "اسم الوصفة",
  "time": "XX دقيقة",
  "cals": 000,
  "tags": ["مكون1", "مكون2"],
  "steps": "1. ...\\n2. ...\\n3. ..."
}

IMPORTANT:
- "tags" must list the ingredients actually used, in Arabic.
- "cals" is a number estimate for one serving, no units, digits only.
- "steps" is a short numbered set of steps separated by \\n.
- Return nothing except this JSON object.`,
                  },
                ],
              },
            ],
          }),
        },
      );
      const data = await response.json();

      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

      const parsedRecipe = JSON.parse(text);
      setRecipe(parsedRecipe);
    } catch (error) {
      setError(true);
      console.log(error);
      return "";
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!Tags || Tags.length === 0) return;

    getRecipe();
  }, [Tags]);

  return (
    <div className={styles.container}>
      {Tags === null ? (
        <div className={styles.cardbefore}>
          <div className={styles.before}>
            <TbSparkleHighlight className={styles.sparkle} />
            <p> اقتراحاتك رح تطلع هون.</p>{" "}
          </div>
        </div>
      ) : Tags.length === 0 ? (
        <div className={styles.cardbefore}>
          <div className={styles.before}>ضيفي مكوّن وحد ع الأقل.</div>
        </div>
      ) : loading ? (
        <div className={styles.cardbefore}>
          <div className={styles.before}>
            عم دوّر بمخزون وصفاتي ... ثانية وبكون عندك
          </div>
        </div>
      ) : recipe ? (
        <div className={styles.cardafter}>
          <div className={styles.hero}>
            <GiCookingPot
              style={{
                fontSize: "40px",
                marginTop: "30px",
                color: "var(--primary)",
              }}
            />
            <div>
              <p> اقتراحي الك</p>
              <h3> {recipe.name}</h3>
            </div>
          </div>
          <div className={styles.feilds}>
            <p>
              <FaFire style={{ paddingLeft: "5px" }} /> {recipe.cals}
            </p>
            <p>
              <IoIosTimer style={{ paddingLeft: "5px" }} /> {recipe.time}
            </p>
          </div>
          <h4 style={{ marginRight: "40px" }}> المكونات</h4>
          <div className={styles.tags}>
            {recipe.tags.map((tag, index) => (
              <p key={index}>{tag}</p>
            ))}
          </div>
          <h4 style={{ marginRight: "40px" }}> طريقة التحضير</h4>
          <div style={{ marginRight: "40px" }}>
            {recipe.steps.split("\n").map((step, index) => (
              <p key={index}>{step}</p>
            ))}
          </div>
          <div>
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
            <button
              className={styles.tryAgain}
              onClick={addRecipe}
              disabled={saved}
            >
              {saved ? "تم الحفظ" : "احفظيها بدفتري"}
            </button>
            <button
              className={styles.tryAgain}
              style={{
                backgroundColor: "var(--softbackground)",
                color: "var(--secondary)",
                border: "1px solid var(--border)",
              }}
              onClick={tryAgain}
            >
              اقترحيلي غيرها
            </button>
          </div>
        </div>
      ) : error ? (
        <div className={styles.cardbefore}>
          <div className={styles.before}>
            ما قدرنا نجهز اقتراح. جربي مرة ثانية!.
          </div>
          <button className={styles.tryAgain} onClick={tryAgain}>
            حاولي مرة ثانية
          </button>
        </div>
      ) : null}
    </div>
  );
}
