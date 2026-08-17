import { useRef } from "react";
import styles from "./PlanPage.module.css";
import DayCard from "../../components/DayCard/DayCard";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function PlanPage() {
  const sliderRef = useRef(null);

  const days = [
    "الجمعة",
    "السبت",
    "الأحد",
    "الاثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
  ];

  function scrollLeft() {
    sliderRef.current.scrollBy({
      left: -350,
      behavior: "smooth",
    });
  }

  function scrollRight() {
    sliderRef.current.scrollBy({
      left: 350,
      behavior: "smooth",
    });
  }

  return (
    <div className={styles.app}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1>مخطط الأسبوع</h1>
          <p>حددي وصفة لكل يوم من دفترك</p>
        </div>

        <div className={styles.sliderWrapper}>
          <button
            className={`${styles.arrow} ${styles.rightArrow}`}
            onClick={scrollRight}
          >
            ‹
          </button>

          <div className={styles.cardsContainer} ref={sliderRef}>
            {days.map((day) => (
              <DayCard key={day} day={day} />
            ))}
          </div>

          <button
            className={`${styles.arrow} ${styles.leftArrow}`}
            onClick={scrollLeft}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
