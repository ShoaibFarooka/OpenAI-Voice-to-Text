import { useState } from "react";
import { axiosPOST } from "../../../hooks/axiosMethods";
import toast from "react-hot-toast";

const Contact = () => {
  // const [isVisible, setIsVisible] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //     const section = document.getElementById('contact');

  //     const observer = new IntersectionObserver(
  //         (entries) => {
  //             entries.forEach((entry) => {
  //                 if (entry.isIntersecting) {
  //                     setIsVisible(true);
  //                 } else {
  //                     setIsVisible(false);
  //                 }
  //             });
  //         },
  //         { threshold: 0.5 } // Adjust the threshold as needed
  //     );

  //     if (section) {
  //         observer.observe(section);
  //     }

  //     return () => {
  //         if (section) {
  //             observer.unobserve(section);
  //         }
  //     };
  // }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    console.log("onSubmit", email);
    if (email) {
      const response = await axiosPOST(
        "request",
        { email: email },
        setLoading,
        null
      );
      if (response.success) {
        toast.success("You will be contacted soon");
      } else {
        toast.error("A error occurred! Please try again later.");
      }
      console.log("response", response);
    } else {
      toast.error("Please enter your email address");
    }
  };

  return (
    <section id="contact" className="learning-today-section">
      <div className="container">
        <div
          data-aos="fade-up"
          data-aos-easing="linear"
          data-aos-duration="50000"
          // data-aos-anchor-placement="top-bottom"
          // className={`contact-section ${isVisible ? 'fade-up' : ''}`}
          style={
            {
              // opacity: isVisible ? 1 : 0,
              // transform: isVisible ? 'translateY(0)' : 'translateY(-150px)',
            }
          }
        >
          <div className="learning-today-wrapper">
            <h2 className="section-heading middle-allign">
              Vraag je demo aan 🎉
            </h2>
            <p className="start-learning-paragraph">
              Ontdek hoe fysio.ai jouw werk kan veranderen met een persoonlijke,
              gratis demo. Meld je aan en laat je inspireren door de toekomst
              van fysiotherapie die voor je deur staat. Voor andere vragen,
              staan we je graag te woord via{" "}
              <a href="mailto:info@fysio.ai" target="_new">
                info@fysio.ai
              </a>
              .
            </p>
          </div>

          <div className="form-block w-form">
            <form
              // action="/request-demo"
              id="email-form"
              name="email-form"
              data-name="Email Form"
              method="post"
              className="form"
              data-wf-page-id="654bb294e58411b4cf4aff70"
              data-wf-element-id="2edfefcd-8adf-6c72-6754-5938d037ba07"
              onSubmit={onSubmit}
            >
              <div>
                <input
                  type="email"
                  className="text-field w-input"
                  maxLength="256"
                  name="email"
                  data-name="Email"
                  placeholder="Vul hier je e-mailadres in"
                  id="email"
                  required=""
                />
              </div>
              <div>
                <input
                  type="submit"
                  value="Aanvragen"
                  data-wait="Please wait..."
                  className="primary-button border-on-hover w-button"
                />
              </div>
            </form>
            <div className="success-message-2 w-form-done">
              <div className="text-block-2">
                Bedankt! Je aanvraag is ingediend; je hoort snel van ons.
              </div>
            </div>
            <div className="w-form-fail">
              <div>
                Oeps! Er ging iets mis bij het versturen van het formulier.{" "}
                <br />
                Stuur een e-mail naar{" "}
                <a href="mailto:info@fysio.ai" target="_new">
                  info@fysio.ai
                </a>
                .
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
