

const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { Error } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");




const register = asyncHandler( async (req,res)=>{

    const {username,email,password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered");
    }else{
    
    const hashedPassword = await bcrypt.hash(password,10);
    console.log("Hashed Password " , hashedPassword);
    const user = await User.create({
        username,
        email,
        password:hashedPassword
    })

    console.log(`User created ${user}`);
    res.status(201).json({
        _id:user.id,
        email:user.email,
    });

    }
    
})

const login = asyncHandler( async (req,res)=>{

    const {email,password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory !!");
    }

    const user = await User.findOne({email});
    //comparing password with hashed password
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign({
            user :{
                username: user.username,
                email: user.email,
                id:user.id,
            },
        },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "15m"}
        )
        res.status(200).json({accessToken});
    }else{
        res.status(400);
        throw new Error("email or password is not valid ");
    }
    res.json({message : "Login the user"});

})

const current =  asyncHandler( async (req,res)=>{
    res.json(req.user);
})

module.exports = {register,login,current};