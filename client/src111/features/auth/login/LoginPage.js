import "./login-page.css"
import {useLoginMutation}from '../authApiSlice'
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { IoLockClosedOutline } from "react-icons/io5";
const LoginPage = () => {
    const [login,{isError,error,isLoading,data,isSuccess}]=useLoginMutation()
  const navigate=useNavigate()
    useEffect(()=>{
    if(isSuccess){
if(isSuccess){
    navigate("/dash")
}    }
   }
   ,[isSuccess])
    const handleSubmit=async(e)=>{
        e.preventDefault()
       const data=new FormData(e.target)
       const userObject=Object.fromEntries(data.entries())
       console.log(userObject); 
       login(userObject)
    }
  return (
<div className="login-page">
    <form onSubmit={handleSubmit} className="login-page-form">
        <h1>כניסת משתמשים</h1>
        <input type="text" required name="username" id="username" placeholder="username"/>
        <input type="text" required name="password" id="password" placeholder="password"/>
    <button type="submit">login</button>
    {error&&error.data?.message}
    </form>
</div>  )
}

export default LoginPage