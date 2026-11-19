
import { useState } from "react";
import { Search, LoaderCircle } from "lucide-react";

import ImageUploader from "../components/ImageUploader/ImageUploader";
import ResultCard from "../components/ResultCard/ResultCard";
import VoiceAssistant from "../components/VoiceAssistant/VoiceAssistant";

import { predictDisease } from "../services/api";
import { useLanguage } from "../context/LanguageContext";

export default function DiseaseDetection() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { t } = useLanguage();

  const handleDetection = async () => {
    if (!file) {
      setError(t("selectImage"));
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const data = await predictDisease(file);
      setResult(data.result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-heading">
        <span>{t("analysisTitle")}</span>
        <h1>{t("detect")}</h1>
        <p>{t("uploadInstruction")}</p>
      </div>

      <div className="detection-layout">
        <div className="detection-panel">
          <ImageUploader file={file} setFile={setFile} />

          <button
            className="primary-btn analyze-btn"
            onClick={handleDetection}
            disabled={loading || !file}
          >
            {loading ? (
              <>
                <LoaderCircle className="spin" size={20} />
                {t("analyzing")}
              </>
            ) : (
              <>
                <Search size={20} />
                {t("analyze")}
              </>
            )}
          </button>

          {error && <p className="error-message">{error}</p>}

          {result && <ResultCard result={result} />}
        </div>

        <div className="detection-info">
          <h2>{t("tips")}</h2>
          <ul>
            <li>{t("tip1")}</li>
            <li>{t("tip2")}</li>
            <li>{t("tip3")}</li>
            <li>{t("tip4")}</li>
            <li>{t("tip5")}</li>
          </ul>

          <VoiceAssistant file={file} />
        </div>
      </div>
    </div>
  );
}
