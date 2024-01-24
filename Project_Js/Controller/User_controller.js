const {compareSync, hashSync} = require("bcryptjs")
const {User} = require("../model/User.js")
const jwt = require('jsonwebtoken')

const getAllUser = async (req, res,next) =>{
    let users
    try{
        users = await User.find()   
    }catch(err){
        console.log(err)
        return res.status(400).json({msg: "Error"})
    }
    if(!users){
        return res.status(401).json({msg: "No Users found"})
    }
    return res.status(200).json({users:users})
}

const maxTime = 24 * 60 * 60
const createToken = (id) =>{
    return jwt.sign({ id }, 'Hello ram!!', {
        expiresIn: maxTime
    })
}

const login = async (req, res, next) =>{
    const { email ,password } = req.body
    let existingUser

    try{
        existingUser = await User.findOne({email})
    }catch(err){
        return console.log(err)
    }
    if (!existingUser){
        return res.status(400).json({msg: "User not found by this email"})
    }
    try{
        let PasswordMatch = compareSync(password, existingUser.password)
        if (!PasswordMatch){
            return res.status(400).json({msg: "Password Mismatch"})
        }
        const token = createToken(existingUser._id)   
        res.cookie('jwt', token, { maxTime: maxTime})
        res.status(200).json({msg:"Login Successfull!"})    
    }catch(err){
        console.log(err)
        res.status(401).json({msg: "Error during data retrieval"})
    }

};

const signUp = async (req, res, next) =>{
    const { name, email ,password } = req.body
    let existingUser

    try{
        existingUser = await User.findOne({email})
    }catch(err){
        return console.log(err)
    }
    if (existingUser){
        return res.status(400).json({msg: "User found by this email"})
    }
    const newUser = new User({
        name,
        email,
        password: hashSync(password),
        blogs:[]
    })
    try{
        const user = await newUser.save()
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxTime: maxTime * 10})
        return res.status(200).json({msg: "User creation successful!"})
    }catch(err){
        console.log(err)
        return res.status(400).json({msg: "Error during signUp!"})
    }
}

module.exports = {
    login,
    signUp,
    getAllUser
}