import React, {useContext} from 'react'
import { hamburgerContext } from './context';

const Hamburger = () => {
    const {hamopen, setham} = useContext(hamburgerContext)
    return (
        <div className = {`hamburger-menu flex flex-col gap-6 md:hidden h-full w-[30rem] bg-white py-4 px-2 top-0 right-0 ${hamopen ? "absolute" : "hidden"}`} >
            <div className = 'flex justify-end px-4'>
            <svg onClick = {()=>{ setham(false);}}  width="1.5em" height="1.5em" viewBox="0 0 24 24" fill="none" data-baseweb="icon" color="inherit"><title>Close</title><path d="m18.1 8.1-2.2-2.2-3.9 4-3.9-4-2.2 2.2 4 3.9-4 3.9 2.2 2.2 3.9-4 3.9 4 2.2-2.2-4-3.9 4-3.9Z" fill="currentColor"></path></svg>
            </div>
            <div className='flex justify-between items-center mx-2'>
              <h1 className='font-bold text-3xl'>UserName</h1>
              <div className="_css-ewPtBM"><div data-baseweb="avatar" class="_css-dLfTAu"><img alt="Rudra" className="_css-kMjrmT h-11 rounded-full" src="https://d1w2poirtb3as9.cloudfront.net/default.jpeg?Expires=1726256841&amp;Signature=mR1kFHqdunFw0hZZEWEaYZ0M4F~YB52E6p2uUc9RXhmBU0pCbESjj5OANxjzanbhr8~OO-DbLGE2aIxA2SSOgHEuTHsSuAB5PFOP2HNXbC6~dvyEL0DvzW-wAXm~6CkflOVqPUNV8M-xVOlAaI7MD--6WPwVmpaJwD7rJTc7ejdJPeWvyZ1mqJciJenGutL0mY3ROZiGbAQepE9dLaDDJTA4nh7pdkV5JWDNCARjwz~vFnKQXH5INuPCjUC18R70xfydQ7KdxdMstLBHtvor~beqllzemNkq8iM4-Vz8jGQxkEMHnce6lhYJfOSr5wOEgKaTAEcY6d1sNajVIYj7zA__&amp;Key-Pair-Id=K36LFL06Z5BT10"/></div></div>
            </div>
  
            <div className='flex justify-between items-center gap-4 py-2 mx-2'>
              <a href = '#' className='flex flex-col justify-center items-center bg-[#F3F3F3] w-1/3 py-3 rounded-lg'>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><title>Car front</title><path d="m20.9 9-1.5-4.6c-.3-.8-1-1.4-1.9-1.4H6.4c-.9 0-1.6.5-1.9 1.4L3 9H1v3h1v9h4v-2h12v2h4v-9h1V9h-2.1ZM5 14h4v2H5v-2Zm10 2v-2h4v2h-4ZM7.1 6h9.7l1.3 4H5.8l1.3-4Z" fill="currentColor"></path></svg>
                <p>Ride</p>
              </a>
              <a href = '#'  className='flex flex-col justify-center items-center bg-[#F3F3F3] w-1/3 py-3 rounded-lg'>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><title>Box isometric package</title><g fill="currentColor"><path d="M21.9 6.4 12 1.5 8.1 3.4l9.9 5 3.9-2ZM2.1 6.4l3.8-1.9 9.9 5-3.8 1.9-9.9-5ZM11 23 1 18V8.1l10 5V23ZM19 13.8v-3.7l4-2V18l-10 5v-9.9l4-2v3.7l2-1Z"></path></g></svg>
                <p>Package</p>
              </a>
              <a href = '#' className='flex flex-col justify-center items-center bg-[#F3F3F3] w-1/3 py-3 rounded-lg'>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><title>Receipt</title><path fill-rule="evenodd" clip-rule="evenodd" d="M3 23V1h18v22l-5.5-3-3.5 3-3.5-3L3 23ZM7 9h10V6H7v3Zm10 3H7v3h10v-3Z" fill="currentColor"></path></svg>
                <p>My Trips</p>
              </a>
            </div>
  
  
            <a  className='flex gap-2 items-center mx-2 font-semibold'>
              <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none"><title>Headset</title><path d="M12 1C6.49 1 2 5.49 2 11v2c0 5.51 4.49 10 10 10v-3c-2.79 0-5.2-1.64-6.32-4H8V9H5.29C6.15 6.11 8.83 4 12 4s5.85 2.11 6.71 5H16v7h5.54c.3-.95.46-1.95.46-3v-2c0-5.51-4.49-10-10-10Z" fill="currentColor"></path></svg>
              Support
            </a>
  
            <a href = '#' className='flex gap-2 items-center mx-2 font-semibold'>
              <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none"><title>Person</title><path fill-rule="evenodd" clip-rule="evenodd" d="M17.5 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0ZM3 20c0-3.3 2.7-6 6-6h6c3.3 0 6 2.7 6 6v3H3v-3Z" fill="currentColor"></path></svg>
              Manage Account
            </a>
            <a  href = '#' className='flex gap-2 items-center mx-2 font-semibold'>
              <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"/><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/><g id="SVGRepo_iconCarrier"> <path d="M17.2929 14.2929C16.9024 14.6834 16.9024 15.3166 17.2929 15.7071C17.6834 16.0976 18.3166 16.0976 18.7071 15.7071L21.6201 12.7941C21.6351 12.7791 21.6497 12.7637 21.6637 12.748C21.87 12.5648 22 12.2976 22 12C22 11.7024 21.87 11.4352 21.6637 11.252C21.6497 11.2363 21.6351 11.2209 21.6201 11.2059L18.7071 8.29289C18.3166 7.90237 17.6834 7.90237 17.2929 8.29289C16.9024 8.68342 16.9024 9.31658 17.2929 9.70711L18.5858 11H13C12.4477 11 12 11.4477 12 12C12 12.5523 12.4477 13 13 13H18.5858L17.2929 14.2929Z" fill="#000000"/> <path d="M5 2C3.34315 2 2 3.34315 2 5V19C2 20.6569 3.34315 22 5 22H14.5C15.8807 22 17 20.8807 17 19.5V16.7326C16.8519 16.647 16.7125 16.5409 16.5858 16.4142C15.9314 15.7598 15.8253 14.7649 16.2674 14H13C11.8954 14 11 13.1046 11 12C11 10.8954 11.8954 10 13 10H16.2674C15.8253 9.23514 15.9314 8.24015 16.5858 7.58579C16.7125 7.4591 16.8519 7.35296 17 7.26738V4.5C17 3.11929 15.8807 2 14.5 2H5Z" fill="#000000"/> </g></svg>
              Logout
            </a>
        </div>
    )
} 

export default Hamburger