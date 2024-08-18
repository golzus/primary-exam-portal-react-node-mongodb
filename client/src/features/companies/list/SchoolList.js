// // import React from 'react'
// // import "./companies-list.css"
// // import Search from "../../../components/search/Search"
// // import { Link } from "react-router-dom"
// // import { useGetAllCompaniesQuery, useDeleteCompanyMutation } from '../CompaniesApiSlice'
// // const CompaniesList = () => {
// //   // const companies = [{
// //   //   _id: 1,
// //   //   name: "Companies name",
// //   //   type: "Op",
// //   //   active: "true",

// //   // }]

// //   const {data:companies, isError, error, isLoading}=useGetAllCompaniesQuery()
// //  const [deleteCompany,{isSuccess:isDeleteCompany}]=useDeleteCompanyMutation()
// //   const deleteClick=(company)=>{
// //     of(window.conFrirm("בטוח שברתונך למחוק את החברה ?")){
// //       deleteCompany({_id:company._id})
// //     }
// //   }
// //  if(isLoading)
// //   return <h1> Loading...</h1>
// //   if(isError)
// //   return <h1>error: {JSON.stringify(error) }</h1>
// //   return (
// //     <div className='companies-list'>
// //       <div className='companies-list-top'>
// //         <Search placeholder={"חיפוש לפי שם חברה "} />
// //         <Link to="/dash/companies/add"
// //           className="companies-list-add-button">
// //           הוספת חברה
// //         </Link>
// //       </div>

// //       <table className='companies-list-table'>
// //         <thead>
// //           <tr>
// //             <td> שם חברה </td>
// //             <td> נוצר ב</td>
// //             <td> סוג</td>
// //             <td> פעיל</td>
// //             <td> פעולות</td>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {companies.data?.map(company => (
// //             <tr key={company._id}>
// //               <td>
// //                 <div className='companies-list-company'>
// //                   <img
// //                     src={company.image || "logo612.jpg "}
// //                     alt=''
// //                     width={40}
// //                     height={40}
// //                     className='companies-list-company-imag' />
// //                   {company.name}
// //                 </div>
// //               </td>
// //               <td>
// //                 {company.createedAt?.toString().slice(4, 16)}
// //               </td>
// //               <td>
// //                 {company.type}
// //               </td>
// //               <td>
// //                 {company.active ? "פעיל" : "לא פעיל"}
// //               </td>
// //               <td>
// //                 <div className='companies-list-buttons'>
// //                 <Link to={`/dash/companies/${company._id}`} className='companies-list-button companies-list-view'>
// //                   צפייה
// //                 </Link>
// //                 <button cnClick={()=> {deleteClick(company) }} className='companies-list-button companies-list-delete'>
// //                   מחיקה
// //                 </button>
// //                 </div>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>

// //     </div>
// //   )
// // }

// // export default CompaniesList

// import React, { useEffect } from 'react';
// import './companies-list.css';
// import Search from '../../../components/search/Search';
// import { Link, useSearchParams } from 'react-router-dom';
// import { useGetAllCompaniesQuery, useDeleteCompanyMutation } from '../CompaniesApiSlice';

// const CompaniesList = () => {
//   const { data: companies, isError, error, isLoading } = useGetAllCompaniesQuery();
//   // const [deleteCompany, { isSuccess }] = useDeleteCompanyMutation();
//   const [deleteCompany] = useDeleteCompanyMutation();


//   const deleteClick = (company) => {
//     if (window.confirm("בטוח שברתונך למחוק את החברה ?")) {
//       deleteCompany({ _id: company._id });
//     }
//   };
//   const [searchParams]=useSearchParams()
//   const q=searchParams.get("q")

//   if (isLoading) return <h1>Loading...</h1>;
//   if (isError) return <h1>Error: {JSON.stringify(error)}</h1>;
// const filterData=!q?[...companies.data]:companies.data.filter(comp=>comp.name.indexOf(q)>-1)
//   return (
//     <div className='companies-list'>
//       <div className='companies-list-top'>
//         <Search placeholder={"חיפוש לפי שם חברה "} />
//         <Link to="/dash/companies/add" className="companies-list-add-button">
//           הוספת חברה
//         </Link>
//       </div>

//       <table className='companies-list-table'>
//         <thead>
//           <tr>
//             <td>שם חברה</td>
//             <td>נוצר ב</td>
//             <td>סוג</td>
//             <td>פעיל</td>
//             <td>פעולות</td>
//           </tr>
//         </thead>
//         <tbody>
//           {filterData?.map(company => (
//             <tr key={company._id}>
//               <td>
//                 <div className='companies-list-company'>
//                   <img
//                     src={company.imageUrl || "/2.png"}
//                     alt=''
//                     width={40}
//                     height={40}
//                     className='companies-list-company-imag' />
//                   {company.name}
//                 </div>
//               </td>
//               <td>
//                 {company.createedAt?.toString().slice(4, 16)}
//               </td>
//               <td>
//                 {company.type}
//               </td>
//               <td>
//                 {company.active ? "פעיל" : "לא פעיל"}
//               </td>
//               <td>
//                 <div className='companies-list-buttons'>
//                   <Link to={`/dash/companies/${company._id}`} className='companies-list-button companies-list-view'>
//                     צפייה
//                   </Link>
//                   <button onClick={() => { deleteClick(company) }} className='companies-list-button companies-list-delete'>
//                     מחיקה
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default CompaniesList;

