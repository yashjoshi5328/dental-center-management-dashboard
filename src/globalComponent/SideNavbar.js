import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeUserFromLocalStorage } from '../utils/localStorage';

const SideNavbar = ({role,isOpen,setIsOpen}) => {
    const naviagte=useNavigate();
    const patientNavItems=["Dashboard"];
    const adminNavItems=["Dashboard","Patients","Calender View","Appointments"];

    const handleLogout=()=>{
        removeUserFromLocalStorage();
        naviagte("/login");
    }
  return (
    <div className={`fixed flex flex-col h-screen w-screen bg-gradient-to-tr to-[#f8fdff] via-[#c0ecff] from-[#f8fdff] font-mono transform transition-transform duration-500 z-1000 ${isOpen ? 'translate-x-0':'-translate-x-full'}`}>
  <div
    className='flex flex-row-reverse'
  >
    <p 
        className="font-bold text-4xl text-right p-2 pr-4 cursor-pointer w-fit"
        onClick={()=>setIsOpen(false)}
    >
        x
    </p>
  </div>

  <div className="flex flex-col justify-between  h-full py-2 pb-8">
    <div
        className=''
    >
        {
            (role==="Admin"?adminNavItems:patientNavItems).map((e,i)=>{
                return (
                    <div 
                        className='text-2xl text-center p-4 shadow-2xl cursor-pointer hover:border'
                        key={i}
                    >
                        {e}
                    </div>
                );
            })
        }
    </div>
    <div
        className='flex items-center h-10 text-2xl font-bold px-4 w-fit cursor-pointer hover:text-red-400'
        onClick={handleLogout}
    >
        ⏻logout
    </div>
  </div>
</div>
  )
}

export default SideNavbar
