import { useEffect } from "react"
import useAuth from "../../../hooks/useAuth"
import { useAddClassMutation, useGetAllClassesQuery, useGetAllSchoolsQuery } from "../CompaniesApiSlice"
import {  useNavigate } from "react-router-dom"

const AddClass = () => {
    const [addClass,{data:addClassData,isSuccess}]=useAddClassMutation()
    const {data:schools,errorschoolsisError,error:schoolsErrorData,isLoading:schoolsisLoading}=useGetAllSchoolsQuery()
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            navigate("/dash/companies");
        }
    }, [isSuccess]);
    const formSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const classrObject = Object.fromEntries(formData.entries());
        addClass(classrObject)
    };
    const {_id}=useAuth()
    const teacher=_id
        const {data,isError,isLoading,error}=useGetAllClassesQuery()
        if(schoolsisLoading||isLoading)return <h1>Loading...</h1>
        if(error||schoolsErrorData)return <h1>error</h1>
    const schoolsTeacher=schools.data.filter(school=>school.teacher===teacher)
    return (
    <div className='add-company-container'>
               <form onSubmit={formSubmit} className='add-company-form'>
                   <input
                        type='text'
                        required
                        name='name'
                        placeholder='שם בית הספר'
                    />
                    <select name='school' id='school'required>
            <option  name='school' id='school'>?school</option>
            {schools.data.map(school=>{
              return   <option  value={school._id}>{school.name}</option>

           })}
        </select>

             
                    <select name='active' id='active'>
                        <option value={true}>פעיל?</option>
                        <option value={false}>לא פעיל</option>
                        <option value={true}>פעיל</option>
                    </select>
  
                    <button type='submit'>שלח</button>
                </form>
            </div>
          )
}

export default AddClass



// import { useEffect } from 'react';
// import "./add-ompany.css";
// import { useAddSchoolMutation } from '../CompaniesApiSlice';
// import { useNavigate } from 'react-router-dom';
// import useAuth from '../../../hooks/useAuth';
// const AddSchool = () => {
//     const [addSchool, { isError, error, isSuccess, isLoading }] = useAddSchoolMutation();
//     const navigate = useNavigate();
// const {company}=useAuth()
// const _id=company._id
//     useEffect(() => {
//         if (isSuccess) {
//             navigate("/dash/companies");
//         }
//     }, [isSuccess]);

//     const formSubmit = (e) => {
//         e.preventDefault();
//         console.log(_id,"id");
//          const data =(e.target.value);
//          console.log(data,"dara");
//         const formData = new FormData(e.target);
//         const SchoolObject = Object.fromEntries(formData.entries());
//         console.log(SchoolObject,"formdata");

//     // addCompany(data)
//         addSchool(SchoolObject)
//     };

//     if (isLoading) return <h1>Loading...</h1>;
//     if (isError) return <h1>Error: {JSON.stringify(error)}</h1>;

//     return (
//         <div className='add-company-container'>
//             <form onSubmit={formSubmit} className='add-company-form'>
//                 <input
//                     type='text'
//                     required
//                     name='name'
//                     placeholder='שם בית הספר'
//                 />
           
//                 <select name='active' id='active'>
//                     <option value={true}>פעיל?</option>
//                     <option value={false}>לא פעיל</option>
//                     <option value={true}>פעיל</option>
//                 </select>
//                 <input name='teacher' value={_id}/>
//                 <input type='file' name='image' />
//                 <button type='submit'>שלח</button>
//             </form>
//         </div>
//     );
// };

// export default AddSchool;
