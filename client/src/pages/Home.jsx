import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { FileContext } from '../context/FileContext'

export const Home = () => {
    const {token} = useContext(FileContext);
  return (
    <div className='bg-white flex w-full'>
        <div className='flex'>
            {/* left part */}
            <div className='flex flex-col p-8 pt-1 items-center justify-center gap-5 w-1/2'>
                <h1 className='text-4xl font-bold'>Welcome</h1>
                <h2 className='text-2xl font-semibold'>Upload your files here</h2>
                <p className='text-base'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus, itaque suscipit quibusdam accusantium nostrum cupiditate in delectus velit tempora eos?</p>

                <Link to={token ? '/upload': '/login'}>
                    <button className='p-1 rounded-lg border-1 font-semibold hover:bg-black text-black hover:text-white'>Upload Here</button>
                </Link>
            </div>
            {/* right part */}
            <div className='w-1/2'>
                <img src={assets.bgphoto} alt="" />
            </div>

        </div>
    </div>
  )
}
