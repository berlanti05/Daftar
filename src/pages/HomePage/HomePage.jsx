import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdNote,
  MdLightbulb,
  MdShoppingCart,
  MdCalendarToday,
} from "react-icons/md";
import { FiSend } from "react-icons/fi";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const navigate = useNavigate();

  const [ingredients, setIngredients] = useState("");

  const features = [
    {
      icon: <MdNote />,
      title: "دفتري",
      desc: "احفظي وصفاتك ونظّميها بدفاتر حسب ما بتحبي، وارجعيلها بأي وقت.",
    },
    {
      icon: <MdLightbulb />,
      title: "اقترحيلي",
      desc: "اكتبي شو موجود عندك بالبيت، وخلي الذكاء الاصطناعي يقترحلك طبخة.",
    },
    {
      icon: <MdShoppingCart />,
      title: "التسوق",
      desc: "لستة تسوق ذكية بتتبنى لحالها من مكونات الوصفات يلي بدك تحضريها.",
    },
    {
      icon: <MdCalendarToday />,
      title: "المخطط",
      desc: "خططي وجباتك على مدار الأسبوع وما تحتاري شو رح تطبخي اليوم.",
    },
  ];

  return (
    <div className={styles.page}>
      {/* ================= NAVBAR ================= */}
      <header className={styles.navbar}>
        <div className={styles.logo}>
          <div className={styles.logoImageWrapper}>
            <img src="/images/logo2.jpeg" alt="سيدة ملعقة" />
          </div>
          <div className={styles.logoText}>
            <h1>سيدة ملعقة</h1>
            <p>وصفات بحب</p>
          </div>
        </div>

        <nav className={styles.navActions}>
          <button
            className={styles.loginBtn}
            onClick={() => navigate("/login")}
          >
            تسجيل الدخول
          </button>
          <button
            className={styles.signupBtn}
            onClick={() => navigate("/signup")}
          >
            إنشاء حساب
          </button>
        </nav>
      </header>

      {/* ================= HERO ================= */}
      <section className={styles.hero}>
        <div className={styles.heroStitch}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <h2 className={styles.heroTitle}>مطبخك كله، بدفتر واحد</h2>
        <p className={styles.heroSubtitle}>
          سيدة ملعقة هو دفتر مطبخك الرقمي: احفظي وصفاتك، خططي وجباتك، جهزي قائمة
          التسوق، وخلي الذكاء الاصطناعي يقترحلك شو تطبخي من يلي موجود عندك
          بالبيت.
        </p>

        <div className={styles.heroActions}>
          <button
            className={styles.ctaPrimary}
            onClick={() => navigate("/signup")}
          >
            ابدئي مجانًا
          </button>
          <button
            className={styles.ctaSecondary}
            onClick={() => navigate("/login")}
          >
            عندي حساب، تسجيل دخول
          </button>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className={styles.features}>
        <h3 className={styles.sectionTitle}>شو رح تلاقي بالموقع؟</h3>
        <div className={styles.featuresGrid}>
          {features.map((f, i) => (
            <div className={styles.featureCard} key={i}>
              <span className={styles.featureIcon}>{f.icon}</span>
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= TRY "اقترحيلي" DEMO ================= */}
      <section className={styles.trySection}>
        <div className={styles.tryCard}>
          <div className={styles.tryHeader}>
            <span className={styles.tryIcon}>
              <MdLightbulb />
            </span>
            <div>
              <h3>جربي ميزة "اقترحيلي"</h3>
              <p>
                اكتبي شوي مكونات موجودة عندك بالبيت (متل: بيض، بصل، بطاطا) وشوفي
                كيف رح تكون التجربة.
              </p>
            </div>
          </div>

          <form className={styles.tryForm}>
            <input
              type="text"
              placeholder="مثال: بيض، بصل، بطاطا..."
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />
            <button type="submit">
              <FiSend />
              اقترحيلي
            </button>
          </form>

          {/* {tried && (
            <div className={styles.tryResult}>
              {loading ? (
                <p className={styles.tryLoading}>عم فكر بأحلى طبخة إلك...</p>
              ) : (
                suggestion && (
                  <div className={styles.suggestionCard}>
                    <div className={styles.suggestionHead}>
                      <h4>{suggestion.name}</h4>
                      <span>{suggestion.time}</span>
                    </div>
                    <p>{suggestion.desc}</p>
                  </div>
                )
              )}
            </div>
          )} */}
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className={styles.about}>
        <div className={styles.aboutImageWrapper}>
          <img src="/images/logo2.jpeg" alt="سيدة ملعقة" />
        </div>
        <div className={styles.aboutText}>
          <h3 className={styles.sectionTitle}>ليش سيدة ملعقة؟</h3>
          <p>
            كل وحدة فينا عندها وصفاتها المفضلة، إما بمذكرة ورقية ولا بصور
            متبعثرة عالموبايل. سيدة ملعقة جايي تجمعلك كل هاد بمكان واحد، مرتب
            وسهل الوصول، وبيساعدك كمان تقرري شو تطبخي اليوم من غير ما تحتاري أو
            تدوري كتير.
          </p>
        </div>
      </section>

      {/* ================= FOOTER CTA ================= */}
      <footer className={styles.footer}>
        <h3>يلا، جهزي دفترك الأول</h3>
        <button
          className={styles.ctaPrimary}
          onClick={() => navigate("/signup")}
        >
          إنشاء حساب مجاني
        </button>
        <p className={styles.footerNote}>© سيدة ملعقة — وصفات بحب</p>
      </footer>
    </div>
  );
}
