const users = require('../Models/userSchema')
const jwt = require('jsonwebtoken')
exports.register = async (req,res)=>{
    console.log("Inside register controller function");
    const {username,email,password} = req.body
    try{
        const exisitingUser = await users.findOne({email})
        if(exisitingUser){
            res.status(406).json("Account Already existing...Please Login")
        }else{
           const newUser = new users({
              username,email,password,github:"",linkedin:"",profile:""
           })
           await newUser.save()
           res.status(200).json(newUser)

        }
    }
    catch(err){
        res.status(401).json(`Register API Failed, Error: ${err}`)

    }
}
//login

exports.login = async (req,res)=>{
    console.log("Inside Login Function");
    const {email,password} = req.body
    try{
        const existingUser = await users.findOne({email,password})
        if(existingUser){
            const token = jwt.sign({userId:existingUser._id},"captcha456")
            res.status(200).json({
                existingUser,token
            })
        }else{
            res.status(404).json('Incorrect email/password')
        }
    }catch(err){
        res.status(401).json(`Register API Failed, Error: ${err}`)

    }

}

exports.updateUser = async (req,res)=>{
    const userId = req.payload
    const {username,email,password,github,linkedin,profile} = req.body
    const uploadImage = req.file?req.file.filename:profile
    try{
        const editUser = await users.findByIdAndUpdate({_id:userId},{
            username,email,password,github,linkedin,profile:uploadImage
        },{new:true})
        await editUser.save()
        res.status(200).json(editUser)
    }catch(err){
        res.status(401).json(err)
    }
}