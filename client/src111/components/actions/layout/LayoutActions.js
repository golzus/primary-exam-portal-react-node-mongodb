import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBarActions from '../sideBar/SideBarActions'
import FooterActions from '../footer/FooterActions'

const LayoutActions = () => {
  return (
    <div className='container'>
      <div className='mane'>
       <SideBarActions/>
      </div>
      <div className='contemt'>
      <Outlet/>
      <FooterActions/> 
      </div>
      </div>
  )
}

export default LayoutActions