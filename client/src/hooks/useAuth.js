import {useSelector } from "react-redux";
import {selectToken} from '../features/auth/authSlice'
import {jwtDecode} from "jwt-decode"
const useAuth=()=>{
const token =useSelector(selectToken)
let isAdmin=false
let isUser=false
if(token){
const userDecoded=jwtDecode(token)
const {_id,username,roles,class:classUser,fullname}=userDecoded
isAdmin=roles==="Teacher"
isUser=roles==="Student"
if(_id)
return {username,roles,fullname,isAdmin,isUser,classUser,_id}
}
return {username:"",isAdmin,isUser,fullname:"",_id:""}
}
export default useAuth