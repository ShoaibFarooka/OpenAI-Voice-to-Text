

const TestimonialItem = ({ imgSrc, desc, author, animate }) => {
    return (
        <div className="testimonial-slide w-slide" data-aos={animate}>
            <div className="testimonial-wrapper">
                <div data-w-id="867cf68e-9412-53de-b07f-1f3f2e26433f" className="testimonial-card">
                    <div className="quote-wrapper">
                        <img
                            src="/images/654bb294e58411345b4cf4affac_quote-1.webp"
                            loading="lazy"
                            alt=""
                            className="testimonial-svg"
                        />

                    </div>
                    <div className="quote-paragraph-wrapper">
                        <div className="testimonial-quote">
                            {desc}
                        </div>
                        <div className="client-name-and-position">
                            <span className="client-name">
                                {author}
                            </span>
                        </div>
                    </div>
                    <div className="quote-wrapper rotate-90">
                        <img
                            src="/images/654bb294e58411345b4cf4affac_quote-1.webp"
                            loading="lazy"
                            alt=""
                            className="testimonial-svg rotate-90"
                        />

                    </div>
                </div>
                <div className="testimonial-image-wrapper">
                    <img
                        src={imgSrc}
                        loading="lazy"
                        width="184.5"
                        alt=""
                        className="testimonial-client-image"
                    />
                </div>
            </div>
        </div>
    )
}

export default TestimonialItem