import React from 'react'
import Navbar from '../../navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../../footer/Footer'
import "./dash-dashLayout.css"
import SitdeBar from '../../sitdebar/Sitdebar'
import useAuth from '../../../hooks/useAuth'

const DashLayout = () => {
  const { roles } = useAuth();
  return (
    <div className='container'>
      <div className='mane'>
       <SitdeBar />
      </div>
      <div className='contemt'>
        <Navbar className="nav" />
        <Outlet />
        <Footer />
      </div>
    </div>
  )
}

export default DashLayout