// import React from 'react'
// import "./companies-list.css"
// import Search from "../../../components/search/Search"
// import { Link } from "react-router-dom"
// import { useGetAllCompaniesQuery, useDeleteCompanyMutation } from '../CompaniesApiSlice'
// const CompaniesList = () => {
//   // const companies = [{
//   //   _id: 1,
//   //   name: "Companies name",
//   //   type: "Op",
//   //   active: "true",

//   // }]

//   const {data:companies, isError, error, isLoading}=useGetAllCompaniesQuery()
//  const [deleteCompany,{isSuccess:isDeleteCompany}]=useDeleteCompanyMutation()
//   const deleteClick=(company)=>{
//     of(window.conFrirm("בטוח שברתונך למחוק את החברה ?")){
//       deleteCompany({_id:company._id})
//     }
//   }
//  if(isLoading)
//   return <h1> Loading...</h1>
//   if(isError)
//   return <h1>error: {JSON.stringify(error) }</h1>
//   return (
//     <div className='companies-list'>
//       <div className='companies-list-top'>
//         <Search placeholder={"חיפוש לפי שם חברה "} />
//         <Link to="/dash/companies/add"
//           className="companies-list-add-button">
//           הוספת חברה
//         </Link>
//       </div>

//       <table className='companies-list-table'>
//         <thead>
//           <tr>
//             <td> שם חברה </td>
//             <td> נוצר ב</td>
//             <td> סוג</td>
//             <td> פעיל</td>
//             <td> פעולות</td>
//           </tr>
//         </thead>
//         <tbody>
//           {companies.data?.map(company => (
//             <tr key={company._id}>
//               <td>
//                 <div className='companies-list-company'>
//                   <img
//                     src={company.image || "logo612.jpg "}
//                     alt=''
//                     width={40}
//                     height={40}
//                     className='companies-list-company-imag' />
//                   {company.name}
//                 </div>
//               </td>
//               <td>
//                 {company.createedAt?.toString().slice(4, 16)}
//               </td>
//               <td>
//                 {company.type}
//               </td>
//               <td>
//                 {company.active ? "פעיל" : "לא פעיל"}
//               </td>
//               <td>
//                 <div className='companies-list-buttons'>
//                 <Link to={`/dash/companies/${company._id}`} className='companies-list-button companies-list-view'>
//                   צפייה
//                 </Link>
//                 <button cnClick={()=> {deleteClick(company) }} className='companies-list-button companies-list-delete'>
//                   מחיקה
//                 </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//     </div>
//   )
// }

// export default CompaniesList

// import React, { useEffect } from 'react';
// import './school-list.css';
// import Search from '../../../components/search/Search';
// import { Link, useSearchParams } from 'react-router-dom';
// import { BsBuildingAdd } from "react-icons/bs";
// import { useGetAllSchoolsByTeacherMutation, useDeleteSchoolMutation } from '../CompaniesApiSlice';
// import useAuth from '../../../hooks/useAuth';

// const SchoolList = () => {
//   const [getAllSchoolsByTeacher, { data: Schools, isError, error, isLoading }] = useGetAllSchoolsByTeacherMutation();




//  const {_id}=useAuth()

//  const teacher=_id
// useEffect(()=>{
//   getAllSchoolsByTeacher({teacher})
// },[])
//   // const [deleteCompany, { isSuccess }] = useDeleteCompanyMutation();
//   const [deleteSchool] = useDeleteSchoolMutation();
//   const [searchParams]=useSearchParams()
//   if (isLoading) return <h1>Loading...</h1>;
//   if (isError) return <h1>Error: {JSON.stringify(error)}</h1>;
//   console.log(Schools,"school");
// if(!Schools?.data)return<h1>no</h1>
//   const deleteClick = (school) => {
//     if (window.confirm("בטוח שברתונך למחוק את בית הספר ?")) {
//       deleteSchool({ _id: school._id });
//     }
//   };
//   // const filterData=Schools
//   const schoolsTeacher=Schools.data.filter(school=>school.teacher===teacher)
//   console.log(schoolsTeacher);
//   const q=searchParams.get("q")
// const filterData=!q?[...schoolsTeacher]:schoolsTeacher.filter(comp=>comp.name.indexOf(q)>-1)
//   return (
//     <div className='companies-list'>

