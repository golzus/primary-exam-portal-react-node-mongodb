//import Search from "../../../components/search/Search"
import {Link}from "react-router-dom"
import {useGetAllCompaniesQuery,useDeleteCompanyMutation} from "./companiesApiSlice"
import "./companyList.css"
const CompanyList = () => {
const {data:companiesObject,isError,error,isLoading,isSuccess}=useGetAllCompaniesQuery()  
const [deleteCompany,{isSuccess:isDeleteSuccess}]=useDeleteCompanyMutation()
const deleteClick=(company)=>{
  if(window.confirm("are you sure you wants to delete the company?")){
    deleteCompany({_id:company._id})
  }
}
if(isLoading)return <h1>Loading...</h1>  
if(isError)return <h1>{JSON.stringify(error)}</h1>
return (
    <div className="companies-list">
      <div className="companies-list-top">
        {/* <Search placeholder="חיפןש לפי שם החברה"/> */}
        <Link to={"/dash/companies/add"}className="companies-list-add-button">
addCompany        </Link>
      </div>
      <table className="companies-list-table">
       <thead>
        <tr>
          <td>שם החברה</td>
          <td>נוצר</td>
          <td> סוג </td>
          <td>פעיל</td>
          <td>פעולות </td>
        </tr>
       </thead>
<tbody>
  {companiesObject.data?.map(company=>(
    <tr key={company._id}>
      <td>
        <div className="companies-list-company">
          <img
          src={"company.image"||"/logo512.png"}
          alt=""
          width={40}
          height={40} 
          className="companies-list-company-image"/>
          {company.name}
        </div>
      </td>
      <td>
        {company.type}
      </td>
      <td>
        {company.active?"active":"not active"}
      </td>
      <td>
        <div className="companies-list-button">
          <Link to={`/dash/companies/${company._id}`} className="companies-list-buttoncompanies-list-view">
            to see
          </Link>
          <button onClick={()=>{deleteClick(company)}}
          className="companies-list-button companies-list-delete">
            delete
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

export default CompanyList