import { useNavigate, useParams } from "react-router-dom";
import {
  useGetAllListWordsQuery,
  useUpdateListWordsMutation,
} from "./ListWordApiSlice";
import "./singleListWord.css";
import { useEffect } from "react";
import useAuth from "../../../../hooks/useAuth";
import WordSpeaker from "../add/WordSpeaker";
const SingleListWord = () => {
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
  const navigate = useNavigate();
  useEffect(() => {
    if (isupdateSuccess) {
        navigate("/dash/actions");
    }
}, [isupdateSuccess]);
if(isError)console.log(error,"err");
if(!isupdateSuccess)console.log(error,"data");
  if (isLoading) return <h1>Loading...</h1>;
  if (isError || error) return <h1>data.message</h1>;

  const listWord = data.data.find((list) => list._id === _id);
  if (!listWord) return <h1>listWord not found</h1>;
  let count = 0;
  const formSubmit=(e)=>{
    e.preventDefault()
    const data =new FormData(e.target)
    const listObject=Object.fromEntries(data.entries())
    listObject.company=company._id
    listObject._id=_id

    
  console.log(listObject,"list");
  updateListWords(listObject)
 }
  return (
    <div
      className="formupdatelistword"
    ><form  onSubmit={formSubmit} >
      <input className="inputWordUpdate ss" name="title" defaultValue={listWord.title} />
      <input
        className="inputWordUpdate ss"name="date"
        defaultValue={listWord.date}
        type="date"
      />
         <select name='active' id='active'className="if-you-may-do">
                            <option selected={!company.active} value={false}>ניתן לעשות {""}</option>
                            <option selected={company.active} value={true}>לא ניתן לעשות {""} </option>
                        </select>
      <table className="users-list-table">
        <thead>
          <tr>
            <td>מס'</td>

            <td>מילה</td>
            <td> תרגום</td>
          </tr>
        </thead>
        <tbody>
          {listWord.test.map((cat) => (
            <tr>
              <td>{++count}.</td>

              <input name="test"
                key={cat.word}
               
                className="inputWordUpdate"
                defaultValue={cat.word}
              />
 <WordSpeaker word={cat.word} />
              <input name="test.translate" className="inputWordUpdate" defaultValue={cat.translate} />
            </tr>
          ))}
        </tbody>
      </table>
  
      <button type="submit" className="updateList">עדכן</button>
      </form>
    </div>
  );
};

export default SingleListWord;
