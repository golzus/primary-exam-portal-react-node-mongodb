import {useParams } from "react-router-dom";
import {
  useGetListWordsByIdMutation,
  useUpdateListWordsMutation,
} from "./ListWordApiSlice";
import "./singleListWord.css";
import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import WordSpeaker from "../add/WordSpeaker";
import ExaminerPage from "../list/ExaminerPage";
const SingleListWord = () => {
  const { company, roles } = useAuth();
  const { _id } = useParams();
  const [
    updateListWords,
    { data: updatedData, error, isSuccess: isupdateSuccess, isError },
  ] = useUpdateListWordsMutation();

  const [
    getListWordsById,
    { isSuccess, data: listWord, isLoading, isError: err },
  ] = useGetListWordsByIdMutation();
  useEffect(() => {
    getListWordsById({ _id });
  }, []);
  const [wordList, setWordList] = useState(listWord?.data.test);

  useEffect(() => {
    if (isSuccess) {
      setWordList(listWord.data.test);
    }
  }, [isSuccess]);
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (isupdateSuccess) {
//         navigate("/dash/actions");
//     }
// }, [isupdateSuccess]);
  if (isLoading) return <h1>Loading...</h1>;
  if (isError || error) return <h1>data.message</h1>;
  const handleChange2 = (index, field, value) => {
    const updatedList = [...wordList];
    //updatedList[index][field]=value
    setWordList(updatedList);
    //setWordList(()=>[...wordList,wordList[index][field]=value])
  };

 
  const handleChange = (index, field, value) => {
    const updatedList = [...wordList];
    const updateListNew = updatedList?.map((e, i) => {
      if (field === "translate")
        e = i === index ? { word: e.word, translate: value } : e;
      if (field === "word")
        e = i === index ? { word: value, translate: e.translate } : e;
      return e;
    });
    setWordList(updateListNew);
  };
  if (!listWord) return <h1>listWord not found</h1>;
  if (!isupdateSuccess) console.log(error, "data");

  let count = 0;
  const formSubmit = (e) => {
    e.stopPropagation()
    e.preventDefault();
    const data = new FormData(e.target);
    const listObject = Object.fromEntries(data.entries());
    listObject.company = company._id;
    listObject._id = _id;
    listObject.test = wordList;
    updateListWords(listObject);
  };
  const funcOver=(()=>{
    console.log("over");
  return<h1>"rr"</h1>
  })
  return (
    <div className="formupdatelistword">
      <ExaminerPage />
      <form onSubmit={formSubmit} className="print-content">
        <div className="titles">
          <input
            className="inputWordUpdate ss titleListWord"
            name="title"
            defaultValue={listWord.data.title}
          />
          <input
            className="inputWordUpdate ss dateListWord"
            name="date"
            // defaultValue={listWord.data.date}
            value={listWord?.data.date.slice(0, 10)}
            type="date"
          />
          <select name="active" id="active" className="if-you-may-do">
            <option selected={listWord.data.active} value={true}>
              ניתן לעשות {""}
            </option>
            <option selected={!listWord.data.active} value={false}>
              לא ניתן לעשות {""}{" "}
            </option>
          </select>
          <select name="seeWords" id="seeWords" className="if-you-may-see">
            <option selected={!listWord.data.seeWords} value={false}>
              לא ניתן לראות {""}
            </option>
            <option selected={listWord.data.seeWords} value={true}>
              ניתן לראות {""}{" "}
            </option>
          </select>
          <input
            name="countListenToWord"
            id="countListenToWord"
            defaultValue={listWord.data.countListenToWord}
            type="number"
          />
        </div>
        <table className="users-list-table">
          <thead>
            <tr>
              <th className="inputWordUpdateSmaller">מס'</th>
              <th className="inputWordUpdateSmaller inputWordUpdateSmallerEar">
                {" "}
                שמיעה
              </th>

              <th className="inputWordUpdate">מילה</th>
              <th className="inputWordUpdate"> תרגום</th>
            </tr>
          </thead>
          <tbody>
            {wordList?.map((cat, index) => (
              <tr key={index}>
                <td className="inputWordUpdate inputWordUpdateSmaller" onPointerOver={funcOver}>
                  {index + 1}.
                </td>
                <td className="inputWordUpdate inputWordUpdateSmaller inputWordUpdateSmallerEar">
                  {" "}
                  <WordSpeaker word={cat.word} />{" "}
                </td>
                <td className="inputWordUpdate">
                  <input
                    name="test"
                    // className="inputWordUpdate"
                    defaultValue={cat.word}
                    onChange={(e) =>
                      handleChange(index, "word", e.target.value)
                    }
                  />
                  {/* <WordSpeaker word={cat.word} /> */}
                </td>

                <td className="inputWordUpdate">
                  <input
                    // name="test.translate"
                    // name={index}
                    // className="inputWordUpdate"
                    defaultValue={cat.translate}
                    onChange={(e) =>
                      handleChange(index, "translate", e.target.value)
                    }
                    //  onChange={(e) => handleChange(index, 'translate', e.target.value)}
                  />
                </td>
                <td>{/* <WordSpeaker word={cat.word} /> */}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button type="submit" className="updateList">
          עדכן
        </button>
      </form>
    </div>
  );
};

export default SingleListWord;

// import React, { useState } from 'react';
// import WordSpeaker from './WordSpeaker';

// const App = () => {
//   const [wordList, setWordList] = useState([
//     { word: 'apple', translate: 'תפוח' },
//     { word: 'banana', translate: 'בננה' },
//     // ניתן להוסיף ערכים נוספים לרשימה
//   ]);

//   const handleChange = (index, field, value) => {
//     const updatedList = [...wordList];
//     updatedList[index][field] = value;
//     setWordList(updatedList);
//   };

//   const handleSave = () => {
//     console.log(wordList);
//     // כאן ניתן לעבד את המידע המעודכן, לשמור אותו בשרת, וכו'
//   };

//   return (
//     <div>
//       <table>
//         <tbody>
//           {wordList.map((cat, index) => (
//             <tr key={index}>
//               <td>{index + 1}.</td>
//               <td>
//                 <input
//                   name="test"
//                   className="inputWordUpdate"
//                   value={cat.word}
//                   onChange={(e) => handleChange(index, 'word', e.target.value)}
//                 />
//               </td>
//               <td>
//                 <WordSpeaker word={cat.word} />
//               </td>
//               <td>
//                 <input
//                   name="test.translate"
//                   className="inputWordUpdate"
//                   value={cat.translate}
//                   onChange={(e) => handleChange(index, 'translate', e.target.value)}
//                 />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <button onClick={handleSave}>שמור שינויים</button>
//     </div>
//   );
// };

// export default App;

