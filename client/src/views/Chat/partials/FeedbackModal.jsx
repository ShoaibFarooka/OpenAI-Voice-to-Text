
const FeedbackModal = ({ feedback, id, label, loading, setFeedback, sendFeedbackAPI, modalRef }) => {
    return (
        <div className="modal fade" id={id} tabIndex="-1" aria-labelledby={label} aria-hidden="true" ref={modalRef}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content elegant-modal">
                    <div className="modal-header elegant-modal-header">
                        <h5 className="modal-title elegant-title" id={label}>Algemene Feedback</h5>
                        <button type="button" className="btn-close elegant-close" data-bs-dismiss="modal" aria-label="Sluiten"></button>
                    </div>

                    <div className="modal-body elegant-body">
                        <form id="feedbackForm" className="feedback-form">
                            <label htmlFor="algemeneOpmerkingen" className="elegant-label">Algemene Opmerkingen</label>
                            <textarea
                                id="algemeneOpmerkingen"
                                name="algemeneOpmerkingen"
                                rows="4"
                                className="form-control elegant-textarea"
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                            >

                            </textarea>
                            <input type="hidden" id="summaryText" name="summaryText" />
                            <input type="hidden" id="dateTime" name="dateTime" />
                        </form>
                    </div>
                    <div className="modal-footer elegant-footer">
                        <button type="button" className="btn btn-secondary elegant-btn-secondary" data-bs-dismiss="modal">Sluiten</button>
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

export default FeedbackModal