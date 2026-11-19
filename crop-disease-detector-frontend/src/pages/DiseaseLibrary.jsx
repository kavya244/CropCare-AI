
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import "./DiseaseLibrary.css";

const diseases = [
  {
    name: { en: "Early Blight", kn: "ಆರಂಭಿಕ ಅಂಗಮಾರಿ ರೋಗ" },
    crop: { en: "Tomato", kn: "ಟೊಮೇಟೊ" },
    cause: { en: "Fungal disease", kn: "ಶಿಲೀಂಧ್ರ ರೋಗ" },
    symptoms: {
      en: "Brown spots with circular or target-like patterns on leaves.",
      kn: "ಎಲೆಗಳ ಮೇಲೆ ವೃತ್ತಾಕಾರದ ಅಥವಾ ಗುರಿಯಾಕಾರದ ಕಂದು ಬಣ್ಣದ ಕಲೆಗಳು ಕಾಣಿಸುತ್ತವೆ."
    },
    advice: {
      en: "Remove badly affected leaves and seek expert guidance.",
      kn: "ತೀವ್ರವಾಗಿ ಬಾಧಿತ ಎಲೆಗಳನ್ನು ತೆಗೆದುಹಾಕಿ ಮತ್ತು ತಜ್ಞರ ಸಲಹೆ ಪಡೆಯಿರಿ."
    }
  },
  {
    name: { en: "Late Blight", kn: "ತಡವಾದ ಅಂಗಮಾರಿ ರೋಗ" },
    crop: { en: "Tomato / Potato", kn: "ಟೊಮೇಟೊ / ಆಲೂಗಡ್ಡೆ" },
    cause: { en: "Oomycete disease", kn: "ಊಮೈಸೀಟ್‌ನಿಂದ ಉಂಟಾಗುವ ರೋಗ" },
    symptoms: {
      en: "Dark, water-soaked-looking patches on leaves.",
      kn: "ಎಲೆಗಳ ಮೇಲೆ ನೀರಿನಿಂದ ನೆನೆದಂತೆ ಕಾಣುವ ಕಪ್ಪು ಕಲೆಗಳು."
    },
    advice: {
      en: "Monitor plants carefully and consult an agricultural expert.",
      kn: "ಗಿಡಗಳನ್ನು ಎಚ್ಚರಿಕೆಯಿಂದ ಗಮನಿಸಿ ಮತ್ತು ಕೃಷಿ ತಜ್ಞರನ್ನು ಸಂಪರ್ಕಿಸಿ."
    }
  },
  {
    name: { en: "Powdery Mildew", kn: "ಬೂದಿ ರೋಗ" },
    crop: { en: "Various crops", kn: "ವಿವಿಧ ಬೆಳೆಗಳು" },
    cause: { en: "Fungal disease", kn: "ಶಿಲೀಂಧ್ರ ರೋಗ" },
    symptoms: {
      en: "White powder-like patches on leaves.",
      kn: "ಎಲೆಗಳ ಮೇಲೆ ಬಿಳಿ ಪುಡಿಯಂತಹ ಕಲೆಗಳು ಕಾಣಿಸುತ್ತವೆ."
    },
    advice: {
      en: "Improve air circulation and seek appropriate crop-specific advice.",
      kn: "ಗಾಳಿಯ ಸಂಚಾರವನ್ನು ಸುಧಾರಿಸಿ ಮತ್ತು ಬೆಳೆಗೆ ಸೂಕ್ತವಾದ ಸಲಹೆ ಪಡೆಯಿರಿ."
    }
  },
  {
    name: { en: "Leaf Rust", kn: "ಎಲೆ ತುಕ್ಕು ರೋಗ" },
    crop: { en: "Wheat", kn: "ಗೋಧಿ" },
    cause: { en: "Fungal disease", kn: "ಶಿಲೀಂಧ್ರ ರೋಗ" },
    symptoms: {
      en: "Orange or reddish-brown rust-like pustules on leaves.",
      kn: "ಎಲೆಗಳ ಮೇಲೆ ಕಿತ್ತಳೆ ಅಥವಾ ಕೆಂಪು ಮಿಶ್ರಿತ ಕಂದು ಬಣ್ಣದ ತುಕ್ಕಿನಂತಹ ಗುಳ್ಳೆಗಳು ಕಾಣಿಸುತ್ತವೆ."
    },
    advice: {
      en: "Check nearby plants and consult an agricultural officer.",
      kn: "ಹತ್ತಿರದ ಗಿಡಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಕೃಷಿ ಅಧಿಕಾರಿಯನ್ನು ಸಂಪರ್ಕಿಸಿ."
    }
  }
];

