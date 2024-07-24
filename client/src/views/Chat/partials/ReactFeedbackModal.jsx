import Modal from 'react-bootstrap/Modal';

const ReactFeedbackModal = ({ show, handleClose, loading, sendFeedbackAPI, feedback, setFeedback }) => {
    return (
        <Modal
            size="lg"
            centered
            show={show}
            onHide={handleClose}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h5 className="modal-title elegant-title">Algemene Feedback</h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

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

            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-secondary elegant-btn-secondary" onClick={handleClose}>Sluiten</button>
                <button
                    type="button"
                    className="btn btn-primary elegant-btn-primary"
                    onClick={() => sendFeedbackAPI(feedback, setFeedback, handleClose, 0, 'Algemene Feedback')}
                >
                    {loading ? 'Sending...' : 'Verzenden'}
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default ReactFeedbackModal