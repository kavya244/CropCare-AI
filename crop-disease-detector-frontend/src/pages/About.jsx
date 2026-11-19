
import { Leaf, Target, Lightbulb, Users } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import "./About.css";

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="page-container about-page">

      {/* Page heading */}
      <div className="page-heading">
        <span>{t("aboutLabel")}</span>
        <h1>{t("aboutTitle")}</h1>
        <p>{t("aboutSubtitle")}</p>
      </div>

      {/* About banner */}
      <div className="about-banner">
        <Leaf size={55} />

        <h2>{t("aboutBannerTitle")}</h2>

        <p>{t("aboutBannerText")}</p>
      </div>

      {/* About cards */}
      <div className="about-grid">

        <div className="about-card">
          <Target size={32} />

          <h3>{t("problemTitle")}</h3>

          <p>{t("problemText")}</p>
        </div>

        <div className="about-card">
          <Lightbulb size={32} />

          <h3>{t("solutionTitle")}</h3>

          <p>{t("solutionText")}</p>
        </div>

        <div className="about-card">
          <Users size={32} />

          <h3>{t("goalTitle")}</h3>

          <p>{t("goalText")}</p>
        </div>

      </div>

      {/* Disclaimer */}
      <div className="disclaimer-box">
        <strong>{t("important")}</strong>{" "}
        {t("disclaimer")}
      </div>

    </div>
  );
}
