import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  MdOutlineEmail,
  MdOutlineLock,
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
} from "react-icons/md";
import styles from "./LoginPage.module.css";

// نفس فكرة الـ validate تبع صفحة التسجيل، بس مختصرة لأنه هون بس إيميل وكلمة سر
function validate({ email, password }) {
  const errors = {};

  if (!email.trim()) {
    errors.email = "البريد الإلكتروني مطلوب";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "صيغة البريد الإلكتروني مش صحيحة";
  }

  if (!password) {
    errors.password = "كلمة السر مطلوبة";
  }

  return errors;
}

export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  // هاد الخطأ العام (مش خطأ حقل معين) - مثلاً "الإيميل أو كلمة السر غلط"
  const [formError, setFormError] = useState("");

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: null }));
    if (formError) setFormError("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    const foundErrors = validate(form);
    setErrors(foundErrors);
    if (Object.keys(foundErrors).length > 0) return;

    setLoading(true);
    setFormError("");

    // محاكاة استدعاء سيرفر - رح نستبدل هاد الجزء لاحقاً برح نربطه بـ Firebase
    setTimeout(() => {
      setLoading(false);
      navigate("/notes");
    }, 1000);
  }

  return (
    <div className={styles.page}>
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
            className={styles.signupBtn}
            onClick={() => navigate("/signup")}
          >
            إنشاء حساب
          </button>
          <button className={styles.loginBtn} onClick={() => navigate("/")}>
            الصفحة الرئيسية
          </button>
        </nav>
      </header>

      <div className={styles.content}>
        <div className={styles.card}>
          <h2 className={styles.title}>تسجيل الدخول</h2>
          <p className={styles.subtitle}>
            أهلاً فيكِ من جديد! سجّلي دخولك وكملي على دفترك.
          </p>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            {/* خطأ عام (مش خاص بحقل معين) */}
            {formError && (
              <div className={styles.formError}>{formError}</div>
            )}

            {/* البريد الإلكتروني */}
            <label className={styles.field}>
              <span className={styles.labelText}>البريد الإلكتروني</span>
              <div
                className={`${styles.inputWrapper} ${
                  errors.email ? styles.inputError : ""
                }`}
              >
                <MdOutlineEmail className={styles.fieldIcon} />
                <input
                  type="email"
                  placeholder="example@email.com"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  dir="ltr"
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <span className={styles.errorText}>{errors.email}</span>
              )}
            </label>

            {/* كلمة السر */}
            <label className={styles.field}>
              <span className={styles.labelText}>كلمة السر</span>
              <div
                className={`${styles.inputWrapper} ${
                  errors.password ? styles.inputError : ""
                }`}
              >
                <MdOutlineLock className={styles.fieldIcon} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="كلمة السر"
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  dir="ltr"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className={styles.toggleVisibility}
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label="إظهار/إخفاء كلمة السر"
                >
                  {showPassword ? (
                    <MdOutlineVisibilityOff />
                  ) : (
                    <MdOutlineVisibility />
                  )}
                </button>
              </div>
              {errors.password && (
                <span className={styles.errorText}>{errors.password}</span>
              )}
            </label>

            {/* تذكرني + نسيت كلمة السر */}
            <div className={styles.rowBetween}>
              <label className={styles.checkboxRow}>
                <input
                  type="checkbox"
                  checked={form.remember}
                  onChange={(e) => update("remember", e.target.checked)}
                />
                <span>تذكريني</span>
              </label>

              <Link to="/forgot-password" className={styles.forgotLink}>
                نسيتِ كلمة السر؟
              </Link>
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? "عم نتحقق..." : "تسجيل الدخول"}
            </button>
          </form>

          <p className={styles.switchText}>
            ما عندك حساب؟ <Link to="/signup">سجّلي حساب جديد</Link>
          </p>
        </div>
      </div>
    </div>
  );
}