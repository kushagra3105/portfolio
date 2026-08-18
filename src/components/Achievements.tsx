import "./styles/Achievements.css";

const Achievements = () => {
  return (
    <div className="achievements-section section-container" id="achievements">
      <div className="achievements-container">
        <h2>
          My <span>Achievements</span>
        </h2>
        <div className="achievement-card">
          <div className="achievement-badge">
            <span className="trophy-icon">🏆</span>
            <span className="achievement-rank">1st Place</span>
          </div>
          <div className="achievement-content">
            <div className="achievement-header">
              <h3>Code Wizard Special Track 2.0</h3>
              <span className="achievement-year">2026</span>
            </div>
            <p>
              Secured <strong>1st position</strong> in Code Wizard Special Track 2.0 by developing
              an innovative <strong>Image Segmentation AI project</strong>. Awarded a cash prize
              of <strong>₹10,000</strong>.
            </p>
            <div className="achievement-tags">
              <span className="achievement-tag">Hackathon Winner</span>
              <span className="achievement-tag">Image Segmentation</span>
              <span className="achievement-tag">AI / ML</span>
              <span className="achievement-tag">₹10,000 Prize</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
