import cloudinary from '../config/cloudinary.js';
import userModel from '../models/userModel.js';

const uploadFile = async (req, res) => {
  try {

    const {userId} = req.body;    
    const fileName = req.file.originalname;
    const size = (req.file.size / 1024).toFixed(2) + ' KB';
    const fileUrl = ((await cloudinary.uploader.upload(req.file.path, {resource_type: 'auto'})).secure_url);

    // 3. Create file object
    const fileData = {
       fileName: fileName,
       size:size,
       fileUrl:fileUrl
    };

     const userData = await userModel.findById(userId);
     if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    userData.files.push(fileData);
    await userData.save();

    res.json({success: true, message: 'File uploaded successfully'});

  } catch (err) {
    console.error('Upload failed:', err);
    res.status(500).json({ message: 'Upload failed' });
  }
};

const deleteFile = async(req, res)=>{
  try {
      const {userId, fileId} = req.body;
      const userData = await userModel.findById(userId);
      if(!userData) return res.status(404).json({success: false, message: 'User not found'})

      //  get the file id which is same as fileId send by frontend and remove   
      userData.files = userData.files.filter(file => file._id.toString() !== fileId);
      await userData.save();

      res.json({ success: true, message: 'File deleted successfully' });

  } catch (err) {
    console.error('Delete failed:', err);
    res.status(500).json({ message: 'Delete failed' });
  }
}

const viewFile = async(req, res)=>{
    // console.log("viewfile is run");
    try{

      const {userId,  fileId} = req.body;
      const userData = await userModel.findById(userId);
      if (!userData) return res.status(404).json({ success: false, message: "User not found" });
  
      const userFile = userData.files;
      const oneFile = userFile.find(file => file._id.toString() === fileId);
      if (!oneFile) return res.status(404).json({ success: false, message: "File not found" });
  
      // console.log(oneFile);
      res.json({ success: true, fileUrl: oneFile.fileUrl });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }

}


const downloadFile = async(req, res)=>{
     try{

      const {userId,  fileId} = req.body;
      const userData = await userModel.findById(userId);
      if (!userData) return res.status(404).json({ success: false, message: "User not found" });
  
      const userFile = userData.files;
      const oneFile = userFile.find(file => file._id.toString() === fileId);
      if (!oneFile) return res.status(404).json({ success: false, message: "File not found" });
  
      // console.log(oneFile);
      res.json({ success: true, oneFile});
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export {uploadFile, deleteFile, viewFile, downloadFile};
