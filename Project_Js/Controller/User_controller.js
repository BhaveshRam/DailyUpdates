const {compareSync, hashSync} = require("bcryptjs")
const {User} = require("../model/User.js")

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
    const user = new User({
        name,
        email,
        password: hashSync(password),
        blogs:[]
    })
    try{
        await user.save()
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