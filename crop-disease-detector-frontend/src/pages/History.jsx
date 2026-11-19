
import { useEffect, useState } from "react";
import {
  getDetectionHistory,
  deleteDetectionHistory,
  API_URL
} from "../services/api";

export default function History() {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  async function loadHistory() {
    try {
      const data = await getDetectionHistory();
      setHistory(data.history);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    loadHistory();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Delete this detection record?")) return;

    try {
      await deleteDetectionHistory(id);
      setHistory(previous =>
        previous.filter(item => item.id !== id)
      );
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="page-container">
      <div className="page-heading">
        <span>CROPCARE AI</span>
        <h1>Disease Detection History</h1>
        <p>Your previously analyzed crop images.</p>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="history-grid">
        {history.map(item => (
          <div className="history-card" key={item.id}>
            <img
              src={`${API_URL}${item.image_url}`}
              alt={item.disease}
            />

            <h3>{item.disease}</h3>

            <p>
              Confidence: {Number(item.confidence).toFixed(2)}%
            </p>

            <p>
              {new Date(item.created_at).toLocaleString()}
            </p>

            <h4>Recommendations</h4>
            <ul>
              {item.recommendations.map((recommendation, index) => (
                <li key={index}>{recommendation}</li>
              ))}
            </ul>

            <button
              className="secondary-btn"
              onClick={() => handleDelete(item.id)}
            >
              Delete Record
            </button>
          </div>
        ))}
      </div>

      {history.length === 0 && (
        <p>No saved detection history found.</p>
      )}
    </div>
  );
}
