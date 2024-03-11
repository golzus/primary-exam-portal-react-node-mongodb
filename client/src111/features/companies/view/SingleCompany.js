import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useGetAllCompaniesQuery,
  useUpdateCompanyMutation,
} from "../list/companiesApiSlice";
import { useEffect, useState } from "react";

const SingleCompany = () => {
  const { companyId } = useParams();
  const {
    data: companiesObject,
    isLoading,
    isError,
    error,
  } = useGetAllCompaniesQuery();
  const [updateCompany, { isSuccess: isUpdateSuccess,error:error2 }] =
    useUpdateCompanyMutation();
    console.log(error2);
    const navigate=useNavigate()

    useEffect(()=>{
        if(isUpdateSuccess){
            navigate("/dash/companies")
        }
    },[isUpdateSuccess])
  const formSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const companyObject = Object.fromEntries(data.entries());
    console.log(companyObject);
    updateCompany(companyObject);
  };

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>{JSON.stringify(error)}</h1>;
  // const company=companiesObject.data.find(comp=>comp.id===companyId);
  const company = companiesObject.data.find((e) => {
    return e._id === companyId;
  });
  if (!company) return <h1>"not found"</h1>;
  return (
    <>
      <div className="single-company-container">
        <div className="single-company-info">
          <div className="single-company-img-container">
            <img src={"company.image" || "/novatat.JPG"} />
          </div>
          {company.name}
        </div>
        <div className="single-company-form-container">
          <form className="single-company-form" onSubmit={formSubmit}>
            <input name="_id" defaultValue={company._id} type="hidden"/>
           <lable>שם החברה</lable>
            <input
              type="text"
              required
              name="name"
              defaultValue={company.name}
              placeholder="name company"
            />
            <label>סוג החברה</label>
            <select required name="type" id="type">
              <option selected={company.type==="om"} value={"om"}>עוסק מורשה{" "} </option>
              <option selected={company.type==="op"} value={"op"}>עוסק פטור {" "} </option>
            </select>
            <lable>פעיל</lable>
            <select name="active" id="active">
              <option selected={!company.active} value={false}>לא פעיל{" "}</option>
              <option selected={company.active} value={true}>פעיל{" "}</option>
            </select>
            {/* <input defaultValue={company.image} type="file" name="logo" /> */}
              <button type="submit">update</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SingleCompany;
