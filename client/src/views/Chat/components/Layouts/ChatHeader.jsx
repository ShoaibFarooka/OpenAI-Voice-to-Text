import { useRef, useState } from "react";
import { ReactMic } from 'react-mic'

const ChatHeader = () => {

    const [isRecording, setIsRecording] = useState('idle');
    const [recordedBlob, setRecordedBlob] = useState(null);
    const [recordingTime, setRecordingTime] = useState(0);
    const micRef = useRef(null);

    const startRecording = () => {
        setIsRecording('recording');
    };

    const stopRecording = () => {
        setIsRecording('stopped');
        setRecordingTime(0);
        micRef.current.onStop();
    };

    const pauseRecording = () => {
        setIsRecording('paused');
        micRef.current.pause();
    };

    const resumeRecording = () => {
        setIsRecording('recording');
        micRef.current.resume();
    };

    const onData = (recordedData) => {
        // Do something with the recorded audio data if needed
        console.log('Recording onData', recordedData);
    };

    const onStop = (recordedBlob) => {
        try {
            setIsRecording('stopped');
            setRecordedBlob(recordedBlob);
            setRecordingTime(recordedBlob.stopTime - recordedBlob.startTime);

            // Uncomment the line below when you are ready to send the audio to the API
            // sendAudioToAPI(recordedBlob.blob);
        } catch (error) {
            console.error('Error during onStop:', error);
        }
    };

    //   const sendAudioToAPI = async (audioBlob) => {
    //     try {
    //       const formData = new FormData();
    //       formData.append('audio', audioBlob, 'recordedAudio.wav');

    //       // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
    //       const response = await axios.post('YOUR_API_ENDPOINT', formData, {
    //         headers: {
    //           'Content-Type': 'multipart/form-data',
    //         },
    //       });

    //       console.log('API Response:', response.data);
    //     } catch (error) {
    //       console.error('Error sending audio to API:', error);
    //     }
    //   };

    return (
        <div>
            <div className="app-header text-center">
                <img src="/images/text_only_blue.png" alt="Fysio.AI Logo" className="header-logo" />
            </div>

            <div>
                <ReactMic
                    record={isRecording}
                    // className="sound-wave"
                    onStop={onStop}
                    onData={onData}
                    // strokeColor="#000000"
                    // backgroundColor="#FF4081"
                    mimeType="audio/wav"
                    sampleRate={44100}
                    audioBitsPerSecond={128000}
                    ref={micRef}
                />
                <div className="button-group mt-4 mb-4 text-center">

                    {isRecording === 'idle' && <button
                        id="startButton"
                        className="control-btn start-btn"
                        title="Klik om de opname te starten"
                        onClick={startRecording}
                    >
                        <i className="fas fa-play"></i>Start Opname
                    </button>}

                    {isRecording === 'recording' && <>
                        <button
                            id="pauseButton"
                            className="control-btn pause-btn"
                            title="Klik om de opname te pauzeren"
                            onClick={pauseRecording}
                        >
                            <i className="fas fa-pause"></i>Pauzeer Opname
                        </button>
                    </>}

                    {isRecording === 'paused' && <>
                        <button
                            id="resumeButton"
                            className="control-btn resume-btn"
                            title="Klik hier om door te gaan met de huidige opname"
                            onClick={resumeRecording}
                        >
                            <i className="fas fa-play"></i>Doorgaan met Opnemen
                        </button>


                        <button
                            id="stopButton"
                            className="control-btn stop-btn"
                            title="Klik hier om de opname te stoppen en op te slaan"
                            onClick={stopRecording}
                        >
                            <i className="fas fa-stop"></i>Stop Opname en maak samenvatting
                        </button>
                    </>}


                    {recordedBlob && <audio src={recordedBlob.blobURL} controls></audio>}

                </div>
            </div>





            <div className="language-selection mt-4 mb-4 text-center">
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="languageOptions" id="nederlands" value="Nederlands"
                        defaultChecked />
                    <label className="form-check-label" htmlFor="nederlands">Nederlands</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="languageOptions" id="engels" value="Engels" />
                    <label className="form-check-label" htmlFor="engels">Engels</label>
                </div>
            </div>


            <div id="statusMessage" className="mt-3 mb-3 text-center">
                {isRecording === 'recording' && <>Start Recodring {recordingTime.toFixed(2)}</>}
            </div>

            <div id="noSoundMessage" className="mt-3 mb-3 text-center warning-message" style={{ display: 'none' }}>
                Geen geluid gedetecteerd, controleer je audio.
            </div>


        </div >
    )
}

export default ChatHeader