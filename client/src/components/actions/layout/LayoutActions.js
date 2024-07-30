import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBarActions from '../sideBar/SideBarActions'
import FooterActions from '../footer/FooterActions'
import Sidebar from '../../sitdebar/Sitdebar'
import Navbar from '../../navbar/Navbar'
const LayoutActions = () => {
  return (
    <div className='container'>
      <div className='mane'>
      <Sidebar/>
      </div>
      <div className='contemt'>
      <Navbar/>
      <Outlet/>
      <FooterActions/> 
      </div>
      </div>
  )
}

export default LayoutActions