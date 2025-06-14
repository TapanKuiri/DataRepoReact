import { useState } from 'react'
import { ToastContainer } from 'react-toastify';

import './App.css'
import { Routes, Route } from 'react-router-dom'
import { NavbarLayout } from './components/navbar/NavbarLayout'
import { Home } from './pages/Home'
import { Upload } from './pages/Upload'
import { Login } from './pages/Login'
 

function App() {

  return (
    <>
      <ToastContainer />
      <NavbarLayout/>
       <Routes>
         <Route path='/' element={<Home/>}/>
         <Route path='/upload' element={<Upload/>}/>
         <Route path='/login' element={<Login/>}/>
       </Routes>
    </>
  )
}


export default App
