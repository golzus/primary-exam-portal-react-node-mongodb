// import { useNavigate, useParams } from "react-router-dom";
// import "./test.css";
// import {
//   useGetListWordsByIdMutation,
//   useUpdateListWordsMutation,
// } from "../view/ListWordApiSlice";
// import { GrStatusGood } from "react-icons/gr";
// import { useEffect, useState } from "react";
// import useAuth from "../../../../hooks/useAuth";
// import WordSpeaker from "../add/WordSpeaker";
// const Test = () => {
//   const { company, roles } = useAuth();
//   const [markStudent, setMarkStudent] = useState(0);
//   const [seeMark, setSeeMark] = useState(false);
//   const [seeWarning, setSeewarning] = useState(false);
//   const [sureStarting, setSureStarting] = useState(false);
//   const { _id } = useParams();
//   const [
//     updateListWords,
//     { data: updatedData, error, isSuccess: isupdateSuccess, isError },
//   ] = useUpdateListWordsMutation();

//   const [
//     getlistWordById,
//     { isSuccess, data: listWord, isLoading, isError: err },
//   ] = useGetListWordsByIdMutation();
//   const [wordList, setWordList] = useState(listWord?.data.test);
//   useEffect(() => {
//     getlistWordById({ _id });
//   }, []);
//   useEffect(() => {
//     if (isSuccess) {
//       setWordList(listWord.data.test);
//     }
//   }, [isSuccess]);

//   const handleChange = (index, value) => {
//     const updatedList = [...wordList];
//     const updateListNew = updatedList?.map((e, i) => {
//       e =
//         i === index
//           ? {
//               word: e.word,
//               translate: e.translate,
//               answer: value,
//               correct: true,
//             }
//           : e;
//       return e;
//     });
//     setWordList(updateListNew);
//     console.log(updateListNew, "ppוווווווווו");
//         console.log(wordList,"ooooooooo");
//   };
//   const navigate = useNavigate();
//   //   useEffect(() => {
//   //     if (isupdateSuccess) {
//   //         navigate("/dash/actions");
//   //     }
//   // }, [isupdateSuccess]);
//   const handleWantsStart = () => {
//     setSureStarting(true);
//   };
//   if (sureStarting === false)
//     return (
//       <div className="warningBeforeCheckingTest">
//         <p>
//           האם הינך בטוח שברצונך להתחיל את הבוחן?
//           <br />
//           לא ניתן לעשות זאת פעם נוספת!
//         </p>
//         <button onClick={handleWantsStart}>המשך</button>
//         {/* <button>ביטול</button> */}
//       </div>
//     );
//   // if (!listWord) return <h1>listWord not found</h1>;
//   if (isLoading) return <h1>Loading...</h1>;
//   if (isError || error) return <h1>data.message</h1>;
//   // let g = wordList;
//   // // g["0"]["translate"]="l"
//   // console.log(g, "ppppppppppppp");
//   // const a = (index, val) => {
//   //   g = g?.map((e, i) => {
//   //     e = i === index ? { word: e.word, translate: val } : e;

//   //     return e;
//   //   });
//   // };
//   // console.log(g, ";;");
//   let count = 0;
//   let mark = 0;
//   const handleSubmit = (e) => {
//     e.stopPropagation()
//     e.preventDefault();
//     setSeewarning(true);
//   };
//   const Handle=(e)=>{
//     e.preventDefault()
//   }
//   const removeWarning = (e) => {
//     setSeewarning(false);
//   };
//   const checkTest = (e) => {
//     setSeewarning(false);
//     wordList.map((e, index) => {
//       if (e.translate === e.answer) {
//         mark++;
//         const updatedList = [...wordList];
//         const updateListNew = updatedList?.map((e, i) => {
//           e =
//             i === index
//               ? {
//                   word: e.word,
//                   translate: e.translate,
//                   answer: e.answer,
//                   correct: false,
//                 }
//               : e;
//           return e;
//         });
//         console.log(updateListNew, "ppוווווווווו",index);
//         console.log(wordList,"ooooooooo");
//       }
//     });
//     mark = (mark / wordList.length) * 100;
//     setMarkStudent(mark);
//     mark = 0;
//     setSeeMark(true);
//   };

