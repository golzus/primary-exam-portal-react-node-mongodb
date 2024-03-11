import React from 'react'
import "./users-list.css"
import Search from "../../../components/search/Search"
import {useDeleteUserMutation,useGetAllUsersQuery} from '../view/userApiSlice'
// import{useDeleteUserMutation,useGetAllUsersQuery}from '../userApiSlice'
import { Link, useSearchParams } from "react-router-dom"
//try
import useAuth from '../../../hooks/useAuth'
const UsersList = () => {
  const {company}=useAuth()
//
const {data:users,isError,error,isLoading}=useGetAllUsersQuery()
const [deleteUser,{error:errorDelete,data:deletedData}]=useDeleteUserMutation()
console.log(errorDelete,deletedData);
const deleteClick = (user) => {
  if (window.confirm("בטוח שברצונך למחוק את המשתמש ?")) {
    deleteUser({ _id: user._id });
  }
};
const [searchParams]=useSearchParams()
const q=searchParams.get("q")
  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error: {JSON.stringify(error)}</h1>;
  const filterData=!q?[...users.data]:users.data.filter(user=>(user.fullname.indexOf(q)>-1)||(user.company.name.indexOf(q)>-1))
  return (
    <div className='user-list'>
      <div className='user-list-top'>
        <Search placeholder={"חיפוש לפי שם פרטי "} />
        <Link to="/dash/users/add"
          className="users-list-add-button">
       הוספת משתמש
        </Link>
      </div>
      
      <table className='users-list-table'>
        <thead>
          <tr>
            <td> שם פרטי</td>
            <td> שם מלא</td>
            <td> חברה </td>
            <td> מייל </td>
            <td> פעיל</td>
          </tr>
        </thead>
        <tbody>
          {filterData?.map(user => (
           
           <tr key={user._id}>
              <td>
                <div className='users-list-company'>
                  
                  {user.username}
                </div>
              </td>
       
              <td>
                {user.fullname}
              </td>
              <td>
                {user.company?.name}
              </td>
              <td>
                {user.email}
              </td>
              <td>
                {user.active ? "פעיל" : "לא פעיל"}
              </td>
              <td>
                <div className='users-list-buttons'>
                <Link to={`/dash/users/${user._id}`} className='users-list-button users-list-view'>
                  צפייה
                </Link>
                <button onClick={()=>{deleteClick(user)}} className='users-list-button users-list-delete'>
                  מחיקה
                </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default UsersList