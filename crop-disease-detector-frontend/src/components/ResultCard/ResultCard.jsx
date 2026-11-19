
import { CheckCircle, AlertCircle, Info } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import "./ResultCard.css";

export default function ResultCard({ result }) {
  const { t } = useLanguage();

  if (!result) return null;

  const isDemo = result.status === "demo";
  const recommendations = result.recommendations || [];

  return (
    <div className="result-card">
      <div className="result-heading">
        {isDemo ? (
          <Info size={28} className="result-demo-icon" />
        ) : (
          <CheckCircle size={28} className="result-success-icon" />
        )}

        <div>
          <h2>{t("result")}</h2>
          {isDemo && (
            <span className="demo-label">{t("demo")}</span>
          )}
        </div>
      </div>

      <h3 className="result-disease">{result.disease}</h3>

      {result.confidence != null && (
        <div className="confidence-section">
          <div className="confidence-heading">
            <span>Confidence</span>
            <strong>{Number(result.confidence).toFixed(1)}%</strong>
          </div>

          <div
            className="confidence-track"
            role="progressbar"
            aria-label="Prediction confidence"
            aria-valuenow={Math.min(100, Math.max(0, Number(result.confidence)))}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              className="confidence-fill"
              style={{
                width: `${Math.min(100, Math.max(0, Number(result.confidence)))}%`
              }}
            />
          </div>
        </div>
      )}

      <p className="result-message">{result.message}</p>

      {recommendations.length > 0 && (
        <>
          <h4>Recommended next steps</h4>

          <ul className="recommendation-list">
            {recommendations.map((item, index) => (
              <li key={index}>
                <CheckCircle size={17} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </>
      )}

      <p className="disclaimer">
        <AlertCircle size={17} />
        <span>
          This result is for guidance only. Confirm suspected disease with an
          agricultural expert before treatment.
        </span>
      </p>
    </div>
  );
}
