import React, { useEffect, useState } from "react";
import { useAddListWordsMutation } from "../view/ListWordApiSlice";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import { MdDelete } from "react-icons/md";
import { FaRecordVinyl } from "react-icons/fa6";
import { useSelector } from "react-redux";
import CurrentSchoolAndClass from "../../../companies/CurrentSchoolAndClass/CurrentSchoolAndClass";

const AddWordsList = () => {
  const { company } = useAuth();
  const [addListWords, { isError, error, isSuccess, isLoading }] =
    useAddListWordsMutation();
  const navigate = useNavigate();
  
  // State for storing list of words
  const [words, setWords] = useState([]);
  // State for new word and translation inputs
  const [newWord, setNewWord] = useState("");
  const [newTranslate, setNewTranslate] = useState("");
  // State for showing the number of times to play each word
  const [seeOver, setSeeOver] = useState(false);
  // State for chosen class
  const [chosenClass, setChosenClass] = useState('');
  // State for chosen school
  const [chosenSchool, setChosenSchool] = useState('');

  // Function to add new word to the list
  const handleAddNewWord = () => {
    if (newWord && newTranslate) {
      setWords([
        ...words,
        {
          word: newWord,
          translate: newTranslate,
          answer: "",
          correct: false, // Changed to boolean value
        },
      ]);
      setNewWord("");
      setNewTranslate("");
    }
  };

  // Function to delete a word from the list
  const handleDeleteWord = (index) => {
    setWords(words.filter((_, i) => i !== index));
  };

  // Function to handle form submission
  const handleSubmitSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const listObject = Object.fromEntries(formData.entries());
    listObject.test = words;
    listObject.class = chosenClass;
    listObject.school = chosenSchool;
    addListWords(listObject);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && newWord && newTranslate) {
      handleAddNewWord();
    }
  };

  //  if (!chosenClass ) return <CurrentSchoolAndClass />;
  
  return (
    <div className="add--word-list">
      <form onSubmit={handleSubmitSave} className="list-word">
        {/* Form inputs */}
        <div className="test-name&date">
          <input name="title" className="formEnteries" required placeholder="title" />
          <input name="date" type="date" className="formEnteries" required placeholder="תאריך לועזי" />
          <select className="qq" name="active" id="active">
            <option value={true}>ניתן לעשות</option>
            <option value={false}>לא ניתן לעשות</option>
          </select>
          {/* Show input for number of times to play each word on mouseover */}
          {seeOver && <p>מספר פעמים להשמעת כל מילה</p>}
          <FaRecordVinyl />
          <input name="countListenToWord" defaultValue={5} onMouseOver={() => setSeeOver(true)} id="countListenToWord" type="number" />
          <button className="buttonForm" type="submit">שליחה</button>
        </div>
        {/* Table for displaying words */}
        <table className="users-list-table">
          <thead>
            <tr>
              <td>מס'</td>
              <td>מילה</td>
              <td>תרגום</td>
            </tr>
          </thead>
          <tbody>
            {/* Map over words array to display each word */}
            {words.map((word, index) => (
              <tr key={index}>
                <td>{index + 1}.</td>
                <td className="td-addWord">
                  <input className="td-addWord" defaultValue={word.word} />
                </td>
                <td className="td-addWord">
                  <input className="td-addWord" defaultValue={word.translate} />
                </td>
                <td>
                  <button className="deleteWord" onClick={() => handleDeleteWord(index)}>
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
            {/* Row for adding new word */}
            <tr>
              <td>{words.length + 1}</td>
              <td className="td-addWord">
                <input
                required
                  value={newWord}
                  onChange={(e) => setNewWord(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="מילה"
                />
              </td>
              <td className="td-addWord">
                <input
                required
                  value={newTranslate}
                  onChange={(e) => setNewTranslate(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="תרגום"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default AddWordsList;

{

// import { useEffect, useState } from "react";
// import {useAddListWordsMutation}from '../view/ListWordApiSlice'
// import "./addWordList.css";
// import { useNavigate } from "react-router-dom";
// import useAuth from "../../../../hooks/useAuth";
// const AddWordsList = () => {
//   // import useAuth from "../../hooks/useAuth";
//   const {company}=useAuth()
//   const [addListWords,{ isError, error, isSuccess, isLoading }]=useAddListWordsMutation()
//   const [arrWords, setArrWords] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (isSuccess) {
//         navigate("/dash/actions/wordLsList");
//     }
// }, [isSuccess]);
//   let count = 0;
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const wordObject = Object.fromEntries(formData.entries());
//     setArrWords((a) => [...arrWords, wordObject]);
//   };
//   const handleSubmitSave=(e)=>{
//     e.preventDefault();
//     const data=(e.target.value);
//     const formData = new FormData(e.target);
//     const listObject = Object.fromEntries(formData.entries());
//     listObject.test=arrWords
//    addListWords(listObject)
//   }

//   const [words, setWords] = useState([]);

//   const [newWord, setNewWord] = useState("");
//   const [newTranslate, setNewTranslate] = useState("");

//   const AddWordsList = () => {
//   const [words, setWords] = useState([]);
//   const [newWord, setNewWord] = useState("");
//   const [newTranslate, setNewTranslate] = useState("");
//   }
//   const handleAddNewWord = () => {
//     if (newWord && newTranslate) {
//       setWords([...words, { word: newWord, translate: newTranslate }]);
//       setNewWord("");
//       setNewTranslate("");
//     }
//   };

//   const handleDeleteWord = (index) => {
//     setWords(words.filter((_, i) => i !== index));
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && newWord && newTranslate) {
//       handleAddNewWord();
//     }
//   };
//   return (
//     <div className="add--word-list">
//       <form onSubmit={handleSubmitSave} className="list-word">
//   <div className="test-name&date">   <input name="title" required placeholder="title" />
//         {/* <input name="ggdate" required placeholder="תאריך עברי" /> */}
//         <input name="date" type="date" required placeholder="תאריך לועזי" />
//         <select className="qq" name='active' id='active'>
//                             <option  value={true}>ניתן לעשות {""}</option>
//                             <option value={false}>לא ניתן לעשות {""} </option>
//                         </select>
//         <button  type="submit">שליחה</button></div>
//         <table className="users-list-table">
//           <thead>
//             <tr>
//               <td>מס'</td>

//               <td>מילה</td>
//               <td> תרגום</td>
//             </tr>
//           </thead>
//           <tbody>
//             {arrWords.map((cat) => (
//               <tr>
//                 <td>{++count}.</td>

//                 <td key={cat.word} className="td-addWord">
//                   {cat.word}
//                 </td>
//                 <td className="td-addWord">{cat.translate}</td>
//               </tr>
//             ))}
//                <tr>
//             <td>
//               <input
//                 value={newWord}
//                 onChange={(e) => setNewWord(e.target.value)}
//                 onKeyDown={handleKeyDown}
//                 placeholder="מילה"
//               />
//             </td>
//             <td>
//               <input
//                 value={newTranslate}
//                 onChange={(e) => setNewTranslate(e.target.value)}
//                 onKeyDown={handleKeyDown}
//                 placeholder="תרגום"
//               />
//             </td>
//             <td>
//               <button onClick={handleAddNewWord}>הוסף</button>
//             </td>
//           </tr>
//           </tbody>
//         </table>

//       </form>
//       {/* <form className="addWordForm" onSubmit={handleSubmit}>

//         <input required name="word" placeholder="מילה" />
//         <input required name="translate" placeholder="תרגום" />
//         <button type="submit">צרף מילה</button>

//       </form> */}
//     </div>
//   );
// };

// export default AddWordsList;

// import React, { useEffect, useState } from "react";
// import { useAddListWordsMutation } from '../view/ListWordApiSlice';
// import "./addWordList.css";
// import { useNavigate } from "react-router-dom";
// import useAuth from "../../../../hooks/useAuth";
// import { BrowserRouter as Router } from "react-router-dom";

// const AddWordsList = () => {
//   const { company } = useAuth();
//   const [addListWords, { isError, error, isSuccess, isLoading }] = useAddListWordsMutation();
//   const [words, setWords] = useState([]);
// const [word, setWord]=useState("")
// const [translate,setTranslate]=useState("")
// //   // const navigate = useNavigate();

//   // useEffect(() => {
//   //   if (isSuccess) {
//   //     navigate("/dash/actions/wordLsList");
//   //   }
//   // }, [isSuccess]);

//   let count = 0;

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const wordObject = Object.fromEntries(formData.entries());
//     setWords((prevWords) => [...prevWords, wordObject]);
//   };

//   const handleSubmitSave = (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const listObject = Object.fromEntries(formData.entries());
//     listObject.test = words;
//     addListWords(listObject);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter")
//     if(word&&translate)
//    { const wordObject = {word,translate}
//     setWords((prevWords) => [...prevWords, wordObject]);
// setWord("")
// setTranslate("")
// e.target.value=""}
//   };

// const handleDelete = (index) => {
//   setWords((prevWords) => prevWords.filter((_, i) => i !== index));
// };
//    return (
//     //  <Router>
//        <div className="add--word-list">
//         <form onSubmit={handleSubmitSave} className="list-word">
//          <div className="test-name&date">
//             <input name="title" required placeholder="title" />
//              {/* <input name="ggdate" required placeholder="תאריך עברי" /> */}
//              <input name="date" type="date" required placeholder="תאריך לועזי" />
//              <select className="qq" name='activeWords' id='activeWords'>
//             <option value={true}>ניתן לעשות</option>
//              <option value={false}>לא ניתן לעשות</option>
//          </select>
// <button type="submit">שליחה</button>
// </div>
//           <table className="users-list-table">
//              <thead>
//                <tr>
//                  <td>מס'</td>
//                 <td>מילה</td>
//                <td>תרגום</td>
//                </tr>
//              </thead>
//            <tbody>
//                {words.map((word, index) => (
//                 <tr key={index}>
//  <td>
//  <button onClick={() => handleDelete(index)}>מחק</button>
//  </td>
//                    <td>{index + 1}.</td>
//                    <td>{word.word}</td>
//                  <td>{word.translate}</td>
// </tr>
//               ))}

//              </tbody>
//            </table>

//          {/* <form className="addWordForm" onSubmit={handleSubmit}>  */}
//           <input required name="word" onChange={(e)=>(setWord(e.target.value))} placeholder="מילה"onKeyDown={handleKeyPress}/>
//           <input required name="translate" onChange={(e)=>(setTranslate(e.target.value))} placeholder="תרגום" onKeyDown={handleKeyPress}/>
//       </form>

//        </div>

//    );
//  };

//  export default AddWordsList;

// {
  /* // import React, { useState } from "react";

// const AddWordsList = () => { */
}
//   const [words, setWords] = useState([]);
//   const [word, setWord] = useState("");
//   const [translate, setTranslate] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const wordObject = { word, translate };
//     setWords((prevWords) => [...prevWords, wordObject]);
//     setWord("");
//     setTranslate("");
//   };

//   const handleDelete = (index) => {
//     setWords((prevWords) => prevWords.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="add--word-list">
//       <form onSubmit={handleSubmit} className="list-word">
//         <input
//           required
//           name="word"
//           value={word}
//           onChange={(e) => setWord(e.target.value)}
//           placeholder="מילה"
//         />
//         <input
//           required
//           name="translate"
//           value={translate}
//           onChange={(e) => setTranslate(e.target.value)}
//           placeholder="תרגום"
//         />
//         <button type="submit">צרף מילה</button>
//       </form>

//       <table className="users-list-table">
//         <thead>
//           <tr>
//             <td>מס'</td>
//             <td>מילה</td>
//             <td>תרגום</td>
//             <td>פעולות</td>
//           </tr>
//         </thead>
//         <tbody>
//           {words.map((word, index) => (
//             <tr key={index}>
//               <td>{index + 1}.</td>
//               <td>{word.word}</td>
//               <td>{word.translate}</td>
//               <td>
//                 <button onClick={() => handleDelete(index)}>מחק</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AddWordsList;




// import React, { useState } from "react";

// const AddWordsList = () => {
//   const [words, setWords] = useState([]);
//   const [newWord, setNewWord] = useState("");
//   const [newTranslate, setNewTranslate] = useState("");

//   const handleAddNewWord = () => {
//     if (newWord && newTranslate) {
//       setWords([...words, { word: newWord, translate: newTranslate }]);
//       setNewWord("");
//       setNewTranslate("");
//     }
//   };

//   const handleDeleteWord = (index) => {
//     setWords(words.filter((_, i) => i !== index));
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && newWord && newTranslate) {
//       handleAddNewWord();
//     }
//   };

//   return (
//     <div className="add--word-list">
//       <table className="users-list-table">
//         <thead>
//           <tr>
//             <td>מילה</td>
//             <td>תרגום</td>
//             <td>פעולות</td>
//           </tr>
//         </thead>
//         <tbody>
//           {words.map((word, index) => (
//             <tr key={index}>
//               <td>{word.word}</td>
//               <td>{word.translate}</td>
//               <td>
//                 <button onClick={() => handleDeleteWord(index)}>"x"</button>
//               </td>
//             </tr>
//           ))}
//           <tr>
//             <td>
//               <input
//                 value={newWord}
//                 onChange={(e) => setNewWord(e.target.value)}
//                 onKeyDown={handleKeyDown}
//                 placeholder="מילה"
//               />
//             </td>
//             <td>
//               <input
//                 value={newTranslate}
//                 onChange={(e) => setNewTranslate(e.target.value)}
//                 onKeyDown={handleKeyDown}
//                 placeholder="תרגום"
//               />
//             </td>
//             <td>
//               <button onClick={handleAddNewWord}>הוסף</button>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AddWordsList;
