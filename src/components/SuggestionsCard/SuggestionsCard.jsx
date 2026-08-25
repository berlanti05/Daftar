import styles from "./SuggestionsCard.module.css";
import { IoClose } from "react-icons/io5";
import { useState } from "react";

export default function SuggestionsCard({ Tags, setTags, onGenerate }) {
  const [ingredient, setIngredient] = useState("");

  const removeTag = (tagToRemove) => {
    setTags(Tags.filter((t) => t !== tagToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    const trimmed = ingredient.trim();
    if (trimmed && !Tags.includes(trimmed)) {
      setTags([...Tags, trimmed]);
    }
    setIngredient("");
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>شو عندك بالبيت؟</h3>
      <p className={styles.text}>
        ضيفي مكوّن مكوّن، ونحن نرجعلك وصفات وخطوات وتقدير للسعرات ووقت التحضير.
      </p>
      <div className={styles.wrapper}>
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
            placeholder="اكتبي مكوّن واضغطي Enter ..."
            className={styles.input}
          />
        </div>
      </div>
      <button className={styles.aiButton} onClick={onGenerate}>
        اعطيني وصفة
      </button>
    </div>
  );
}