const translations = {
  en: {
    eyebrow: "LEARN ABOUT PLANT HEALTH",
    title: "Disease Library",
    subtitle: "Explore common crop disease symptoms and basic guidance.",
    search: "Search disease or crop...",
    cause: "Cause",
    symptoms: "Symptoms",
    guidance: "Guidance",
    empty: "No matching diseases found.",
    note: "This library provides general educational information, not a confirmed diagnosis or a chemical-treatment prescription."
  },
  kn: {
    eyebrow: "ಸಸ್ಯಗಳ ಆರೋಗ್ಯದ ಬಗ್ಗೆ ತಿಳಿಯಿರಿ",
    title: "ರೋಗಗಳ ಗ್ರಂಥಾಲಯ",
    subtitle: "ಸಾಮಾನ್ಯ ಬೆಳೆ ರೋಗಗಳ ಲಕ್ಷಣಗಳು ಮತ್ತು ಮೂಲಭೂತ ಮಾರ್ಗದರ್ಶನವನ್ನು ತಿಳಿಯಿರಿ.",
    search: "ರೋಗ ಅಥವಾ ಬೆಳೆಯನ್ನು ಹುಡುಕಿ...",
    cause: "ಕಾರಣ",
    symptoms: "ಲಕ್ಷಣಗಳು",
    guidance: "ಮಾರ್ಗದರ್ಶನ",
    empty: "ಹೊಂದಾಣಿಕೆಯ ರೋಗಗಳು ಕಂಡುಬಂದಿಲ್ಲ.",
    note: "ಈ ಗ್ರಂಥಾಲಯವು ಸಾಮಾನ್ಯ ಶೈಕ್ಷಣಿಕ ಮಾಹಿತಿಯನ್ನು ಒದಗಿಸುತ್ತದೆ. ಇದು ಖಚಿತ ರೋಗನಿರ್ಣಯ ಅಥವಾ ರಾಸಾಯನಿಕ ಚಿಕಿತ್ಸೆಯ ಸೂಚನೆಯಲ್ಲ."
  }
};

export default function DiseaseLibrary() {
  const [search, setSearch] = useState("");
  const { language } = useLanguage();

  const isKannada = language === "kn";
  const lang = isKannada ? "kn" : "en";
  const t = translations[lang];

  const filteredDiseases = diseases.filter((disease) => {
    const searchableText = [
      disease.name.en,
      disease.name.kn,
      disease.crop.en,
      disease.crop.kn
    ].join(" ").toLowerCase();

    return searchableText.includes(search.trim().toLowerCase());
  });

  return (
    <div className="page-container">
      <div className="page-heading">
        <span>{t.eyebrow}</span>
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
      </div>

      <input
        className="search-input"
        type="text"
        placeholder={t.search}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label={t.search}
      />

      <div className="disease-grid">
        {filteredDiseases.map((disease) => (
          <article className="disease-card" key={disease.name.en}>
            <div className="disease-icon">🌿</div>

            <span className="disease-crop">
              {disease.crop[lang]}
            </span>

            <h2>{disease.name[lang]}</h2>

            <p>
              <strong>{t.cause}:</strong> {disease.cause[lang]}
            </p>

            <p>
              <strong>{t.symptoms}:</strong> {disease.symptoms[lang]}
            </p>

            <p>
              <strong>{t.guidance}:</strong> {disease.advice[lang]}
            </p>
          </article>
        ))}
      </div>

      {filteredDiseases.length === 0 && (
        <p className="empty-message">{t.empty}</p>
      )}

      <p className="library-note">{t.note}</p>
    </div>
  );
}
