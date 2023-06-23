import React from 'react'
import "./Navbar.css"
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearch } from '../Context/SearchContext';

const Navbar = () => {
  
const [query, setQuery]=useSearch();
  const navigate=useNavigate();
  const auth=localStorage.getItem("auth");
 // console.log(user?"yes":"no")
 
  const handleLogout=()=>{
    localStorage.removeItem("auth");
    toast.success("Logout Succesful")
    setTimeout(()=>{
      navigate('/login')
    },2000)
  
  }
  
  return (
    <div className='NavbarDiv'>
      <div className='NavbarInnerDiv'>
    <div className='Navbarleft'>
      <img src='/images/imdblogo.png'/>
      <input placeholder='Search by movie Name' onChange={event=>setQuery(event.target.value)} />
    </div>
    <div className='NavbarRight'>
   
    {!auth ? (
            <>
              <button onClick={() => navigate("/login")}>Login</button>
              <button onClick={() => navigate("/signup")}>Signup</button>
            </>
          ) : (
            <>
              <button onClick={handleLogout}>Logout</button>
              <button onClick={()=>navigate("/addmovie")}>Add Movie</button>
            </>
          )}
    </div>
    </div>
    <ToastContainer />
    </div>
    
  )
}

export default Navbar