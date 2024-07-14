

// import { useEffect } from 'react';
// import "./add-ompany.css";
// import { useAddCompanyMutation } from '../CompaniesApiSlice';
// import { useNavigate } from 'react-router-dom';

// const AddCompany = () => {
//     const [addCompany, { isError, error, isSuccess, isLoading }] = useAddCompanyMutation();
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (isSuccess) {
//             navigate("/dash/companies");
//         }
//     }, [isSuccess]);

//     const formSubmit = (e) => {
//         e.preventDefault();
//          const data =(e.target.value);
//          console.log(data,"dara");
//         const formData = new FormData(e.target);
//         const companyObject = Object.fromEntries(formData.entries());
//     // addCompany(data)
//         addCompany(companyObject)
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
//                     placeholder='שם חברה'
//                 />
//                 <select required name='type' id='type'>
//                     <option value="">בחר סוג</option>
//                     <option value="OM">עסק מורשה</option>
//                     <option value="OP">עסק פטור</option>
//                     <option value="AM">עמותה</option>
//                     <option value="CM">חברה</option>
//                     <option value="SYS">מערכת</option>
//                 </select>
//                 <select name='active' id='active'>
//                     <option value={true}>פעיל?</option>
//                     <option value={false}>לא פעיל</option>
//                     <option value={true}>פעיל</option>
//                 </select>
//                 <input type='file' name='image' />
//                 <button type='submit'>שלח</button>
//             </form>
//         </div>
//     );
// };

// export default AddCompany;



import { useEffect } from 'react';
import "./add-ompany.css";
import { useAddSchoolMutation } from '../CompaniesApiSlice';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
const AddSchool = () => {
    const [addSchool, { isError, error, isSuccess, isLoading }] = useAddSchoolMutation();
    const navigate = useNavigate();
const {_id}=useAuth()
// const _id=company._id
    useEffect(() => {
        if (isSuccess) {
            navigate("/dash/companies");
        }
    }, [isSuccess]);

    const formSubmit = (e) => {
        e.preventDefault();
        console.log(_id,"id");
         const data =(e.target.value);
         console.log(data,"dara");
        const formData = new FormData(e.target);
        const SchoolObject = Object.fromEntries(formData.entries());
        console.log(SchoolObject,"formdata");

    // addCompany(data)
        addSchool(SchoolObject)
    };

    if (isLoading) return <h1>Loading...</h1>;
    if (isError) return <h1>Error: {JSON.stringify(error)}</h1>;

    return (
        <div className='add-company-container'>
            <form onSubmit={formSubmit} className='add-company-form'>
                <input
                    type='text'
                    required
                    name='name'
                    placeholder='שם בית הספר'
                />
           
                <select name='active' id='active'>
                    <option value={true}>פעיל?</option>
                    <option value={false}>לא פעיל</option>
                    <option value={true}>פעיל</option>
                </select>
                <input name='teacher' value={_id}/>
                <input type='file' name='image' />
                <button type='submit'>שלח</button>
            </form>
        </div>
    );
};

export default AddSchool;
