import { useNavigate } from "react-router-dom";
import { FaRegTrashCan } from "react-icons/fa6";
import styles from "./NotebookCard.module.css";
import { useNotebook } from "../../contexts/NotebookContext";

export default function NotebookCard({ notebook, recipeCount }) {
  const navigate = useNavigate();
  const { deleteNotebook } = useNotebook();

  function handleDelete(e) {
    e.stopPropagation();
    const sure = window.confirm(
      `أكيدة بدك تحذفي دفتر "${notebook.name}"؟ الوصفات جواه رح تضل موجودة بس بدون دفتر.`,
    );
    if (sure) deleteNotebook(notebook.id);
  }

  return (
    <div
      className={styles.card}
      onClick={() => navigate(`/notes/${notebook.id}`)}
    >
      <FaRegTrashCan className={styles.deleteIcon} onClick={handleDelete} />
      <span className={styles.emoji}>{notebook.emoji}</span>
      <p className={styles.name}>{notebook.name}</p>
      <p className={styles.count}>{recipeCount} وصفات</p>
    </div>
  );
}