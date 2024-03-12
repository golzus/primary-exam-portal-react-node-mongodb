import { useEffect, useState } from "react";
import {useAddListWordsMutation}from '../view/ListWordApiSlice'
import "./addWordList.css";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
const AddWordsList = () => {
  // import useAuth from "../../hooks/useAuth";
  const {company}=useAuth()
  const [addListWords,{ isError, error, isSuccess, isLoading }]=useAddListWordsMutation()
  const [arrWords, setArrWords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
        navigate("/dash/actions/wordLsList");
    }
}, [isSuccess]);
  let count = 0;
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const wordObject = Object.fromEntries(formData.entries());
    setArrWords((a) => [...arrWords, wordObject]);
  };
  const handleSubmitSave=(e)=>{
    e.preventDefault();
    const data=(e.target.value);
    const formData = new FormData(e.target);
    const listObject = Object.fromEntries(formData.entries());
    listObject.test=arrWords
   addListWords(listObject)
  }
  return (
    <div className="add--word-list">
      <form onSubmit={handleSubmitSave} className="list-word">
  <div className="test-name&date">   <input name="title" required placeholder="title" />
        <input name="ggdate" required placeholder="תאריך עברי" />
        <input name="date" type="date" required placeholder="תאריך לועזי" />
        <button  type="submit">שליחה</button></div> 
        <table className="users-list-table">
          <thead>
            <tr>
              <td>מס'</td>

              <td>מילה</td>
              <td> תרגום</td>
            </tr>
          </thead>
          <tbody>
            {arrWords.map((cat) => (
              <tr>
                <td>{++count}.</td>

                <td key={cat.word} className="td-addWord">
                  {cat.word}
                </td>
                <td className="td-addWord">{cat.translate}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <select className="qq" name='active' id='active'>
                            <option  value={true}>ניתן לעשות {""}</option>
                            <option value={false}>לא ניתן לעשות {""} </option>
                        </select>
      </form>
      <form className="addWordForm" onSubmit={handleSubmit}>
   
        <input required name="word" placeholder="מילה" />
        <input required name="translate" placeholder="תרגום" />
        <button type="submit">צרף מילה</button>
     
      </form>
    </div>
  );
};

export default AddWordsList;
