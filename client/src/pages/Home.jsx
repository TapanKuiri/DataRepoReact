import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { FileContext } from '../context/FileContext'

export const Home = () => {
    const {token} = useContext(FileContext);
  return (
    <div className='bg-white flex w-full h-screen items-center justify-center  '>
  <div className='flex flex-col sm:flex-row-reverse items-center justify-between w-full h-screen'>

    {/* left part */}
    <div className='flex flex-col p-8 pt-1 items-center justify-center mt-7 gap-5 w-full sm:w-1/2'>
      <h1 className='text-4xl font-bold'>Welcome</h1>
      <h2 className='text-2xl font-semibold'>Upload your files here</h2>
      <p className='text-base text-center sm:text-left'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus, itaque suscipit quibusdam accusantium nostrum cupiditate in delectus velit tempora eos?
      </p>

      <Link to={token ? '/upload' : '/login'}>
        <button className='px-4 py-2 rounded-lg border border-black font-semibold hover:bg-black text-black hover:text-white transition duration-200'>
          Upload Here
        </button>
      </Link>
    </div>

    {/* right part */}
    <div className='w-full sm:w-1/2 mt-9'>
      <img src={assets.bgphoto} alt="Upload Background" className='w-full h-auto object-contain' />
    </div>

  </div>
</div>

  )
}
