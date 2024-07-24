import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

const ReactResponseModal = ({ title, show, handleClose, loading, sendFeedbackAPI, modalId }) => {

    // states
    const [feedback, setFeedback] = useState('');
    const [accuracy, setAccuracy] = useState(100);

    return (
        <Modal
            size="lg"
            centered
            show={show}
            onHide={handleClose}
        >
            <Modal.Header closeButton>
                <Modal.Title id={modalId}>
                    <h5 className="modal-title elegant-title">{title}</h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <form id="feedbackForm1" className="feedback-form">
                    <label htmlFor="nauwkeurigheid1" className="elegant-label" style={{ fontWeight: 400 }}>Nauwkeurigheid (%)&nbsp;</label>
                    <input
                        type="number"
                        id="nauwkeurigheid1"
                        name="nauwkeurigheid1"
                        min="0"
                        max="100"
                        value={accuracy}
                        onChange={(e) => setAccuracy(e.target.value)}
                        className="elegant-input"
                    />

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

            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-secondary elegant-btn-secondary" onClick={handleClose}>Sluiten</button>
                <button
                    type="button"
                    className="btn btn-primary elegant-btn-primary"
                    onClick={() => sendFeedbackAPI(feedback, setFeedback, handleClose, accuracy, title)}
                >
                    {loading ? 'Sending...' : 'Verzenden'}
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default ReactResponseModal