//   return (
//     <div className="formupdatelistword">
//       <form onSubmit={Handle}>
//         <input
//           className="inputWordUpdate ss"
//           name="title"
//           value={listWord?.data.title}
//         />
//         <input
//           className="inputWordUpdate ss"
//           name="date"
//           value={listWord?.data.date.slice(0, 10)}
//           // type="date"
//         />
//         {/* <select name="active" id="active" className="if-you-may-do">
//           <option selected={!listWord?.data.active} value={false}>
//             ניתן לעשות {""}
//           </option>
//           <option selected={listWord?.data.active} value={true}>
//             לא ניתן לעשות {""}{" "}
//           </option>
//         </select> */}
//         <table className="users-list-table">
//           <thead>
//             <tr>
//               {seeMark && <td>סימון</td>}
//               <td>מס'</td>
//               {listWord?.data.seeWords && <td>מילה</td>}
//               <td> תרגום</td>
//               {seeMark && <td>תשובה נכונה</td>}

//               <td>השמעה</td>
//             </tr>
//           </thead>
//           <tbody>
//             {wordList?.map((cat, index) => (
//               <tr key={index} className="trWords">
//                 {seeMark&& cat.correct && (
//                   <td>
//                     <GrStatusGood />
//                   </td>
//                 )}
//                 {seeMark && !cat.correct && <td>x</td>}

//                 <td>{index + 1}.</td>
//                 {listWord?.data.seeWords && (
//                   <td>
//                     <div name="test" className="inputWord">
//                       {cat.word}
//                     </div>
//                   </td>
//                 )}

//                 <td>
//                   תשובה:
//                   <input
//                     // key={cat.translate}
//                     // name={"test"[index]}
//                     id="testAnswers"
//                     className="answerTranslateWord"
//                     onChange={(e) => handleChange(index, e.target.value)}
//                     /* onChange={(e) => handleChange(index, 'translate', e.target.value)} */
//                   />
//                   {/* <span><input className="answerTranslateWord"/>answer:</span> */}
//                 </td>
//                 {seeMark && <td>{cat.translate}</td>}

//                 <td>
//                   <WordSpeaker word={cat.word} />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {!seeMark && <button type="submit" onClick={handleSubmit}>הגש</button>}{" "}
//         {seeWarning && (
//           <div className="warningBeforeCheckingTest">
//             <p>
//               האם הינך בטוח שברצונך להגיש- <br />
//               לא יהיה אפשרות לעשות את הבוחן פעם נוספת!
//             </p>
//             <button onClick={checkTest}>אישור</button>
//             <button onClick={removeWarning}>חזרה</button>
//           </div>
//         )}
//         {/* <button type="submit" className="updateList">עדכן</button> */}
//         {/* { readyMark&&<h1>ציונך הוא:{mark}</h1>} */}
//         {seeMark && <h1>ציונך הוא:{markStudent}%</h1>}
//       </form>
//     </div>
//   );
// };

// export default Test;


import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./test.css";
import {
  useGetListWordsByIdMutation,
  useUpdateListWordsMutation,
} from "../view/ListWordApiSlice";
import { GrStatusGood } from "react-icons/gr";
import useAuth from "../../../../hooks/useAuth";
import WordSpeaker from "../add/WordSpeaker";

