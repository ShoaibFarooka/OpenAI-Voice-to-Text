import { LiaLongArrowAltLeftSolid } from "react-icons/lia";
import '../styles/ervaringen.css'
import { useState, useEffect } from "react";
import TestimonialItem from "../partials/TestimonialItem";
import { cx } from "../../../hooks/helpers";

const Ervaringen = () => {

    const [show, setShow] = useState(1)

    return (
        <section data-aos="fade-up" id="ervaringen" data-w-id="aedc08d9-087c-6779-cbd7-c802287c773c" className="testimonial-section">
            <div
                data-aos="fade-up"
                className="custom-container">
                <div className="testimonial-heading-and-svg">
                    <div className="horizaontal-div gap">
                        <h2 className="section-heading testimonial-heading">Onze meest tevreden klanten delen hun ervaringen!</h2>
                        <img
                            src="/images/Arrow_8Arrow_07.webp" loading="lazy"
                            width="130.5"
                            alt=""
                            className="arrow-image"
                            data-aos="zoom-in"
                        />
                        <img
                            src="/images/Group-10_1Group-10.webp"
                            loading="lazy"
                            width="53.5"
                            alt=""
                            className="box-svg"
                        />
                    </div>
                </div>

                <div
                    data-delay="4000"
                    data-animation="slide"
                    className="testimonial-slider w-slider"
                    data-autoplay="false"
                    data-easing="ease"
                    data-hide-arrows="false"
                    data-disable-swipe="false"
                    data-autoplay-limit="0"
                    data-nav-spacing="3"
                    data-duration="500"
                    data-infinite="true"
                >

                    <div className="slider-mask">
                        {show === 1 && <TestimonialItem
                            desc='De allereerste keer dat ik fysio.ai gebruikte, was het alsof alles op
                            zijn plek viel – ik kreeg letterlijk kippenvel! Nooit meer typen tijdens een gesprek; één klik en ik
                            heb een nauwkeurige gespreksverslag. Het stelt me in staat echt contact te maken met patiënten. Ik
                            raad elke fysiotherapeut aan dit te ervaren; fysio.ai is de toekomst die nu al begint.'
                            author='Mark Mitz'
                            imgSrc='/images/person_image.webp'
                            animate='fade-right'
                        />}
                        {show === 2 && <TestimonialItem
                            desc='Fysio.ai was een openbaring bij de eerste sessie. Het multitasken van
                            typen en luisteren is verleden tijd. Nu klik ik, voer ik mijn gesprekken, en de rest wordt
                            automatisch voor me gedaan. De rapporten zijn accuraat en direct klaar voor het patiëntendossier.
                            Toppers!!!'
                            author='Laura Krom'
                            imgSrc='/images/person_image2.webp'
                            animate='fade-left'
                        />}
                    </div>

                    <div className="left-arrow w-slider-arrow-left">
                        <div className="w-icon-slider-left"></div>
                    </div>

                    <div className="right-arrow w-slider-arrow-right">
                        <div className="hidden-arrow-icon w-icon-slider-right"></div>
                    </div>

                    <div className="testimonial-slider-nav w-slider-nav w-round">
                        <div onClick={() => setShow(2)} className={`w-slider-dot ${show === 2 ? 'w-active' : ''}`}></div>
                        <div onClick={() => setShow(1)} className={`w-slider-dot ${show === 1 ? 'w-active' : ''}`}></div>
                    </div>
                    <div className="testimonial-slider-nav-style-css w-embed"></div>

                    <div className="testimonial-border-arrow" >
                        <div className="testimonial-navigation-arrow">

                            <button
                                style={{ position: 'relative', left: show === 2 ? '32px' : '35px', display: 'block' }}
                                className={cx(show === 2 ? 'button-dot-active' : 'button-dot')}
                                onClick={() => setShow(2)}
                            ></button>

                            <button
                                style={{ position: 'relative', left: '16px', marginTop: '70px' }}
                                className={cx(show === 1 ? 'button-dot-active' : 'button-dot')}
                                onClick={() => setShow(1)}
                            ></button>

                            <LiaLongArrowAltLeftSolid style={{ position: 'relative', top: '17px', right: '4px' }} />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Ervaringen