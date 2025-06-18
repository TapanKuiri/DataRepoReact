import express from 'express';
import upload from '../middleware/multer.js';
import { loginUser, registerUser, fileUser } from '../controllers/userController.js';
import authUser from '../middleware/authUser.js';

const userRouter = express.Router();

userRouter.post('/login', loginUser);   //user can login with email and password
userRouter.post('/register', registerUser); // user can register with name, email and password
userRouter.get('/files',authUser, fileUser); // user can get files associated with their account
// userRouter.post('/upload', upload.single('file'), uploadFile);  // user can upload a file, 'file' is the field name in the form

export default userRouter;