//       <div className='companies-list-top'>
//         <Search placeholder={"חיפוש לפי שם חברה "} />
//         <Link to="/dash/companies/add" className="companies-list-add-button">
//         <BsBuildingAdd
//           fontSize={25} />
//           הוספת בית ספר
//         </Link>
//       </div>

//       <table className='companies-list-table'>
//         <thead>
//           <tr>
//             <td>שם בית ספר</td>
//             <td>נוצר ב</td>
//             <td>פעיל</td>
//             <td>פעולות</td>
//           </tr>
//         </thead>
//         <tbody>
//           {filterData?.map(school => (
//             <tr key={school._id}>
//               <td>
//                 <div className='companies-list-company'>
//                   <img
//                     src={school.imageUrl || "/2.png"}
//                     alt=''
//                     width={40}
//                     height={40}
//                     className='companies-list-company-imag' />
//                   {school.name}
//                 </div>
//               </td>
//               <td>
//                 {school.createedAt?.toString().slice(4, 16)}
//               </td>
//               <td>
//                 {school.active ? "פעיל" : "לא פעיל"}
//               </td>
//               <td>
//                 <div className='companies-list-buttons'>
//                   <Link to={`/dash/companies/${school._id}`} className='companies-list-button companies-list-view'>
//                     צפייה
//                   </Link>
//                   <Link to={`/dash/companies/class`} className='companies-list-button companies-list-view'>
//                     הוספת כיתה
//                   </Link>
//                   <button onClick={() => { deleteClick(school) }} className='companies-list-button companies-list-delete'>
//                     מחיקה
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default SchoolList;





import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, TextField, InputAdornment, IconButton, Tooltip, Button, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useSearchParams } from 'react-router-dom';
import { BsBuildingAdd } from "react-icons/bs";
import { useGetAllSchoolsByTeacherMutation, useDeleteSchoolMutation } from '../CompaniesApiSlice';
import useAuth from '../../../hooks/useAuth';
import './school-list.css';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ListAltIcon from '@mui/icons-material/ListAlt';
const SchoolList = () => {
  const [getAllSchoolsByTeacher, { data: Schools, isError, error, isLoading }] = useGetAllSchoolsByTeacherMutation();
  const { _id } = useAuth();
  const teacher = _id;

  useEffect(() => {
    getAllSchoolsByTeacher({ teacher });
  }, []);

  const [deleteSchool] = useDeleteSchoolMutation();
  const [searchParams] = useSearchParams();
  const [rows, setRows] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (Schools) {
      const schoolsData = Schools.data?.map(school => ({
        ...school,
        id: school._id,
        createedAt: school.createedAt?.toString().slice(4, 16),
        activeStatus: school.active ? "פעיל" : "לא פעיל"
      }));
      setRows(schoolsData);
    }
  }, [Schools]);

  const deleteClick = (school) => {
    if (window.confirm("בטוח שברצונך למחוק את בית הספר?")) {
      deleteSchool({ _id: school._id });
    }
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filteredRows = rows?.filter((row) => {
    return row.name.toLowerCase().includes(searchText.toLowerCase());
  });

  const columns = [
    { field: 'name', headerName: 'שם בית ספר', flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'createedAt', headerName: 'נוצר ב', flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'activeStatus', headerName: 'פעיל', flex: 1, headerAlign: 'center', align: 'center' },
    {
      field: 'actions',
      headerName: 'פעולות',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      renderCell: (params) => (
        <>
          <Link to={`/dash/companies/${params.row._id}`} className='companies-list-button companies-list-view'>
            <Tooltip title="View">
              <IconButton aria-label="view">
                <ListAltIcon />

              </IconButton>
            </Tooltip>
          </Link>
          <Link to={`/dash/companies/class`} className='companies-list-button companies-list-view'>
            <Tooltip title="add class">
              <IconButton aria-label="add-class">
                <AddCircleOutlineIcon />

              </IconButton>
            </Tooltip>
          </Link>

          <Tooltip title="Delete">
            <IconButton aria-label="delete" onClick={() => deleteClick(params.row)}>
            <EditIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error: {JSON.stringify(error)}</h1>;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#fafaf5', overflow: 'hidden' }}>
      <Box className='school-list-top' sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', padding: '0 16px' }}>
        <Button
          className="schools-list-add-button"
          component={Link}
          to="/dash/companies/add"
          startIcon={<BsBuildingAdd />}
          sx={{
            backgroundColor: '#9B153B',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#7a0f29',
            },
            fontSize: '0.75rem',
            padding: '4px 8px',
          }}
        >
          הוספת בית ספר
        </Button>
        <TextField
          label="חיפוש לפי שם בית ספר"
          variant="outlined"
          value={searchText}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ margin: '4px', fontSize: '0.75rem' }}
        />
      </Box>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Box sx={{ flex: 1, overflowY: 'auto', height: '70%' }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            getRowId={(row) => row.id}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SchoolList;
