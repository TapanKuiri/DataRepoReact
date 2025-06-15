import React, { useContext, useEffect, useState } from 'react'
import { FileContext } from '../../context/FileContext'
import {assets} from '../../assets/assets.js'
import { toast } from 'react-toastify'
import axios from 'axios'

export const UploadedFiles = () => {
    const {token, backendUrl} = useContext(FileContext)
    const [files, setFiles] = useState([]);

    // console.log("token; ", token)
     const showAllfiles =async ()=>{
          try{
            const response = await axios.post(`${backendUrl}/api/user/files`,{}, {headers: { token }});
            // console.log(response.data);
            if(response.data.success){
                setFiles(response.data.files);
                // console.log(files);
            }
          }catch(err){
                console.log(err);
                toast.error({message: err.message});
          }
      }

      const viewfile =async(fileId)=>{
        //   console.log(id, token);
        try{
            const response = await axios.post(backendUrl+'/api/file/view', {fileId}, {headers: {token}})
            // console.log(response.data);
            if(response.data.success){
                const fileUrl = response.data.fileUrl;
                window.open(fileUrl, '_blank'); // Open Cloudinary image in a new tab
            }else{
                toast.error("File not found");
            }
        }catch(err){
            console.log(err);
            toast.error("Error viewing file");
        }
      }

      const deleteFile=async(fileId)=>{
         try{
            const response = await axios.post(`${backendUrl}/api/file/delete`,{fileId}, {headers: {token}})
            // console.log(response.data);
            if(response.data.success){
                showAllfiles();
                toast.success("Deleted");
            }else{
                toast.error("Error")
            }
         }catch(err){
            console.log(err);
            toast.error(err.message);
         }
      }

      const downloadFile = async (fileId) =>{
            try{
                const response = await axios.post(`${backendUrl}/api/file/download`, {fileId}, {headers: {token}});
                // console.log(response.data);
                if(response.data.success){
                    
                    const { fileUrl, fileName } = response.data.oneFile;

                    // Modify Cloudinary URL to force download
                    const downloadUrl = fileUrl.replace('/upload/', '/upload/fl_attachment/');

                    // Fetch file as blob
                    const fileRes = await fetch(downloadUrl);
                    const blob = await fileRes.blob();  

                    // Create temporary link to trigger download
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = fileName || 'downloaded_file';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link); 
                    toast.success("Download Done")
                }else{
                    toast.error("Error")
                }
            }catch(err){
                toast.error(err.message);
            }
      }

    // console.log("files: ",files[0]._id);
    useEffect(()=>{
        if(token){
            showAllfiles();
        }
    },[token, files])

  return (
    <div className='  w-full p-2 mx-4' >
        {
            files.map((item, index)=>( 

                <ul key={index} className='flex justify-between gap-3 border-t h-auto'>
                    <li className='w-1/6 justify-center text-center'>{item.fileName}</li>
                    <li className='w-1/6 justify-center text-center'>{item.type}</li>
                    <li className='w-1/6 justify-center text-center'>{item.size}</li>
                    <li className='w-1/6 flex justify-center items-center'>
                        <img onClick={()=>viewfile(item._id)} src={assets.view} alt=""
                        className='w-6 h-6   text-white rounded-md shadow-md transition duration-200 ease-in-out
                        hover:bg-blue-700 hover:shadow-lg hover:scale-105
                        active:ring-4 active:ring-blue-300 focus:outline-none'   />
                    </li>
                    <li className='w-1/6 flex justify-center items-center '>
                        <img onClick={()=>deleteFile(item._id)} src={assets.deletef} alt="" 
                        className='w-6 h-6  text-white rounded-md shadow-md transition duration-200 ease-in-out
                        hover:bg-blue-300 hover:shadow-lg hover:scale-105
                        active:ring-4 active:ring-blue-300 focus:outline-none'  />
                    </li><li className='w-1/6 flex justify-center items-center'>
                        <img onClick={()=>downloadFile(item._id)} src={assets.download} alt="" 
                        className='w-6 h-6  text-white rounded-md shadow-md transition duration-200 ease-in-out
                        hover:bg-blue-700 hover:shadow-lg hover:scale-105
                        active:ring-4 active:ring-blue-300 focus:outline-none'  />
                    </li>

                </ul>
            ))
        }
    </div>
  )
}
