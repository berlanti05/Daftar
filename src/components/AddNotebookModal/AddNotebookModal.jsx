import styles from "./AddNotebookModal.module.css";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { useNotebook } from "../../contexts/NotebookContext";

const EMOJIS = ["🍰", "🍪", "🥘", "🥗", "🍞", "🍹", "🍕", "🍜", "🍳", "🧁"];

export default function AddNotebookModal() {
  const { setIsAddOpen, addNotebook } = useNotebook();
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState(EMOJIS[0]);

  function handleSave() {
    if (!name.trim()) {
      alert("اسم الدفتر مهم تدخليه");
      return;
    }
    addNotebook(name.trim(), emoji);
    setIsAddOpen(false);
  }

  return (
    <div className={styles.overlay} onClick={() => setIsAddOpen(false)}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <IoClose className={styles.close} onClick={() => setIsAddOpen(false)} />
        <h1>دفتر جديد</h1>

        <div className={styles.field}>
          <label className={styles.label}>اسم الدفتر</label>
          <input
            className={styles.inputField}
            placeholder="مثال: حلوياتي"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>اختاري أيقونة</label>
          <div className={styles.emojiGrid}>
            {EMOJIS.map((e) => (
              <button
                key={e}
                type="button"
                className={
                  e === emoji ? styles.emojiActive : styles.emojiBtn
                }
                onClick={() => setEmoji(e)}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        <button className={styles.saveBtn} onClick={handleSave}>
          حفظ الدفتر
        </button>
      </div>
    </div>
  );
}