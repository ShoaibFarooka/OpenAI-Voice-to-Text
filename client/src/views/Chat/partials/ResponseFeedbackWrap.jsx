import React, { useState } from 'react'

const ResponseFeedbackWrap = () => {

    const [modalShow, setModalShow] = useState(false);


    const handleShow = () => setModalShow(true);
    const handleClose = () => setModalShow(false);

    return (
        <div>ResponseFeedbackWrap</div>
    )
}

export default ResponseFeedbackWrap