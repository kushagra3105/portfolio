import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br />
          experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>

          {/* Internship 1 */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Data Scientist Intern</h4>
                <h5>Aarvasa Innovations Pvt. Ltd.</h5>
                <span className="career-location">📍 Bhopal, India</span>
              </div>
              <h3>2025–26</h3>
            </div>
            <p>
              Executed data preprocessing, feature engineering, and Machine
              Learning model development workflows. Used Python, Pandas, NumPy,
              and Scikit-learn for data analysis and predictive modeling.
              Improved model prediction accuracy through data-driven
              optimization techniques.
            </p>
          </div>

          {/* Internship 2 */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Data Scientist Intern</h4>
                <h5>Web Gain Technologies Pvt. Ltd.</h5>
                <span className="career-location">📍 Remote</span>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Worked on data analysis, visualisation, and predictive model
              development using Python. Performed data cleaning and
              preprocessing using Pandas and NumPy. Developed and evaluated
              Machine Learning models using real-world datasets.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Career;
