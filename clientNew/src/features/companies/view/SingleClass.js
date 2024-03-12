import  { useEffect } from 'react';
import './single-company.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDeleteClassMutation, useGetAllClassesQuery} from '../CompaniesApiSlice'

const SingleClass = () => {
    const {school}=useParams()
//     const { companyId } = useParams(); // Destructure companyId from useParams
//     const { data: companiesObject, isError, error, isLoading } = useGetAllCompaniesQuery();
// const [updateCompany,{isSuccess:isupdateSuccess}]=useUpdateCompanyMutation()
// const navigate=useNavigate()
// useEffect(() => {
//     if (isupdateSuccess) {
//         navigate("/dash/companies");
//     }
// }, [isupdateSuccess, navigate]);
// const formSubmit=(e)=>{
//     e.preventDefault()
//     const data =new FormData(e.target)
//     const companyObject=Object.fromEntries(data.entries())
//   console.log(companyObject);
//    updateCompany(companyObject)
//  }

// if (isLoading)
//         return <h1>Loading...</h1>;
//     if (isError)
//         return <h1>Error: {JSON.stringify(error)}</h1>;
    
//     const company = companiesObject.data.find(comp => comp._id === companyId);

//     if (!company)
//         return <h1>Company not found</h1>;
const {data:classes,isError:classesisError,isLoading:classesIsLoading,error:classesError}=useGetAllClassesQuery()
const [deleteClass,{isSuccess}]=useDeleteClassMutation()

const deleteClick = (class1) => {
    if (window.confirm("בטוח שברצונך למחוק את הכיתה ?")) {
      deleteClass({ _id: class1._id });
    }
  };
if(!classes?.data)

return <h1>no classes</h1>
    return (<div>
        <div className='classesList'>
{   classes?.data.map(class1=>{
        return class1.school===school&&(
         <nav className='single-class'>   <h1 value={class1._id}>{class1.name}</h1>
         <Link to={`/dash/companies/aa`} className='lnk-see-all-students'>לצפייה בכל בנות הכיתה</Link>
            <button onClick={()=>{deleteClick(class1)}} className='btn-delete' >delete</button></nav>
        )
        })
        }</div>
 {/* <Link to={`/dash/users/${user._id}`} className='users-list-button users-list-view'>
                  צפייה
                </Link> */}
        {/* // <div className='single-company-container'>
        //     <div className='single-company-info'>
        //         <div className='single-company-img-container'>
        //             <img src={company.image || "/logo612.jpg"} alt="" />
        //             {company.name}
        //         </div>
        //         <div className='single-company-form-container'>
        //             <form onSubmit={formSubmit} className='single-company-form'>
        //                <input name='_id' defaultValue={company._id} type='hidden'/>
        //                 <label>שם חברה</label>
        //                 <input defaultValue={company.name} type='text' name='name' placeholder='הכנס שם חברה' />
        //                 <label>סוג חברה</label>
        //                 <select required name='type' id='type'>
        //                     <option selected={company.type === 'OM'} value="OM">עוסק מורשה</option>
        //                     <option selected={company.type === 'OP'} value="OP">עסוק פטור</option>
        //                     <option selected={company.type === 'AM'} value="AM">עמותה</option>
        //                     <option selected={company.type === 'CM'} value="CM">חברה</option>
        //                     <option selected={company.type === 'SYS'} value="SYS">מערכת</option>
        //                 </select>
        //                 <label>פעיל</label>
        //                 <select name='active' id='active'>
        //                     <option selected={!company.active} value={false}>לא פעיל {""}</option>
        //                     <option selected={company.active} value={true}>פעיל {""} </option>
        //                 </select>
        //                 <button>עדכן</button>
        //             </form>
        //         </div>
        //     </div>
        // </div> */}
        </div>
    );
};

export default SingleClass;
