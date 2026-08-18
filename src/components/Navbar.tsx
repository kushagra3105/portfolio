import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);

export const smoother = {
  scrollTo: (target: string, _smooth?: boolean, _pos?: string) => {
    const el = document.querySelector(target);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  },
  scrollTop: (_val?: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  },
  paused: (_val: boolean) => {},
};

const Navbar = () => {
  useEffect(() => {
    const handleInternalLinks = () => {
      const links = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"], a[data-href^="#"]');
      links.forEach((elem) => {
        elem.addEventListener("click", (e) => {
          const target = elem.getAttribute("data-href") || elem.getAttribute("href");
          if (target && target.startsWith("#") && target !== "#" && target !== "/#") {
            e.preventDefault();
            const targetElem = document.querySelector(target);
            if (targetElem) {
              targetElem.scrollIntoView({ behavior: "smooth" });
            }
          }
        });
      });
    };

    handleInternalLinks();

    window.addEventListener("resize", () => {
      ScrollTrigger.refresh();
    });
  }, []);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          KS
        </a>
        <a
          href="mailto:kushagra.singh.dev@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          kushagra.singh.dev@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#research" href="#research">
              <HoverLinks text="RESEARCH" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
