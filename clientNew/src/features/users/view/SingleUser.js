import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import  { useEffect } from 'react';
import{useGetAllCompaniesQuery}from '../../companies/CompaniesApiSlice'
import "./single-user.css"
import{useUpdateUserMutation,useGetAllUsersQuery}from './userApiSlice'
const SingleUser = () => {
    const { userId } = useParams(); // Destructure companyId from useParams

    const {error,data,isLoading,isError}=useGetAllUsersQuery()
    const {data:companies,error:companiesError,error:companiesErrorData,isLoading:companiesLoading}=useGetAllCompaniesQuery()
    const [updateUser,{error:updateError,isSuccess:updateSuccess,data:dataError}]=useUpdateUserMutation()
   console.log(updateError);
    const navigate=useNavigate()
    useEffect(() => {
        if (updateSuccess) {
            navigate("/dash/users");
        }
    }, [updateSuccess]); if (isLoading||companiesLoading)
    return <h1>Loading...</h1>;
if (isError)
    return <h1>Error: {JSON.stringify(error)}</h1>;


    const user = data.data.find(comp => comp._id === userId);
  
    if (!user)
        return <h1>user not found</h1>;
    const formSubmit=(e)=>{
        e.preventDefault()
        const data =new FormData(e.target)
        const userObject=Object.fromEntries(data.entries())
      console.log(userObject);
      updateUser(userObject)
     }
    
    return (
        <div className='single-user-container'>
        <div className='single-user-info'>
<div className='single-user-img-container'> 
         
             {user.userName}
</div>
<div className='single-user-form-container'>
    <form onSubmit={formSubmit} className='single-user-form'>
    <input name='_id' defaultValue={user._id} type='hidden'/>

        <label> שם יחודי</label>
        <input value={user.username}readOnly={true} type='text' name='username'placeholder='הכנס שם יחודי'/>
        <label> שם פרטי</label>
        <input  defaultValue={user.fullname} type='text' name='fullname'placeholder='הכנס שם יחודי'/>
      
        {/* <label>משתמש של חברה </label>
        <select required name='type' id='type'>
            <option selected={user.company==='OM'} value="OM" > עוסק מורשה </option>
            <option selected={user.type==='OP'} value="OP" >  עסוק פטור</option>
            <option selected={user.type==='AM'} value="AM" > עמותה </option>
            <option selected={user.type==='CM'} value="CM" > חברה </option>
            <option selected={user.type==='SYS'} value="SYS" > מערכת</option>
        </select> */}
        <label>company</label>
        <select name='company' id='company'required>
            {companies.data.map(company=>{
                return <option selected={company._id===user.company?._id} value={company._id}>{company.name}</option>
            })}
        </select>
        <select name='roles' id='roles'>
        <option value={"Student"}>
            הרשאה
        </option>
        <option selected={user.roles==='Teacher'} value={"Teacher"}>Teacher</option>
        <option selected={user.roles==='Student'} value={"Student"}>Student</option>

        </select>
        <label>פעיל</label>
        <select name='active' id='active'>
        <option selected={!user.active} value={false}> לא פעיל {""}</option>
        <option selected={user.active} value={true}> פעיל {""} </option>

    </select>
    <label> מייל</label>
        <input defaultValue={user.email} type='email' name='email'placeholder='מייל  '/>
      
<button> עדכן</button>
    </form>
</div>
        </div>
        </div>
    )
}

export default SingleUser