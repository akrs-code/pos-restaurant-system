import React, { useState } from 'react';
import rest from "../assets/images/restaurant.jpg";
import Register from '../components/auth/Register';
import Login from '../components/auth/Login';
import logo from '../assets/images/logo.png'; 

const Auth = () => {

  const [isRegister, setIsRegister] = useState(false)
  return (
    <div className='flex min-h-screen w-full'>
      <div className='w-1/2 relative flex items-center justify-center bg-cover'>
        <img src={rest} alt="Restaurant Image" />
        <div className='absolute inset-0 bg-black bg-opacity-80'></div>
        <blockquote className='absolute bottom-0 px-8 mb-10 text-2xl text-white italic'>
          "Serve customer the best food with prompt and friendly service in a welcoming atmosphere, and they'll keep coming back"
          <span className='text-yellow-400 block mt-4'>- Founder of Restro</span>
        </blockquote>
      </div>

      <div className='w-1/2 min-h-screen bg-[#1a1a1a] p-10'>
        <div className='flex flex-col items-center gap-2'>
          <img src={logo} alt="Picture" className='h-14 w-14 border-2 rounded-full' />
          <h1 className='text-lg font-semibold text-[#f5f5f5] tracking tracking-wide'>Restro</h1>
        </div>
        <h2 className='text-4xl text-center mt-2 font-semibold text-yellow-400 mb-10'>{isRegister ? "Employe Registration" : "Employee Login"}</h2>

        {isRegister ? <Register setIsRegister={setIsRegister} /> : <Login />}

        <div className='flex justify-center mt-6'>
          <p className='text-=sm text-[#ababab]'>{isRegister ? "Already have an account?" : "Don't have an account?"}</p>
          <a onClick={() => setIsRegister(!isRegister)} href="#" className="text-yellow-400 font-semibold hover:underline">{isRegister ? "Sign in" : "Sign up"}</a>

        </div>

      </div>
    </div>
  );
};

export default Auth;
