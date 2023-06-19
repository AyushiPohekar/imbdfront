import React from 'react'
import "./Navbar.css"
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
  const navigate=useNavigate();
  return (
    <div className='NavbarDiv'>
      <div className='NavbarInnerDiv'>
    <div className='Navbarleft'>
      <img src='/images/imdblogo.png'/>
      <input/>
    </div>
    <div className='NavbarRight'>
      <button onClick={()=>navigate("/login")}>Login</button>
      <button onClick={()=>navigate("/signup")}>Signup</button>
    </div>
    </div>
    </div>
    
  )
}

export default Navbar