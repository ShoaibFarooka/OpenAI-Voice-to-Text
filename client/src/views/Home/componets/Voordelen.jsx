import { useEffect } from "react";
import { checkpoints } from "../../../configs/constants";
import "../styles/voordelen.css";

const Voordelen = () => {
  useEffect(() => {
    // Get the element to be animated
    const element = document.querySelector(".course-include-image-wrapper");

    // Function to check if an element is in the viewport
    const isInViewport = (element) => {
      const rect = element.getBoundingClientRect();
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;
      return (
        rect.top >= -500 &&
        rect.left >= -30 &&
        rect.bottom <= viewportHeight + 600 &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth)
      );
    };

    // Function to handle scroll event
    const handleScroll = () => {
      if (isInViewport(element)) {
        // Add the 'custom-fade-right' class when the element is in the viewport
        element.classList.add("custom-fade-right");
        element.classList.remove("hideImg");
      } else {
        element.classList.remove("custom-fade-right");
        element.classList.add("hideImg");
      }
    };

    // Attach the handleScroll function to the scroll event
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Run this effect only once on mount

  return (
    <section className="course-include-section">
      <div className="course-includes-background"></div>
      <div className="custom-container">
        <div className="w-layout-grid two-column-grid" id="voordelen">
          <div
            // data-aos="fade-right"
            // data-aos-anchor-placement="top-center"
            className="image-wrapper course-include-image-wrapper hideImg"
          >
            <img
              src="/images/vrouw_laptop-1.webp"
              // loading="lazy"
              width="566"
              sizes="(max-width: 479px) 90vw, (max-width: 767px) 400px, (max-width: 991px) 100vw, (max-width: 1279px) 96vw, 1140px"
              alt=""
              srcSet="/images/vrouw_laptop-500.png 500w, /images/vrouw_laptop-800.png 800w, /images/vrouw_laptop-1080.png 1080w, /images/vrouw_laptop-1.webp 1132w"
              className="course-banner-image"
            />

            <div className="course-include-card-wrapper resources-card animate-bounce">
              <div className="course-include-card resource">
                <div className="resource-card-title">1</div>
                <img
                  src="/images/1-minute-card.webp"
                  loading="lazy"
                  width="70"
                  alt=""
                  className="resource-card-image"
                />
                <div className="course-include-card-title">
                  Start binnen
                  <br />1 minuut
                </div>
                <div className="circle-wrapper">
                  <div className="resource-card-circle"></div>
                  <div className="resource-card-circle"></div>
                  <div className="resource-card-circle"></div>
                </div>
              </div>
            </div>
          </div>
          <div data-aos="fade-left" className="course-details-contents">
            <h2 className="heading">De voordelen van Fysio.ai </h2>
            <p className="default-paragraph">
              Fysio.ai versterkt jouw praktijk met AI-gestuurde precisie, die
              gesprekken omzet in duidelijke data. Ervaar hoe onze technologie
              tijd bespaart en jou in staat stelt om je volledig op de patiënt
              te richten.
            </p>

            <div className="checkpoint-wrapper">
              {checkpoints.map((checkpoint, index) => (
                <div key={index} className="checkpoint-block">
                  <div
                    className="check-icon"
                    style={{ position: "relative", top: "3px" }}
                  >
                    {checkpoint.icon}
                  </div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `<div style="font-family: 'Inter', sans-serif;">${checkpoint.text}</div>`,
                    }}
                  />
                </div>
              ))}
            </div>

            <a
              href="#contact"
              data-w-id="3f5dab86-cc03-f077-5a0c-e7d1e4693d4f"
              className="primary-button border-on-hover w-inline-block"
            >
              <div>Kom in Contact</div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Voordelen;
