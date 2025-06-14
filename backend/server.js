import express from 'express';
import 'dotenv/config.js'; // Load environment variables from .env file
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import cors from 'cors';
import cloudinary from './config/cloudinary.js';
import fileRouter from './routes/fileRoutes.js';
const app = express();
const PORT = process.env.PORT || 4000;
connectDB();
cloudinary;

// middleware
app.use(express.json());
app.use(cors());


// api endpoints
app.use('/api/user', userRouter);
app.use('/api/file', fileRouter);

app.get('/', (req, res)=>{
    res.send('Hello World!');
})

app.listen(PORT, ()=>{
    console.log(`Server is running`);
})