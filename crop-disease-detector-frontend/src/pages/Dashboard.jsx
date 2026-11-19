
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getDetectionHistory,
  API_URL
} from "../services/api";
import { useAuth } from "../context/AuthContext";
import {
  Leaf,
  ScanSearch,
  HeartPulse,
  AlertTriangle,
  History,
  ArrowRight,
  Sprout,
  ImagePlus
} from "lucide-react";

import "./Dashboard.css";

export default function Dashboard() {
  const { user } = useAuth();

  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDetectionHistory()
      .then((data) => {
        setHistory(Array.isArray(data.history) ? data.history : []);
      })
      .catch((err) => {
        setError(err.message || "Unable to load detection history.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const healthy = history.filter((item) =>
    item.disease?.toLowerCase().includes("healthy")
  ).length;

  const diseased = history.length - healthy;

  return (
    <div className="dashboard-page">
      <div className="page-container dashboard-container">

        {/* Welcome section */}
        <section className="dashboard-header">
          <div className="dashboard-welcome">
            <span className="dashboard-eyebrow">
              <Leaf size={16} />
              CROPCARE AI
            </span>

            <h1>
              Welcome back, {user?.name || "Farmer"}!
            </h1>

            <p>
              Monitor your crop health, review previous scans,
              and detect plant diseases with AI.
            </p>

            <Link to="/detect" className="dashboard-main-btn">
              <ScanSearch size={19} />
              Scan Your Crop
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="dashboard-header-icon">
            <Sprout size={100} strokeWidth={1.2} />
          </div>
        </section>

        {/* Error message */}
        {error && (
          <div className="dashboard-error">
            <AlertTriangle size={20} />
            <span>{error}</span>
          </div>
        )}

        {/* Statistics */}
        <section className="dashboard-stats-section">
          <div className="dashboard-section-heading">
            <div>
              <span className="dashboard-section-label">
                YOUR OVERVIEW
              </span>
              <h2>Crop Health Summary</h2>
            </div>
          </div>

          <div className="dashboard-stats">
            <div className="stat-card stat-total">
              <div className="stat-icon">
                <ScanSearch size={25} />
              </div>
              <div>
                <p>Total Scans</p>
                <h2>{loading ? "—" : history.length}</h2>
                <span>Images analyzed</span>
              </div>
            </div>

            <div className="stat-card stat-healthy">
              <div className="stat-icon">
                <HeartPulse size={25} />
              </div>
              <div>
                <p>Healthy Results</p>
                <h2>{loading ? "—" : healthy}</h2>
                <span>Healthy predictions</span>
              </div>
            </div>

            <div className="stat-card stat-diseased">
              <div className="stat-icon">
                <AlertTriangle size={25} />
              </div>
              <div>
                <p>Possible Diseases</p>
                <h2>{loading ? "—" : diseased}</h2>
                <span>Need attention</span>
              </div>
            </div>
          </div>
        </section>

        {/* Quick actions */}
        <section className="dashboard-quick-actions">
          <div className="dashboard-section-heading">
            <div>
              <span className="dashboard-section-label">
                GET STARTED
              </span>
              <h2>Quick Actions</h2>
            </div>
          </div>

          <div className="quick-action-grid">
            <Link to="/detect" className="quick-action-card">
              <div className="quick-action-icon">
                <ImagePlus size={26} />
              </div>
              <div>
                <h3>Detect Disease</h3>
                <p>Upload a crop image and analyze its health.</p>
              </div>
              <ArrowRight size={19} className="quick-action-arrow" />
            </Link>

            <Link to="/history" className="quick-action-card">
              <div className="quick-action-icon history-action-icon">
                <History size={26} />
              </div>
              <div>
                <h3>View History</h3>
                <p>Check your previous crop disease scans.</p>
              </div>
              <ArrowRight size={19} className="quick-action-arrow" />
            </Link>
          </div>
        </section>

        {/* Recent detections */}
        <section className="dashboard-recent-section">
          <div className="dashboard-section-heading recent-heading">
            <div>
              <span className="dashboard-section-label">
                YOUR ACTIVITY
              </span>
              <h2>Recent Detections</h2>
              <p>Here are your latest crop analysis results.</p>
            </div>

            <Link to="/history" className="view-history-link">
              View All History
              <ArrowRight size={17} />
            </Link>
          </div>

          {loading ? (
            <div className="dashboard-empty">
              <div className="dashboard-empty-icon">
                <ScanSearch size={32} />
              </div>
              <h3>Loading your detections...</h3>
              <p>Please wait while we retrieve your scan history.</p>
            </div>
          ) : history.length > 0 ? (
            <div className="history-grid">
              {history.slice(0, 4).map((item) => (
                <div className="history-card" key={item.id}>
                  <div className="history-image-wrapper">
                    <img
                      src={`${API_URL}${item.image_url}`}
                      alt="Saved crop"
                    />
                    <span
                      className={
                        item.disease?.toLowerCase().includes("healthy")
                          ? "history-status healthy-status"
                          : "history-status disease-status"
                      }
                    >
                      {item.disease?.toLowerCase().includes("healthy")
                        ? "Healthy"
                        : "Check Crop"}
                    </span>
                  </div>

                  <div className="history-card-content">
                    <h3>{item.disease}</h3>

                    <p className="history-confidence">
                      Confidence: {Number(item.confidence).toFixed(2)}%
                    </p>

                    <small>
                      {new Date(item.created_at).toLocaleString()}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="dashboard-empty">
              <div className="dashboard-empty-icon">
                <Leaf size={34} />
              </div>
              <h3>No detections yet</h3>
              <p>
                Your crop scan results will appear here after
                you analyze your first image.
              </p>
              <Link to="/detect" className="dashboard-empty-btn">
                <ScanSearch size={18} />
                Start Your First Scan
              </Link>
            </div>
          )}
        </section>

        {/* Bottom information */}
        <section className="dashboard-tip">
          <div className="dashboard-tip-icon">
            <Sprout size={27} />
          </div>
          <div>
            <h3>Keep your crops healthy!</h3>
            <p>
              Upload clear photos of affected leaves for a more
              useful AI prediction. Always verify results with
              reliable agricultural guidance.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
