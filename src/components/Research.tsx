import "./styles/Research.css";
import { MdArrowOutward } from "react-icons/md";

const Research = () => {
  return (
    <div className="research-section section-container" id="research">
      <div className="research-container">
        <h2>
          Research &amp; <span>Publications</span>
        </h2>
        <div className="research-card">
          <div className="research-badge">2026</div>
          <div className="research-content">
            <h3>Real-Time Crop Disease Detection Model</h3>
            <p className="research-desc">
              Research on an adaptive Machine Learning model for real-time crop
              disease detection using MobileNetV2. Achieved <strong>87% field accuracy</strong>{" "}
              across <strong>27 disease classes</strong>. Optimised to an{" "}
              <strong>11MB TensorFlow Lite</strong> application — designed for
              offline mobile deployment in resource-constrained environments.
            </p>
            <div className="research-tags">
              <span className="research-tag">MobileNetV2</span>
              <span className="research-tag">TensorFlow Lite</span>
              <span className="research-tag">Computer Vision</span>
              <span className="research-tag">Mobile Deployment</span>
              <span className="research-tag">Python</span>
            </div>
            <div className="research-results">
              <div className="research-stat">
                <span className="stat-value">87%</span>
                <span className="stat-label">Field Accuracy</span>
              </div>
              <div className="research-stat">
                <span className="stat-value">27</span>
                <span className="stat-label">Disease Classes</span>
              </div>
              <div className="research-stat">
                <span className="stat-value">11MB</span>
                <span className="stat-label">TFLite Model</span>
              </div>
            </div>
            <a
              href="https://drive.google.com/file/d/1cXO5Z4AKaKiinA3M5tBBcDBzSISazV3E/view"
              target="_blank"
              rel="noopener noreferrer"
              className="research-btn"
              data-cursor="disable"
            >
              View Paper <MdArrowOutward />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Research;
