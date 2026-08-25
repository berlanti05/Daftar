import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  MdOutlinePerson,
  MdOutlineEmail,
  MdOutlineLock,
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
} from "react-icons/md";
import styles from "./RegisterPage.module.css";

function validate({ name, email, password, confirm, agree }) {
  const errors = {};

  if (!name.trim()) errors.name = "الاسم مطلوب";

  if (!email.trim()) {
    errors.email = "البريد الإلكتروني مطلوب";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "صيغة البريد الإلكتروني مش صحيحة";
  }

  if (!password) {
    errors.password = "كلمة السر مطلوبة";
  } else if (password.length < 8) {
    errors.password = "لازم تكون كلمة السر 8 حروف عالأقل";
  }

  if (confirm !== password) {
    errors.confirm = "كلمتا السر مش متطابقتين";
  }

  if (!agree) errors.agree = "لازم توافقي على الشروط قبل ما تكملي";

  return errors;
}

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    agree: false,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: null }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const foundErrors = validate(form);
    setErrors(foundErrors);
    if (Object.keys(foundErrors).length > 0) return;

    setLoading(true);
    // محاكاة استدعاء سيرفر - رح تنشال هاي الجزئية وقت ما نربط نظام التسجيل الحقيقي
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
            className={styles.loginBtn}
            onClick={() => navigate("/login")}
          >
            تسجيل الدخول
          </button>
          <button className={styles.signupBtn} onClick={() => navigate("/")}>
            الصفحة الرئيسية
          </button>
        </nav>
      </header>
      <div className={styles.content}>
        <div className={styles.card}>
          <h2 className={styles.title}>إنشاء حساب جديد</h2>
          <p className={styles.subtitle}>
            سجّلي بثواني وابدئي جهزي دفتر وصفاتك الخاص.
          </p>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            {/* الاسم */}
            <label className={styles.field}>
              <span className={styles.labelText}>الاسم الكامل</span>
              <div
                className={`${styles.inputWrapper} ${
                  errors.name ? styles.inputError : ""
                }`}
              >
                <MdOutlinePerson className={styles.fieldIcon} />
                <input
                  type="text"
                  placeholder="اسمك متل ما بتحبي يظهر"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                />
              </div>
              {errors.name && (
                <span className={styles.errorText}>{errors.name}</span>
              )}
            </label>

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
                  placeholder="8 حروف عالأقل"
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  dir="ltr"
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

            {/* تأكيد كلمة السر */}
            <label className={styles.field}>
              <span className={styles.labelText}>تأكيد كلمة السر</span>
              <div
                className={`${styles.inputWrapper} ${
                  errors.confirm ? styles.inputError : ""
                }`}
              >
                <MdOutlineLock className={styles.fieldIcon} />
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="عيدي كتابة كلمة السر"
                  value={form.confirm}
                  onChange={(e) => update("confirm", e.target.value)}
                  dir="ltr"
                />
                <button
                  type="button"
                  className={styles.toggleVisibility}
                  onClick={() => setShowConfirm((v) => !v)}
                  aria-label="إظهار/إخفاء تأكيد كلمة السر"
                >
                  {showConfirm ? (
                    <MdOutlineVisibilityOff />
                  ) : (
                    <MdOutlineVisibility />
                  )}
                </button>
              </div>
              {errors.confirm && (
                <span className={styles.errorText}>{errors.confirm}</span>
              )}
            </label>

            {/* الموافقة على الشروط */}
            <label className={styles.checkboxRow}>
              <input
                type="checkbox"
                checked={form.agree}
                onChange={(e) => update("agree", e.target.checked)}
              />
              <span>موافقة على شروط الاستخدام وسياسة الخصوصية</span>
            </label>
            {errors.agree && (
              <span className={styles.errorText}>{errors.agree}</span>
            )}

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? "عم نجهزلك حسابك..." : "إنشاء حساب"}
            </button>
          </form>

          <p className={styles.switchText}>
            عندك حساب أصلاً؟ <Link to="/login">سجّلي دخول</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
