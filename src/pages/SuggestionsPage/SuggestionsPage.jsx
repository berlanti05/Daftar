import styles from "./SuggestionsPage.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import SuggestionsCard from "../../components/suggestionsCard/suggestionsCard";
import RecipeResult from "../../components/RecipeResult/RecipeResult";
import { useState } from "react";

export default function SuggestionsPage() {
  const [Tags, setTags] = useState([]);
  const [submittedTags, setSubmittedTags] = useState(null);

  const handleGenerate = () => {
    setSubmittedTags([...Tags]);
  };

  return (
    <div className={styles.app}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1>اقترحيلي وصفة</h1>
          <p>اكتبي المكونات الموجودة عندك، ونقترحلك وصفات جاهزة.</p>
        </div>

        <div className={styles.component}>
          <SuggestionsCard
            Tags={Tags}
            setTags={setTags}
            onGenerate={handleGenerate}
          />

          <RecipeResult Tags={submittedTags} />
        </div>
      </div>
    </div>
  );
}
