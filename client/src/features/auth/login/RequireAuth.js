import useAuth from "../../../hooks/useAuth"

import { Navigate,Outlet } from "react-router-dom"

const RequireAuth = ({allowRoles}) => {
  const {roles}=useAuth()
console.log("allowRoles",allowRoles);
  const userAllowd=allowRoles.includes(roles)
  console.log(allowRoles,"allowRoles");
     if(userAllowd)
    return <Outlet/>
    return <Navigate to="/login" replace/>
}

export default RequireAuth
