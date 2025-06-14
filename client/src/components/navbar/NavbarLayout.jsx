import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import {assets} from '../../assets/assets'
import { useContext } from 'react'
import {FileContext} from '../../context/FileContext'

export const NavbarLayout = () => {
    const {token, setToken, firstChar, setFirstChar} = useContext(FileContext);
    function logoutUser() {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setFirstChar(null);
        setToken(null);                   // If you're using context to store token
        // window.location.href = '/login';
    }
  return (
    <div className='bg-gray-300 w-full flex justify-between items-center px-4 p-2'>
        <div className='flex flex-col  text-center items-center '>
            <img className='w-20' src={assets.logo} alt="" />
            <p className='text-1xl font-bold text-blue-600 tracking-wide  transition'>
                FileNest
            </p>
        </div>

{/* hqp9FABcGwYjYGxi  myFiles mongodb+srv://myFiles:hqp9FABcGwYjYGxi@cluster0.ur7vvpn.mongodb.net/ */}
{/* mongodb+srv://myFiles:<db_password>@cluster0.ur7vvpn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0 */}
        <div className='flex gap-8 font-semibold'>
            <NavLink to={'/'}>
                <p>Home</p>
                <hr className='hidden' />
            </NavLink>

             <NavLink to={token ? '/upload' : '/login'}>
                <p>Upload</p>
                <hr className='hidden' />
            </NavLink>
        </div>

        <div className='group relative h-12 w-12'>
            {firstChar
            ? <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold">{firstChar}</div>
            : <img src={assets.profile} alt="profile" className="w-10 h-10" />}
                 
           
            <div className="group-hover:block delay-300 hidden absolute right-0  mt-1 z-50">
                <div className="flex flex-col gap-2  py-3 px-5 bg-white rounded-xl shadow-xl min-w-[140px] border border-gray-200 transition-all duration-300 ease-in-out hover:scale-[1.01]">

                    <Link
                    onClick={logoutUser}
                    to="/"
                    className="text-gray-700 hover:text-blue-600 transition duration-200 font-medium"
                    >
                    Log Out
                    </Link>

                    <Link
                    to="/login"
                    className="text-gray-700 hover:text-blue-600 transition duration-200 font-medium"
                    >
                    Login
                    </Link>
                    
                </div>
                </div>

        </div>

    </div>
  )
}
