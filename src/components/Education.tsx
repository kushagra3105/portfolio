import "./styles/Education.css";

const Education = () => {
  return (
    <div className="education-section section-container" id="education">
      <div className="education-container">
        <h2>
          My <span>Education</span>
        </h2>
        <div className="education-card">
          <div className="education-card-header">
            <div className="education-icon">🎓</div>
            <div className="education-info">
              <h4>B.Tech in Computer Science &amp; Engineering</h4>
              <h5>SRM Institute of Science and Technology, Ghaziabad</h5>
              <span className="education-duration">2023 – 2027</span>
            </div>
            <div className="education-cgpa">
              <span className="cgpa-label">CGPA</span>
              <span className="cgpa-value">8.75</span>
              <span className="cgpa-max">/10</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
