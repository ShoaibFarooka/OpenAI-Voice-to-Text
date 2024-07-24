import { useRef } from "react";

const SummaryBox = ({ label, id, value, onChange, apiCallSuccess, handleShow, modalId }) => {

    // ref textarea
    const textareaRef = useRef(null);

    // copy text action
    const handleCopy = async () => {
        await navigator.clipboard.writeText(value);
    };

    return (
        <div className="summary-box">
            <div className="box-title">{label}</div>
            <textarea
                id={id}
                rows="4"
                className="form-control"
                defaultValue={value}
                onChange={onChange}
                ref={textareaRef}
            >
            </textarea>

            <div className="button-container">
                <button
                    onClick={handleCopy}
                    className="copy-button">
                    <i className="far fa-copy"></i>
                </button>

                {(apiCallSuccess || value) && <button
                    type="button"
                    className="feedback-button"
                    onClick={() => handleShow(modalId)}
                >
                    <i className="fas fa-comment-dots" style={{ marginRight: '3px' }}></i>
                    Feedback
                </button>}

            </div>

        </div>
    )
}

export default SummaryBox