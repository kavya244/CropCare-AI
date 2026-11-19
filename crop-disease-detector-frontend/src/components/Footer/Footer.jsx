import { Leaf } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import "./Footer.css";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer-brand">
        <Leaf size={22} />
        <strong>{t("brand")}</strong>
      </div>
      <p>{t("footer")}</p>
      <small>© 2026 CropCare AI. College Project.</small>
    </footer>
  );
}