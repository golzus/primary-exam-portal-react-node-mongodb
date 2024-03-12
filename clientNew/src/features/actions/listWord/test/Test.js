import { useNavigate, useParams } from "react-router-dom";
import './test.css'
import {
  useGetAllListWordsQuery,
  useUpdateListWordsMutation,
} from "../view/ListWordApiSlice";
import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import WordSpeaker from "../add/WordSpeaker";
const Test = () => {
  const {company,roles}=useAuth()

  const { _id } = useParams();
  const [
    updateListWords,
    { data: updatedData, error, isSuccess: isupdateSuccess, isError },
  ] = useUpdateListWordsMutation();
 
  const {
    isSuccess,
    data,
    isLoading,
    isError: err,
  } = useGetAllListWordsQuery();
if(data)console.log(data.data.test,"test");
const listWord = data.data.find((list) => list._id === _id);
  const [wordList, setWordList] = useState(listWord.test)


    const handleChange = (index,field, value) => {
    const updatedList = [...wordList];
    //updatedList[index][field]=value
    setWordList(updatedList);
//setWordList(()=>[...wordList,wordList[index][field]=value])
  };

  const navigate = useNavigate();
//   useEffect(() => {
//     if (isupdateSuccess) {
//         navigate("/dash/actions");
//     }
// }, [isupdateSuccess]);


if (!listWord) return <h1>listWord not found</h1>;

if(isError)console.log(error,"err");
if(!isupdateSuccess)console.log(error,"data");
  if (isLoading) return <h1>Loading...</h1>;
  if (isError || error) return <h1>data.message</h1>;


  let count = 0;
  const formSubmit=(e)=>{
    e.preventDefault()
    console.log(wordList,"yyyyyyyyyyy");

    const data =new FormData(e.target)
    const listObject=Object.fromEntries(data.entries())
    listObject.company=company._id
    listObject._id=_id
    listObject.test=wordList

  console.log(listObject,"list");
  updateListWords(listObject)
 }
  return (
    <div
    
      className="formupdatelistword"><form  onSubmit={formSubmit} >
      <input className="inputWordUpdate ss" name="title" defaultValue={listWord.title} />
      <input
        className="inputWordUpdate ss"name="date"
        defaultValue={listWord.date}
        type="date"
      />
         <select name='active' id='active'className="if-you-may-do">
                            <option selected={!listWord.active} value={false}>ניתן לעשות {""}</option>
                            <option selected={listWord.active} value={true}>לא ניתן לעשות {""} </option>
                        </select>
      <table className="users-list-table">
        <thead>
          <tr>
            <td>מס'</td>

            <td>מילה</td>
            <td> תרגום</td>
            <td>השמעה</td>
          </tr>
        </thead>
        <tbody>
         

{wordList?.map((cat, index) => (
            <tr key={index}>
              <td>{index + 1}.</td>
              <td>
                <div
                  name="test"
                  className="inputWordUpdate">{cat.word}</div>
                  
                
              </td>
             
              <td>תשובה:
             <input
                  name="test.translate"
                  className="answerTranslateWord"
                  //  {/* onChange={(e) => handleChange(index, 'translate', e.target.value)} */}
                 /> 
              {/* <span><input className="answerTranslateWord"/>answer:</span> */}
              </td>
              <td>
                <WordSpeaker word={cat.word} />
              </td>
            </tr>
          ))}

        </tbody>
      </table>
  
      <button type="submit" className="updateList">עדכן</button>
      </form>
    </div>
  );
};

export default Test;
