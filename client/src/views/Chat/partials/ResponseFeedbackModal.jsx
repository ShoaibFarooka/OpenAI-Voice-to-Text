import { useState } from "react";

const ResponseFeedbackModal = ({ title, id, label, sendFeedbackAPI, loading }) => {

    // states
    const [feedback, setFeedback] = useState('');

    return (
        <div className="modal fade" id={id} tabIndex="-1" aria-labelledby={label} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content elegant-modal">
                    <div className="modal-header elegant-modal-header">
                        <h5 className="modal-title elegant-title" id={label}>{title}</h5>
                        <button type="button" className="btn-close elegant-close" data-bs-dismiss="modal"
                            aria-label="Sluiten"></button>
                    </div>
                    <div className="modal-body elegant-body">
                        <form id="feedbackForm1" className="feedback-form">
                            <label htmlFor="nauwkeurigheid1" className="elegant-label" style={{ fontWeight: 400 }}>Nauwkeurigheid (%)&nbsp;</label>
                            <input type="number" id="nauwkeurigheid1" name="nauwkeurigheid1" min="0" max="100" value="100"
                                className="elegant-input" />

                            <label htmlFor="extraOpmerkingen1" className="elegant-label" style={{ fontWeight: 400 }}>&nbsp;Opmerkingen</label>
                            <textarea
                                id="extraOpmerkingen1"
                                name="extraOpmerkingen1"
                                rows="2"
                                className="form-control elegant-textarea"
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                            ></textarea>
                        </form>
                    </div>
                    <div className="modal-footer elegant-footer">
                        <button type="button" className="btn btn-secondary elegant-btn-secondary" data-bs-dismiss="modal">Sluiten
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary elegant-btn-primary"
                            onClick={() => sendFeedbackAPI(feedback, setFeedback)}
                        >
                            {loading ? 'Sending...' : 'Verzenden'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResponseFeedbackModal