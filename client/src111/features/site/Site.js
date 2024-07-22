import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Site = () => {
    const navigate = useNavigate();
const [enter,setEnter]=useState(false);

useEffect(() => {
    if (enter) {
      navigate("/login");
    }
}, [enter]);
const handleClick=()=>{
    setEnter(true)
}
  return (

    <button onClick={handleClick}>לכניסה לאתר</button>
  )
}

export default Site