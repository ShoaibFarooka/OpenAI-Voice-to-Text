import ChatDashboardWrap from "./components/Layouts/ChatDashboardWrap";
import SendFeedBack from "./components/SendFeedBack";
import SummaryBox from "./partials/SummaryBox";
import { useEffect, useState } from "react";
import ChatHeadAudio from "./components/Layouts/ChatHeadAudio";
import { modalData } from "../../configs/constants";
import { getFromLocalStorage } from "../../hooks/helpers";
import { atomToken, atomUser } from "../../configs/states/atomState";
import { useAtom } from "jotai";
import { axiosPOST } from "../../hooks/axiosMethods";
import toast from "react-hot-toast";
import ReactResponseModal from "./partials/ReactResponseModal";

const initialVal = {
  propertyOne: "",
  propertyTwo: "",
  propertyThree: "",
  propertyFour: "",
  propertyFive: "",
};

const ChatDashboard = () => {
  const [access, setAccess] = useState(true);

  useEffect(() => {
    const requestMicrophoneAccess = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        // console.log('Microphone access granted:', stream);
        // Do something with the microphone stream, if needed
        setAccess(true);
      } catch (error) {
        console.error("Error accessing microphone:", error);
        setAccess(false);
        // Handle error or inform the user
      }
    };

    // Check if the browser supports the mediaDevices API
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Request microphone access when the component mounts
      requestMicrophoneAccess();
    } else {
      console.error("getUserMedia is not supported in this browser");
      // Handle unsupported browser scenario
    }

    // Clean up function (optional)
    return () => {
      // You can release resources or stop the microphone stream here
    };
  }, []);

  // global
  const [token] = useAtom(atomToken);
  const [user] = useAtom(atomUser);

  // states
  const [textContent, setTextContent] = useState([]);
  const [textbox, setTextbox] = useState(initialVal);
  const [apiCallSuccess, setApiCalSuccess] = useState(false);

  const [loading, setLoading] = useState("");

  const [selectedModal, setSelectedModal] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  // handler
  const handleShow = (modalId) => {
    setModalShow(true);
    setSelectedModal(modalId);
  };
  const handleClose = () => setModalShow(false);

  // setting state after success api
  useEffect(() => {
    const data = JSON.parse(getFromLocalStorage("responses"));
    const responseUserId = getFromLocalStorage("userId");

    if (textContent.length) {
      setTextbox({
        propertyOne: textContent[0],
        propertyTwo: textContent[1],
        propertyThree: textContent[2],
        propertyFour: textContent[3],
        propertyFive: textContent[4],
      });
    } else if (data && data.length && responseUserId) {
      if (responseUserId === user._id) {
        setTextbox({
          propertyOne: data[0],
          propertyTwo: data[1],
          propertyThree: data[2],
          propertyFour: data[3],
          propertyFive: data[4],
        });
      } else {
        setTextbox(initialVal);
      }
    } else {
      // setTextContent([]);
    }
  }, [textContent, user._id]);

  // feedback api
  const sendFeedbackAPI = async (feedback, setFeedback, handleClose, accuracy, category) => {
    if (!feedback.length) {
      toast.error("Give the feedback input!");
      return;
    }

    try {
      // getting data
      const getPOST = await axiosPOST(
        "feedback",
        { accuracy, category, feedback },
        setLoading,
        token
      );

      // if success
      if (getPOST.success) {
        setFeedback("");
        toast.success(getPOST.message);
        handleClose();
      }
    } catch (error) {
      setLoading(false);
      toast.error(`${error.response.data.message}`);
    }
  };

  return (
    <ChatDashboardWrap>
      <div className="app-container" style={{ position: 'relative' }}>
        <ChatHeadAudio
          setTextContent={setTextContent}
          apiCallSuccess={apiCallSuccess}
          setApiCalSuccess={setApiCalSuccess}
          access={access}
          textbox={textbox}
          setTextbox={setTextbox}
        />

        <SummaryBox
          label="Hulpvraag patiënt (of contactreden)"
          id="textbox1"
          value={textbox.propertyOne}
          apiCallSuccess={apiCallSuccess}
          handleShow={handleShow}
          modalId="feedbackModal1"
        />

        <SummaryBox
          label="Functioneringsproblemen en beloop"
          id="textbox2"
          value={textbox.propertyTwo}
          apiCallSuccess={apiCallSuccess}
          handleShow={handleShow}
          modalId="feedbackModal2"
        />

        <SummaryBox
          label="Medische gezondheidsdeterminanten"
          id="textbox3"
          value={textbox.propertyThree}
          apiCallSuccess={apiCallSuccess}
          handleShow={handleShow}
          modalId="feedbackModal3"
        />

        <SummaryBox
          label="Omgevingsdeterminanten"
          id="textbox4"
          value={textbox.propertyFour}
          apiCallSuccess={apiCallSuccess}
          handleShow={handleShow}
          modalId="feedbackModal4"
        />

        <SummaryBox
          label="Persoonlijke determinanten"
          id="textbox5"
          value={textbox.propertyFive}
          apiCallSuccess={apiCallSuccess}
          handleShow={handleShow}
          modalId="feedbackModal5"
        />
      </div>

      {/* feed back modal */}
      {modalData.map((modal) => (
        <ReactResponseModal
          key={modal.id}
          title={modal.title}
          loading={loading}
          sendFeedbackAPI={sendFeedbackAPI}
          handleClose={handleClose}
          show={modalShow && modal.id === selectedModal}
          modalId={modal.id}
        />
      ))}

      {/* send feedback */}
      <SendFeedBack loading={loading} sendFeedbackAPI={sendFeedbackAPI} />
    </ChatDashboardWrap>
  );
};

export default ChatDashboard;
