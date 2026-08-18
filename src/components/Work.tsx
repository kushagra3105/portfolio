import "./styles/Work.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const projects = [
  {
    num: "01",
    name: "Breast Cancer Detection",
    category: "Deep Learning · 2026",
    tools: ["Python", "PyTorch", "Neural Networks", "Scikit-Learn", "Adam Optimizer"],
    description:
      "Deep learning binary classifier using PyTorch to distinguish between malignant and benign tumors. Achieved 97% accuracy using ReLU activation and Adam optimizer with extensive validation.",
    github: "https://github.com/kushagra3105",
  },
  {
    num: "02",
    name: "Image Segmentation Model",
    category: "Computer Vision · 2025",
    tools: ["Python", "PyTorch", "Deep Learning", "Computer Vision", "Data Preprocessing"],
    description:
      "Designed and deployed an image segmentation model for object separation and complex image analysis. End-to-end PyTorch workflow covering data preprocessing, model training, and performance evaluation.",
    github: "https://github.com/kushagra3105/segmentation-model",
  },
  {
    num: "03",
    name: "Crop Recommendation System",
    category: "Machine Learning · 2025",
    tools: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Classification Models"],
    description:
      "ML system that recommends optimal crops based on soil and weather datasets. Leveraged classification algorithms with data preprocessing and prediction optimisation pipelines.",
    github: "https://github.com/kushagra3105/CROP-RECOMMENDATION",
  },
];

const Work = () => {
  useGSAP(() => {
    const workFlex = document.querySelector(".work-flex") as HTMLElement;
    const workSection = document.querySelector(".work-section") as HTMLElement;
    if (!workFlex || !workSection) return;

    const calculateTranslateX = () => {
      const scrollWidth = workFlex.scrollWidth;
      const windowWidth = window.innerWidth;
      return Math.max(scrollWidth - windowWidth + 120, 0);
    };

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: () => `+=${calculateTranslateX()}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: () => -calculateTranslateX(),
      ease: "none",
    });

    ScrollTrigger.refresh();

    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project) => (
            <div className="work-box" key={project.num}>
              <div className="work-box-header">
                <span className="work-num">{project.num}</span>
                <span className="work-category">{project.category}</span>
              </div>
              <h3 className="work-name">{project.name}</h3>
              <p className="work-desc">{project.description}</p>
              <div className="work-tools-section">
                <span className="work-tools-label">Tools &amp; Technologies</span>
                <div className="work-tags">
                  {project.tools.map((tool, i) => (
                    <span className="work-tag" key={i}>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              <div className="work-links">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="work-btn work-btn-github"
                  data-cursor="disable"
                >
                  GitHub ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
