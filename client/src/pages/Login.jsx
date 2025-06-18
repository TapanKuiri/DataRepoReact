// src/components/Login.jsx
import React, { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
// import { loginSuccess, loginFailure } from '../slice/authSlice.js'; // adjust the path as needed
import { FileContext } from '../context/FileContext';
import {toast} from 'react-toastify'
import axios from 'axios';
import {jwtDecode}  from 'jwt-decode';

export const Login = () => {
  const {setToken, backendUrl, setFirstChar} = useContext(FileContext)
  const [currentState, setCurrentState ] = useState('Login');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();


  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if(currentState == 'Sign Up'){
          const response = await axios.post(`${backendUrl}/api/user/register`, {name, email, password});
          if(response.data.success){
             toast.success("login successfull");
             const token = response.data.token;
            const decoded = jwtDecode(token);
            const char = decoded.name[0].toUpperCase();

            setToken(token);
            setFirstChar(char);

            localStorage.setItem('token', token);
            localStorage.setItem('firstChar', char);
            navigate('/')
              
            }else{
              toast.error(response.data.message);
            }
            console.log("char", name);
      }else{

          const response = await axios.post(backendUrl+'/api/user/login', {email, password});
          // console.log("rsponse: ",response.data);
          
          if(response.data.success){
             toast.success('Login successful');
              const token = response.data.token;
              const decoded = jwtDecode(token);
              const char = decoded.name[0].toUpperCase();

              setToken(token);
              setFirstChar(char);

              localStorage.setItem('token', token);
              localStorage.setItem('firstChar', char);

              navigate('/upload');
          
          }else{
            toast.error(response.data.message);
          }
      }
      
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

      {currentState !== 'Login' && (
        <input
          type="text"
          placeholder='Enter your name'
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='w-full px-3 py-2 border border-gray-800'
        />
      )}
      <input
        type="email"
        placeholder='Enter your Email'
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='w-full px-3 py-2 border border-gray-800'
      />
      <input
        type="password"
        placeholder='Enter password'
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='w-full px-3 py-2 border border-gray-800'
      />

      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p>Forgot your password?</p>
        {
          currentState === 'Login'
            ? <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>Create account</p>
            : <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
        }
      </div>

      <button className='bg-black text-white font-light px-8 py-2 mt-4'>
        {currentState === 'Login' ? 'Login' : 'Sign Up'}
      </button>
    </form>
  );
};
