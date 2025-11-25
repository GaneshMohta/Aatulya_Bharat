import User from '../model/userSchema.js'
import { uuid } from 'uuidv4';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Profile from '../model/profileSchema.js'

export const login = async(req,res)=>{
    try{
        const {email,password} = req.body;
        console.log(email);
        const user = await User.findOne({email});
        if(!user){

            return res.status(400).json({message:"Invalid email"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            console.log("user")
            return res.status(400).json({message:"Invalid email or password"})
        }
        const token = jwt.sign({user_id : user.id},"a1s2d3f4",{
            expiresIn : "24h",
        });

        return res.status(200).json({
            token,
            email
        });
    }
    catch(e){
        console.log(e);
        res.status(500)
    }
}

export const createUser = async (req,res)=>{
    try{
        const {email,password} = req.body;
        const users1 = await User.findOne({email});
        if(users1){
            res.status(400).json("already exists");
        }
        else{
            try{
            const users = new User({
                userId:uuid(),
                email,
                password,
                userRole:'User',
                userName:email.split("@")[0]
            })
            await users.save();
            const token = jwt.sign({user_id : users.Id},"a1s2d3f4",{
                expiresIn : "24h",
            });
            let u_name = users.email.split("@")[0];
            const newProfile = new Profile({
                userId: users.userId,
                userName :u_name,
                userEmail : users.email,
            });

            await newProfile.save();

            res.status(201).json({token,email});
        }
        catch(e){
            console.log(e);
            res.status(500).json("internal server");
        }
        }
    }
    catch (e){

    }
}


export const getUser = async (req , res)=>{
 try{
    const {email}= req.query;
    console.log(email)
    const users_det = await User.find({email:email});
    res.status(200).json({users_det});
 }
 catch(e){
    console.log(e);
    res.status(500).json({message:"error"});
 }
}

export const updateUser = async (req, res)=>{
    try{
        const { newemail  , newrole} = req.body;
        const userId = await User.findByIdAndUpdate(userId,{
            email : newemail,
            role : newrole
        });
        if (!userId) {
            return res.status(404).json({ message: 'Blog not found' });
        }

    }
    catch(e) {

    }
}
