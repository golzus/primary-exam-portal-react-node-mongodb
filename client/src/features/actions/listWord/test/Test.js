import { useNavigate, useParams } from "react-router-dom";
import "./test.css";
import {
  useGetListWordsByIdMutation,
  useUpdateListWordsMutation,
} from "../view/ListWordApiSlice";
import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import WordSpeaker from "../add/WordSpeaker";
const Test = () => {
  const { company, roles } = useAuth();
  const [markStudent, setMarkStudent] = useState(0);
const [seeMark,setSeeMark]=useState(false)


  const { _id } = useParams();
  const [
    updateListWords,
    { data: updatedData, error, isSuccess: isupdateSuccess, isError },
  ] = useUpdateListWordsMutation();

  const [
    getlistWordById,
    { isSuccess, data: listWord, isLoading, isError: err },
  ] = useGetListWordsByIdMutation();
  const [wordList, setWordList] = useState(listWord?.data.test);
  useEffect(() => {
    getlistWordById({ _id });
  }, []);
  useEffect(() => {
    if (isSuccess) {
      console.log(listWord, "4444444444444");
      console.log(listWord.data.date, "ll");
      setWordList(listWord.data.test);
    }
  }, [isSuccess]);

  const handleChange = (index, value) => {
    const updatedList = [...wordList];
    const updateListNew = updatedList?.map((e, i) => {
      console.log(value, "val");
      e =
        i === index
          ? { word: e.word, translate: e.translate, answer: value }
          : e;
      return e;
    });
    console.log(updateListNew, ";;;;;;;;;;;;;");
    setWordList(updateListNew);
  };
  const navigate = useNavigate();
  //   useEffect(() => {
  //     if (isupdateSuccess) {
  //         navigate("/dash/actions");
  //     }
  // }, [isupdateSuccess]);

  // if (!listWord) return <h1>listWord not found</h1>;
  if (isLoading) return <h1>Loading...</h1>;
  if (isError || error) return <h1>data.message</h1>;
  if (isError) console.log(error, "err");
  if (!isupdateSuccess) console.log(error, "data");
  let g = wordList;
  // g["0"]["translate"]="l"
  console.log(g, "ppppppppppppp");
  const a = (index, val) => {
    g = g?.map((e, i) => {
      e = i === index ? { word: e.word, translate: val } : e;

      return e;
    });
  };
  console.log(g, ";;");
  let count = 0;
let mark=0
  const checkTest = (e) => {
    e.preventDefault();
    wordList.map((e) => {
      if (e.translate === e.answer) {
        mark++
      console.log(markStudent,"aa");};
    });
    mark=(mark/wordList.length)*100
setMarkStudent(mark)
    console.log(mark,"try");
    console.log(markStudent, "mark");
    mark=0
    setSeeMark(true)
  };
  console.log(wordList, "wordlist");
  return (
    <div className="formupdatelistword">
      <form onSubmit={checkTest}>
        <input
          className="inputWordUpdate ss"
          name="title"
          value={listWord?.data.title}
        />

        <input
          className="inputWordUpdate ss"
          name="date"
          value={listWord?.data.date.slice(0, 10)}
          // type="date"
        />
        <select name="active" id="active" className="if-you-may-do">
          <option selected={!listWord?.data.active} value={false}>
            ניתן לעשות {""}
          </option>
          <option selected={listWord?.data.active} value={true}>
            לא ניתן לעשות {""}{" "}
          </option>
        </select>
        <table className="users-list-table">
          <thead>
            <tr>
            {seeMark&&<td>סימון</td>}
              <td>מס'</td>
              {listWord?.data.seeWords && <td>מילה</td>}
              <td> תרגום</td>
              {seeMark&&<td>תשובה נכונה</td>}

              <td>השמעה</td>
            </tr>
          </thead>
          <tbody>
            {wordList?.map((cat, index) => (
              <tr key={index} className="trWords">
               {seeMark&&<td>x</td>}
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
                    // key={cat.translate}
                    // name={"test"[index]}
                    id="testAnswers"
                    className="answerTranslateWord"
                    onChange={(e) => handleChange(index, e.target.value)}
                    /* onChange={(e) => handleChange(index, 'translate', e.target.value)} */
                  />
                  {/* <span><input className="answerTranslateWord"/>answer:</span> */}
                </td>
                {seeMark&&<td>{cat.translate}</td>}

                <td>
                  <WordSpeaker word={cat.word} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="submit">הגש</button>
        {/* <button type="submit" className="updateList">עדכן</button> */}
        {/* { readyMark&&<h1>ציונך הוא:{mark}</h1>} */}
       {seeMark&& <h1>ציונך הוא:{markStudent}%</h1>} 
      </form>
    </div>
  );
};

export default Test;
