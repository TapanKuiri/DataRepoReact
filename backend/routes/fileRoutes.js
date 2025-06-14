import express from 'express'
import upload from '../middleware/multer.js';
import { deleteFile, downloadFile, uploadFile, viewFile } from '../controllers/fileController.js';
import authUser from '../middleware/authUser.js'


const fileRouter = express.Router();

// fileRouter.post('/upload', authUser, uploadFile);
fileRouter.post('/upload', upload.single('file'), authUser, uploadFile); // proper field name = "file"
fileRouter.post('/delete', authUser, deleteFile);
fileRouter.post('/download', authUser, downloadFile);
fileRouter.post('/view', authUser, viewFile);

export default fileRouter;
