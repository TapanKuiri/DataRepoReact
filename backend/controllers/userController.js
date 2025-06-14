import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';

const createToken = (id, name) =>{
    return jwt.sign({id, name}, process.env.JWT_SECRET)
}

const loginUser =  async (req, res)=>{
    try{
        const {email, password} = req.body;
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({message: 'User not found'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch){
            const token = createToken(user._id, user.name);
            res.json({success: true, token});
        }else{
            res.json({success: false, message: 'Invalid credentials'});
        }


    }catch(err){
        // console.error(err);
        res.status(500).json({message: 'Internal Server Error'});
    }
}

const registerUser = async (req, res) => {
    try{
        const {name, email, password} = req.body;
        // console.log(req.body);
        const exists = await userModel.findOne({email});
        if(exists) return res.json({success: false, message: 'User already exists'});

        if(!validator.isEmail(email)) return res.json({success: false, messsage: 'Invalid email format'});
        if(password.length < 6)  return res.json({success: false, message: 'Password must be at least 6 characters long'});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name, 
            email, 
            password: hashedPassword
        })
        const user = await newUser.save();
        const token = createToken(user._id, user.name);
        res.json({success: true, token});

    }catch(err){
        console.error(err);
        res.status(500).json({message: 'Internal Server Error'});
    }
}


const fileUser = async (req, res)=>{
    try{
       const {userId} = req.body; // If decoded from token
    //    console.log('p', req.body)
        const user = await userModel.findById(userId);

        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        res.json({ success: true, files: user.files });

    }catch(err){
        console.error(err);
        res.status(500).json({message: 'Internal Server Error'});
    }

}

export  {loginUser, registerUser, fileUser};