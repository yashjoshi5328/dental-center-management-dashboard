import React from 'react';
import LoginForm from './LoginForm';
const banner = new URL('../assets/logo.png', import.meta.url).href;
const sparrow = new URL('../assets/sparrow.png', import.meta.url);
const Login = () => {
  return (
    <div className="bg-gradient-to-tr to-[#e0f7ff] via-[#c0ecff] from-[#f8fdff]
 flex p-4 min-h-fit h-screen justify-center items-center">
      
      {/* Left Banner
      <div className="hidden">
        <img src={banner} alt="Banner" className="" />
        <h1 className="">Your Partner in Dental Care Management</h1>
        <p className="">
          Simplifying Operations for dentists,
          <br />
          empowering patients with clear insights.
        </p>
      </div> */}

      {/* Right Panel */}
      <div className="flex flex-col items-center">
        
        {/* Login Form */}
        <div className="">
          <LoginForm />
        </div>

        {/* Testimonial - only show on md and above */}
        <div className="font-mono text-center pt-3">
          <i className="text-[grey]">
            “The Dental Center Dashboard has transformed our practice management. Streamlined appointments and patient records mean more time for patient care.”
          </i>
          <img src={sparrow} alt="Dr. Emily" className="m-auto my-1 border-1 border-[grey] w-16 h-16 rounded-full object-cover" />
          <p className="font-semibold">Dr. Emily White</p>
          <p className="font-extralight">Chief Dentist, Smile Bright Clinic</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