const Test = () => {
  const { company, roles } = useAuth();
  const [markStudent, setMarkStudent] = useState(0);
  const [seeMark, setSeeMark] = useState(false);
  const [seeWarning, setSeeWarning] = useState(false);
  const [sureStarting, setSureStarting] = useState(false);
  const { _id } = useParams();
  
  const [updateListWords, { data: updatedData, error, isSuccess: isupdateSuccess, isError }] = useUpdateListWordsMutation();
  
  const [getlistWordById, { isSuccess, data: listWord, isLoading, isError: err }] = useGetListWordsByIdMutation();
  
  const [wordList, setWordList] = useState(listWord?.data.test);

  useEffect(() => {
    getlistWordById({ _id });
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setWordList(listWord.data.test);
    }
  }, [isSuccess]);

  const handleChange = (index, value) => {
    const updatedList = [...wordList];
    const updateListNew = updatedList?.map((e, i) => {
      e =
        i === index
          ? {
              word: e.word,
              translate: e.translate,
              answer: value,
              correct: true,
            }
          : e;
      return e;
    });
    setWordList(updateListNew);
  };

  const navigate = useNavigate();

  const handleWantsStart = () => {
    setSureStarting(true);
  };

  if (sureStarting === false) {
    return (
      <div className="warningBeforeCheckingTest">
        <p>
          האם הינך בטוח שברצונך להתחיל את הבוחן?
          <br />
          לא ניתן לעשות זאת פעם נוספת!
        </p>
        <button onClick={handleWantsStart}>המשך</button>
      </div>
    );
  }

  if (isLoading) return <h1>Loading...</h1>;
  if (isError || error) return <h1>{error ? error.message : "An error occurred"}</h1>;

  let count = 0;
  let mark = 0;

  const handleSubmit = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setSeeWarning(true);
  };

  const Handle = (e) => {
    e.preventDefault();
  };

  const removeWarning = (e) => {
    setSeeWarning(false);
  };

  const checkTest = (e) => {
    setSeeWarning(false);
    wordList.map((e, index) => {
      if (e.translate === e.answer) {
        mark++;
        const updatedList = [...wordList];
        const updateListNew = updatedList?.map((e, i) => {
          e =
            i === index
              ? {
                  word: e.word,
                  translate: e.translate,
                  answer: e.answer,
                  correct: false,
                }
              : e;
          return e;
        });
        setWordList(updateListNew);
      }
    });
    mark = (mark / wordList.length) * 100;
    setMarkStudent(mark);
    mark = 0;
    setSeeMark(true);
  };

  return (
    <div className="formupdatelistword">
      <form onSubmit={Handle}>
        <input className="inputWordUpdate ss" name="title" value={listWord?.data.title} />
        <input className="inputWordUpdate ss" name="date" value={listWord?.data.date.slice(0, 10)} />
        <table className="users-list-table">
          <thead>
            <tr>
              {seeMark && <td>סימון</td>}
              <td>מס'</td>
              {listWord?.data.seeWords && <td>מילה</td>}
              <td>תרגום</td>
              {seeMark && <td>תשובה נכונה</td>}
              <td>השמעה</td>
            </tr>
          </thead>
          <tbody>
            {wordList?.map((cat, index) => (
              <tr key={index} className="trWords">
                {seeMark&& cat.correct && (
                  <td>
                    <GrStatusGood />
                  </td>
                )}
                {seeMark && !cat.correct && <td>x</td>}
                <td>{index + 1}.</td>
                {listWord?.data.seeWords && (
                  <td>
                    <div name="test" className="inputWord">
                      {cat.word}
                    </div>
                  </td>
                )}
                <td>
                  תשובה:
                  <input
                    id="testAnswers"
                    className="answerTranslateWord"
                    onChange={(e) => handleChange(index, e.target.value)}
                  />
                </td>
                {seeMark && <td>{cat.translate}</td>}
                <td>
                  <WordSpeaker word={cat.word} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!seeMark && <button type="submit" onClick={handleSubmit}>הגש</button>}
        {seeWarning && (
          <div className="warningBeforeCheckingTest">
            <p>
              האם הינך בטוח שברצונך להגיש- <br />
              לא יהיה אפשרות לעשות את הבוחן פעם נוספת!
            </p>
            <button onClick={checkTest}>אישור</button>
            <button onClick={removeWarning}>חזרה</button>
          </div>
        )}
        {seeMark && <h1>ציונך הוא:{markStudent}%</h1>}
      </form>
    </div>
  );
};

export default Test;


// function areWordsIdentical(word1, word2) {
//   // נורמליזציה של המילים
//   const normalizedWord1 = word1.normalize('NFD').toLowerCase();
//   const normalizedWord2 = word2.normalize('NFD').toLowerCase();

//   // הורדת אותיות ניקוד
//   const word1WithoutDiacritics = normalizedWord1.replace(/[\u0300-\u036F]/g, '');
//   const word2WithoutDiacritics = normalizedWord2.replace(/[\u0300-\u036F]/g, '');

//   // השוואה
//   return word1WithoutDiacritics === word2WithoutDiacritics;
// }

// // דוגמה לשימוש
// const word1 = 'שלום';
// const word2 = 'שָׁלוֹם';

// if (areWordsIdentical(word1, word2)) {
//   console.log('המילים זהות');
// } else {
//   console.log('המילים אינן זהות');
// }
