import React, { useEffect, useState } from 'react';
import useValidate from '../utils/hooks/useValidate';
import { login } from '../utils/loginAPI';
import { saveUserToLocalStorage } from '../utils/localStorage';
import { useNavigate } from 'react-router-dom';
const logo = new URL('../assets/logo.png', import.meta.url);

const LoginForm = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [role,setRole]=useState("Admin");
    const [emailError,setEmailError]=useState('');
    const [passwordError,setPasswordError]=useState('');
    const [loginData,setLoginData]=useState({
        success:false,
        message:''
    });

    const navigate=useNavigate();

    useEffect(()=>{
      if(loginData.success){
        saveUserToLocalStorage(loginData.user);
        navigate(`/${role.toLowerCase()}`);
      }
    },[loginData]);
    const handleLogin=async (email,password,role)=>{
        try{
            const res= await login(email,password,role);
            console.log(res);   
            setLoginData(res);        
        }catch(e){
            setLoginData(e);
        }
    }
    const handleSubmit=()=>{
        if(useValidate({email,password,setEmailError,setPasswordError})){
            handleLogin(email,password,role);
        }
        console.log(emailError,passwordError);
    }

  return (
    <div className="w-full max-w-md bg-gradient-to-br font-mono from-teal-100 via-indigo-100 to-whiterounded-2xl p-6 shadow-2xl">
      
      {/* Header */}
      <div className="flex justify-center items-center mb-4 ">
        <h2 className="text-center font-bold text-2xl mt-16  relative shadow-lg">
            
            Dental Center Dashboard
            <img
            className="w-20 h-20 absolute -top-10 -left-12  "
            src={logo.href}
            alt="logo"
            />
        </h2>
      </div>

      {/* Title */}
      <div className="text-center text-lg font-semibold mb-6">
        Sign in to Dental Dashboard
      </div>

      {/* Form */}
      <div className="flex flex-col gap-4">
        {/* Email */}
        <div>
          <label className="mb-1 font-medium flex justify-between">Email 
            <span className='text-red-500'>
                {emailError}
            </span>
            </label>
          <input
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="admin@dental.com"
            className="w-full border border-gray-500 focus:border-black focus:ring-1 focus:ring-black rounded px-3 py-2 outline-none"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1 font-medium flex justify-between">Password
            <span className='text-red-500'>
                {passwordError}
            </span>
          </label>
          <input
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="admin123"
            className="w-full border border-gray-500 focus:ring-1 focus:ring-black rounded px-3 py-2 outline-none"
          />
        </div>

        {/* Role Selection */}
        <div className="mt-2">
          <label className="block font-medium mb-1">Role</label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 accent-black">
              <input 
              type="radio" 
              name="role" 
              value="Admin" 
              checked={role==="Admin"}
              onChange={(e)=>(setRole(e.target.value))}
              />
              <span>Admin</span>
            </label>
            <label className="flex items-center gap-2 accent-black">
              <input 
              type="radio" 
              name="role" 
              value="Patient" 
              checked={role==='Patient'}
              onChange={(e)=>(setRole(e.target.value))}
              />
              <span>Patient</span>
            </label>
          </div>
        </div>
        <p
            className='text-red-500'
        >{!loginData.success&& loginData.message}</p>
        {/* Submit Button */}
        <button 
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition duration-200 cursor-pointer"
        onClick={handleSubmit}
        >
          Sign In
        </button>

        {/* Terms */}
        <div className="text-center text-sm text-gray-700 mt-4">
          By logging in, you agree to our <u>Terms of Service</u> and <u>Privacy Policy</u>.
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
