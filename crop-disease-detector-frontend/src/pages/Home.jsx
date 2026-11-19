import { Link } from "react-router-dom";
import './Home.css'
import {
  Leaf,
  Camera,
  BrainCircuit,
  Languages,
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <span className="hero-tag">
            <Leaf size={17} /> SMART FARMING WITH AI
          </span>

          <h1>{t("heroTitle")}</h1>
          <p>{t("heroText")}</p>

          <div className="hero-buttons">
            <Link to="/detect" className="primary-btn">
              {t("start")} <ArrowRight size={18} />
            </Link>

            <Link to="/about" className="secondary-btn">
              {t("learn")}
            </Link>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900"
            alt="Green agricultural field"
          />
          <div className="floating-card">
            <ShieldCheck size={25} />
            <div>
              <strong>Smarter Crop Care</strong>
              <small>Technology for farmers</small>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="section-heading">
          <span>OUR FEATURES</span>
          <h2>How CropCare AI Helps You</h2>
          <p>Simple technology to support better crop-care decisions.</p>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <Camera size={35} />
            <h3>Image Upload</h3>
            <p>Upload a clear picture of a crop leaf for assessment.</p>
          </div>

          <div className="feature-card">
            <BrainCircuit size={35} />
            <h3>AI Analysis</h3>
            <p>Use an image analysis model to identify possible disease signs.</p>
          </div>

          <div className="feature-card">
            <Languages size={35} />
            <h3>Voice Assistance</h3>
            <p>Interact using English or Kannada voice features.</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Take the First Step Towards Healthier Crops</h2>
        <p>Upload a crop image and explore the detection experience.</p>
        <Link to="/detect" className="primary-btn">
          Start Detection <ArrowRight size={18} />
        </Link>
      </section>
    </div>
  );
}
