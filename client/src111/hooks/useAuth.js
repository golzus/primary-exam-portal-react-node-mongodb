import {useSelector } from "react-redux";
import {selectToken} from '../features/auth/authSlice'
import {jwtDecode} from "jwt-decode"
const useAuth=()=>{
const token =useSelector(selectToken)
let isAdmin=false
let isUser=false
if(token){
const userDecoded=jwtDecode(token)
console.log(userDecoded,"userrrrrrrrrrrrrr")
const {_id,username,roles,class:classUser,fullname,company}=userDecoded
isAdmin=roles==="Teacher"
isUser=roles==="Student"
return {username,roles,fullname,company,isAdmin,isUser,classUser,_id}
}
return {username:"",isAdmin,isUser,fullname:"",company:null,_id:""}
}
export default useAuth