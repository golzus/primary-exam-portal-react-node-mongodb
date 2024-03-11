import { Outlet } from "react-router-dom"
import NavBar from "../../navbar/NavBar"
import SideBar from "../../sidebar/SideBar"
import Footer from "../../footer/Footer"
import "./dash-layout.css"
const DashLoyout = () => {
  return (
<div className="container">
<div className="menu">
    <SideBar/>
</div>
<div className="content">
    <NavBar/>
    <Outlet/>
    <Footer/>
</div>

</div>  )
}

export default DashLoyout