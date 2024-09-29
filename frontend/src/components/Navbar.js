import React, {useState, useContext} from 'react';
import { hamburgerContext, authenticatedContext } from './context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Navbar() {
    const {hamopen, setham} = useContext(hamburgerContext)
    const {authenticated, setAuthenticated} = useContext(authenticatedContext)
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    const handleLogout = async() => {
      try {
      await axios.post('http://localhost:8000/logout/')
      setAuthenticated(false)
      navigate("/")
      }catch(e){
        console.log(e)
      }
    };
  
    return (
      <nav className={"px-10 flex justify-between items-center bg-red-900"}>
        <div className='flex justify-between items-center gap-24'>
          <img src = './images/logo.png' className = 'w-32 h-14 object-cover bg-white'/>
          <div  className='hidden md:flex justify-between items-center text-white gap-12'>
          <a className='flex justify-between items-center gap-2' href = "#">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><title>Car front</title><path d="m20.9 9-1.5-4.6c-.3-.8-1-1.4-1.9-1.4H6.4c-.9 0-1.6.5-1.9 1.4L3 9H1v3h1v9h4v-2h12v2h4v-9h1V9h-2.1ZM5 14h4v2H5v-2Zm10 2v-2h4v2h-4ZM7.1 6h9.7l1.3 4H5.8l1.3-4Z" fill="currentColor"></path></svg>
            Ride
          </a>
          <a className='flex justify-between items-center gap-2' href = "#">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><title>Box isometric package</title><g fill="currentColor"><path d="M21.9 6.4 12 1.5 8.1 3.4l9.9 5 3.9-2ZM2.1 6.4l3.8-1.9 9.9 5-3.8 1.9-9.9-5ZM11 23 1 18V8.1l10 5V23ZM19 13.8v-3.7l4-2V18l-10 5v-9.9l4-2v3.7l2-1Z"></path></g></svg>
            Package</a>
          </div>
          
        </div>
        
        <div className='hidden md:flex justify-between items-center gap-12'>
          <a className='flex justify-between items-center gap-2 text-white' href = '#'>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><title>Receipt</title><path fill-rule="evenodd" clip-rule="evenodd" d="M3 23V1h18v22l-5.5-3-3.5 3-3.5-3L3 23ZM7 9h10V6H7v3Zm10 3H7v3h10v-3Z" fill="currentColor"></path></svg>
          My Trips</a>

          {
           authenticated ? 
           <div className="relative inline-block text-left">
           {/* Avatar and Chevron */}
           <div 
             className="flex items-center gap-2 cursor-pointer" 
             onClick={toggleDropdown}
           >
             <img 
               alt="Rudra" 
               className="h-11 w-11 rounded-full" 
               src="https://d1w2poirtb3as9.cloudfront.net/default.jpeg?Expires=1726256841&Signature=mR1kFHqdunFw0hZZEWEaYZ0M4F~YB52E6p2uUc9RXhmBU0pCbESjj5OANxjzanbhr8~OO-DbLGE2aIxA2SSOgHEuTHsSuAB5PFOP2HNXbC6~dvyEL0DvzW-wAXm~6CkflOVqPUNV8M-xVOlAaI7MD--6WPwVmpaJwD7rJTc7ejdJPeWvyZ1mqJciJenGutL0mY3ROZiGbAQepE9dLaDDJTA4nh7pdkV5JWDNCARjwz~vFnKQXH5INuPCjUC18R70xfydQ7KdxdMstLBHtvor~beqllzemNkq8iM4-Vz8jGQxkEMHnce6lhYJfOSr5wOEgKaTAEcY6d1sNajVIYj7zA__&Key-Pair-Id=K36LFL06Z5BT10"
             />
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-700">
               <title>Chevron down small</title>
               <path d="M18 8v3.8l-6 4.6-6-4.6V8l6 4.6L18 8Z" fill="currentColor"></path>
             </svg>
           </div>
     
           {/* Dropdown */}
           {isOpen && (
             <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
               <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                 <button
                   onClick={handleLogout}
                   className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                   role="menuitem"
                 >
                   Logout
                 </button>
               </div>
             </div>
           )}
         </div>
          : 
        <div className='flex gap-2'>
          <button className="bg-transparent hover:bg-white  hover:text-red-900 transition-all duration-200 text-white rounded-md px-3 py-1 flex items-center justify-center" onClick={()=> navigate('/login')}>Login</button>
          <button className="bg-transparent hover:bg-white hover:text-red-900 transition-all duration-200 text-white rounded-md px-3 py-1 flex items-center justify-center" onClick={()=> navigate('/signup')}>Signup</button>
        </div>
          }
        </div>
  
        <svg onClick = {()=>{ setham(true);}} className='md:hidden'  width="1em" height="1em" viewBox="0 0 24 24" fill="none"><title>Three lines</title><path fill-rule="evenodd" clip-rule="evenodd" d="M23 4H1v3h22V4Zm0 7H1v3h22v-3ZM1 18h22v3H1v-3Z" fill="currentColor"></path></svg>
      </nav>
    );
  }
  
  export default Navbar;
  