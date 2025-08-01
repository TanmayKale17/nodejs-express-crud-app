const asyncHandler = require("express-async-handler");
const User = require("../models/userModels.js")
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");

// Register User
// path /api/user/register

const RegisterUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username|| !email || !password) {
        res.status(400);
        throw new Error("Fill all fields ")
    }

    const UserAvailiable = await User.findOne({ email });
    if (UserAvailiable) {
        throw new Error("User Already Registered");
    }

    const hashPassword=await bcrypt.hash(password,10);
    console.log("hashed Password: ",hashPassword);

    const user=await User.create({
        username,
        email,
        password:hashPassword

    }) 
    console.log("User Created");

    if(user){

        res.status(201);
        res.json({_id:user._id,email:user.email});
    }
    else{
        res.status(400);
        throw new Error("User Data is not valid");
    }
    
})

// Login User
// path /api/user/login
const LoginUser = asyncHandler(async (req, res) => {

    const {email,password}=req.body;

    if(!email || !password){
        res.status(400);
        throw new Error("All fields are reqiured");
    }

    const user=await User.findOne({email});

    if(user && (await bcrypt.compare(password,user.password))){

        const accessToken=jwt.sign({
            
            user:{
                username:user.username,
                email:user.email,
                id:user.id

            } 
        },
        "private key parameter",
        {expiresIn:"15m"}
    );

    res.json({accessToken});

    }
    else{
        res.status(401);
        throw new Error("Email or password not valid");


    }
    
})

// Current User
// path /api/user/current
const CurrentUser = asyncHandler(async (req, res) => {
    res.json(req.user)
})

module.exports = { RegisterUser, LoginUser, CurrentUser }