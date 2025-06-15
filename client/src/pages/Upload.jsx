import { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { UploadedFiles } from '../components/uplodedFiles/UploadedFiles';
import axios from 'axios';
import { FileContext } from '../context/FileContext';
import {toast} from 'react-toastify';
import { assets } from '../assets/assets.js';


export const Upload = () => {
  const {backendUrl, token, files } = useContext(FileContext);
  const [inputeFile, setInputeFile] = useState(false);
  // const [image, setImage] = useState(false);


  // console.log("token is: ",token)

  const uploadHandler = async(event)=>{
    event.preventDefault();
    if(!inputeFile) toast.error("File Not Seleted");

    const formData = new FormData();
    formData.append('file', inputeFile);
    // console.log("formData is", backendUrl+'/api/file/upload');
    if(inputeFile){
      try{
       const response = await axios.post(backendUrl+'/api/file/upload', formData, {headers: {token}});
       // console.log(response.data);
       if(response.data.success){
         setInputeFile(false);
         toast.success('✅ File uploaded successfully!');
       }else {
       toast.error(`❌ Upload failed: ${response.data.message}`);
     }
 
      }catch(err){
         console.log(err);
         toast.error({message: err.message})
      }

    }
  }

  
  return (
    <div className='bg-gray-200 flex flex-col items-center'>
      <div className='bg-gray-200 flex flex-col p-4'>
        <div className='flex flex-col gap-2'>
          {/* <input onChange={(e)=>setInputeFile(e.target.files[0])} className='ml-8 border-1' type='file'  /> */}
           <label htmlFor="image" className='flex items-center justify-center cursor-pointer h-25 '>
              {
                inputeFile && inputeFile.type.startsWith('image/')
                  ? <img className='w-20 ' src={URL.createObjectURL(inputeFile)} alt="preview" />
                  : <img className='w-20  ' src={assets.uploadIcon} alt="upload_area" />
              }
              <input
                id="image" type="file" hidden onChange={(e) => setInputeFile(e.target.files[0])}
              />
          </label>

          <button onClick={uploadHandler} className='mx-20 p-2 px-6 bg-blue-600 text-white rounded-md shadow-md transition duration-200 ease-in-out
             hover:bg-blue-700 hover:shadow-lg hover:scale-105
             active:ring-4 active:ring-blue-300 focus:outline-none'>
            Upload
          </button>
        </div>
      </div>

      <div className='bg-amber-300 w-full  justify-center text-center  p-2'>
        <ul className='flex '>
          <li className='w-1/5'>Name</li>
            <li className='w-1/5'>Size</li>
            <li className='w-1/5'>View</li>
            <li className='w-1/5'>Delete</li>
            <li className='w-1/5'>Download</li>
        </ul>
      </div>
        <UploadedFiles />
    </div>
  );
};
