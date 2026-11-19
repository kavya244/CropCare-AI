
import { useLanguage } from "../../context/LanguageContext";
import "./LanguageSelector.css";

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="language-buttons">
      <button
        type="button"
        className={language === "en" ? "active-language" : ""}
        onClick={() => setLanguage("en")}
        aria-pressed={language === "en"}
      >
        English
      </button>

      <button
        type="button"
        className={language === "kn" ? "active-language" : ""}
        onClick={() => setLanguage("kn")}
        aria-pressed={language === "kn"}
      >
        ಕನ್ನಡ
      </button>
    </div>
  );
}
