import { useEffect } from "react";
import { useGetAllUsersByClassMutation } from "../../users/view/userApiSlice"
import LOADING from "../../loadingAnimation/LoadingAnimation";

const Students = () => {
    const [getAllUsersByClass,{data,isLoading,error}]=useGetAllUsersByClassMutation()
    useEffect(() => {
        getAllUsersByClass({classStudent:"65df6d02264f082248ebb4ec"})
    
        },
     []);

    if(data)
console.log(data.data,"data");
if(isLoading)return <LOADING/>
if(!data)
return <h1>no students</h1>
if(error)

return <h1>{error}</h1>
let count=0
return (
    <div>
          <table className="users-list-table">
          <thead>
            <tr>
              <td>מס'</td>

              <td>fullname</td>
              <td> username</td>
            </tr>
          </thead>
          <tbody>
        {data.data.map((student) => (
              <tr>
                <td>{++count}</td>
                <td key={student._id} >
                  {student.fullname}
                </td>
                <td >{student.username}</td>
              </tr>
            ))}
           </tbody>
        </table>
    </div>
  )
}

export default Students