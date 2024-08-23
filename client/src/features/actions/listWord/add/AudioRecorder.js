




// import React, { useState } from 'react';
// import {ReactMic} from 'react-mic';
// import { FaPlay } from "react-icons/fa";
// import { ImStop2 } from "react-icons/im";
// import { FaRecordVinyl } from "react-icons/fa6";
// const AudioRecorder = () => {
//   // State for recording status and recorded audio blob
//   const [isRecording, setIsRecording] = useState(false);
//   const [blobObject, setBlobObject] = useState(null);

//   // Function to handle start of recording
//   const handleStart = () => {
//     setIsRecording(true);
//   };

//   // Function to handle stop of recording
//   const handleStop = () => {
//     setIsRecording(false);
//   };

//   // Function called when receiving a chunk of real-time data
//   const onData = (recordedBlob) => {
//     console.log('chunk of real-time data is: ', recordedBlob);
//   };

//   // Function called when recording stops, sets the recorded blob
//   const onStop = (recordedBlob) => {
//     setBlobObject(recordedBlob);
//   };

//   // Function to play the recorded audio
//   const handlePlay = () => {
//     const audioElement = new Audio(blobObject.blobURL);
//     audioElement.play();
//   };

//   return (
//     <div>
//       {/* ReactMic component for recording */}
//       <ReactMic
//         record={isRecording}
//         onStop={onStop}
//         onData={onData}
//         strokeColor="#000000"
//         backgroundColor="#FF4081"
//         width="40"
//         hight="15"
//       />
//       {/* Button to start recording */}
//       <button onClick={handleStart} disabled={isRecording}>
//       <FaPlay />
//             </button>
//       {/* Button to stop recording */}
//       <button onClick={handleStop} disabled={!isRecording}>
//       <ImStop2 />
//             </button>
//       {/* Button to play the recorded audio */}
//       <button onClick={handlePlay} disabled={!blobObject}>
//       <FaRecordVinyl 
//       fontSize={50}
//       strokeColor="#000000"
//       backgroundColor="FF4081"/>
//             </button>
//       {/* Display the recorded audio if available */}
//       {blobObject && (
//         <audio controls>
//           <source src={blobObject.blobURL} type="audio/wav" />
//         </audio>
//       )}
//     </div>
//   );
// };

// export default AudioRecorder;
