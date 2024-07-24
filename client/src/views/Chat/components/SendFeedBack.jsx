import { useState } from 'react';
// import FeedbackModal from '../partials/FeedbackModal'
import ReactFeedbackModal from '../partials/ReactFeedbackModal';

const SendFeedBack = ({ loading, sendFeedbackAPI }) => {

    // states
    const [feedback, setFeedback] = useState('');
    const [modalShow, setModalShow] = useState(false);

    const handleShow = () => setModalShow(true);
    const handleClose = () => setModalShow(false);

    return (
        <div>
            <div className="text-center mt-4">
                <button
                    className="btn btn-custom"
                    onClick={handleShow}
                >
                    Send Feedback
                </button>
            </div>

            <ReactFeedbackModal
                feedback={feedback}
                setFeedback={setFeedback}
                loading={loading}
                sendFeedbackAPI={sendFeedbackAPI}
                handleShow={handleShow}
                handleClose={handleClose}
                show={modalShow}
            />
        </div>
    )
}

export default SendFeedBack