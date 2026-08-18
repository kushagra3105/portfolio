import "./styles/Certifications.css";
import { MdArrowOutward } from "react-icons/md";

const certifications = [
  {
    title: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    issuer: "Oracle",
    icon: "☁️",
    credentialUrl: "https://drive.google.com/file/d/14ybIhr_iNVjoX4E6eeyYYF7Wy9Y-iicH/view",
  },
  {
    title: "Software Engineering Job Simulation",
    issuer: "JPMorgan Chase & Co. (Forage)",
    icon: "💼",
    credentialUrl: "https://drive.google.com/file/d/1waBPxRMM98BNfpyEBtO7t6yy-l2mTBhw/view",
  },
  {
    title: "Introduction to Data Science Job Simulation",
    issuer: "Forage",
    icon: "📊",
    credentialUrl: "https://drive.google.com/file/d/1jzaBZ5KJvdI7Yg5BtjSGA4JUc57O80eJ/view",
  },
];

const Certifications = () => {
  return (
    <div className="certifications-section section-container" id="certifications">
      <div className="certifications-container">
        <h2>
          My <span>Certifications</span>
        </h2>
        <div className="certifications-grid">
          {certifications.map((cert, index) => (
            <div className="cert-card" key={index}>
              <div className="cert-icon">{cert.icon}</div>
              <div className="cert-info">
                <h4>{cert.title}</h4>
                <h5>{cert.issuer}</h5>
              </div>
              {cert.credentialUrl ? (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-link"
                  data-cursor="disable"
                >
                  View Credential <MdArrowOutward />
                </a>
              ) : (
                <span className="cert-link-placeholder">
                  {/* TODO: Add credential URL */}
                  Credential Link
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certifications;
