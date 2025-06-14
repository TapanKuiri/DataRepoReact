import axios from 'axios';
import React, { createContext, use, useEffect, useState } from 'react'
// import asects from 'asets' 
// import {files} from '../assets/assets'

export const FileContext = createContext();

const FileContextProvider = (props) => {

  // console.log(files)

  const [files, setFiles]  = useState([]);
  // const [firstChar, setFirstChar] = useState('');
  const [firstChar, setFirstChar] = useState(localStorage.getItem('firstChar') || '');
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  

  useEffect(()=>{
    // if(token){
      // showAllfiles();
    // }
    if(!token && localStorage.getItem('token')){
      setToken(localStorage.getItem('token'));
    }
  })
  const value = {
      token, setToken, files, setFiles, backendUrl, firstChar, setFirstChar
  }

  return (
    <FileContext.Provider value={value}>
        {props.children}
    </FileContext.Provider>
  )
}

export default FileContextProvider;
