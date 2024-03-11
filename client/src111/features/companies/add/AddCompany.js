import { useNavigate } from "react-router-dom";
import {useAddCompanyMutation} from "../list/companiesApiSlice"
import { useEffect, useState } from "react";
import "./addCompany.css"
const AddCompany = () => {
    const[addCompany,{data,isError,isLoading,isSuccess,error}]=useAddCompanyMutation()
const navigate=useNavigate() 
        useEffect(()=>{
            if(isSuccess){
                navigate("/dash/companies")
            }
        },[isSuccess])

    const formSubmit=(e)=>{
        e.preventDefault()
        const data=new FormData(e.target)
        console.log(data.entries());
        const companyObject=(Object.fromEntries(data.entries()))
        console.log(companyObject);
       addCompany(companyObject)
    }
  return (
<div className="add-company-container">
    <form className="add-company-form" onSubmit={formSubmit}>
        <input type="text" required name="name" placeholder="name company"/>
        <select required name="type" id="type">
            <option value="">בחר סוג</option>
            <option value="op">עוסק מורשה</option>
            <option value="om">עוסק פטור</option>
        </select>
        <select name="active" id="active">
    <option value={true}>?פעיל</option>
    <option value={false}>לא פעיל</option>
    <option value={true}>פעיל</option>
        </select>
        <input type="file" name="logo"/>
        <button type="submit">send</button>
    </form>
</div>
    )
}

export default AddCompany