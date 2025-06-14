import express from 'express';
import upload from '../middleware/multer.js';
import { loginUser, registerUser, fileUser } from '../controllers/userController.js';
import authUser from '../middleware/authUser.js';

const userRouter = express.Router();

userRouter.post('/login', loginUser);
userRouter.post('/register', registerUser);
userRouter.post('/files',authUser, fileUser);
// userRouter.post('/upload', upload.single('file'), uploadFile); // proper field name = "file"

export default userRouter;
