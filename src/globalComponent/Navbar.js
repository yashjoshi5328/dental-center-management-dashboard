import React, { useEffect, useState } from 'react'
import SideNavbar from './SideNavbar';
import { getUserFromLocalStorage } from '../utils/localStorage';
const navigationBar = new URL('../assets/navigation-bar.png', import.meta.url);
const logo = new URL('../assets/logo.png', import.meta.url);
const Navbar = () => {
  const [role,setRole]=useState("Admin");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(()=>{
    setRole(getUserFromLocalStorage().role);
  },[])
  return (
    <>
    <div
    className=' bg-white p-4 flex justify-between items-center font-mono fixed w-full shadow-2xl'
    >
      <img 
        className='h-8'
        src={navigationBar}
        onClick={()=>setIsOpen(true)}
      />
      <p
        className='font-bold text-lg md:text-2xl relative'
      >
        <img
          className='absolute h-14 -top-6 -left-10'
          src={logo}
        />
        Dental Center Dashboard
      </p>
    </div>
    <SideNavbar role={role} isOpen={isOpen} setIsOpen={setIsOpen}/>
    </>
  )
}

export default Navbar
