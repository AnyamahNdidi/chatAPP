const User = require("../Models/userModel")
const {generateToken} = require("../config/generateToken")
const bycrpt = require('bcrypt')
const { use } = require("../Routes/myRoutes")
const path = require('path')
const cloudinary = require("cloudinary")


cloudinary.config({
  cloud_name: "ndtech",
  api_key:"325692748593977",
  api_secret:"umNXDmlZgBcvD-DrYhwoehT0HDM"
})


const Register = async(req, res)=>{
  const {name, password, email, avatar} = req.body
  const cloud = await cloudinary.uploader.upload(req.file.path)
  console.log(cloud)

  try{

    const userExist = await User.findOne({email})
    if(userExist){
      return res.status(401).json({mesage:"email already exist"})
    }

    const newData = await User.create({
      name,
      password,
      email,
      // avatar:req.file.path,
      avatar: cloud.secure_url
      
    })
    res.status(201).json({mesage:"user created",
    data:{newData, token:generateToken({_id:newData._id, name:newData.name}) }
    
  })
  }catch(error){
    res.status(400).json({error: error.message})
  }
}

const LoginUser = async (req, res)=>{

  try{
    const { email, password}= req.body
    
    const user = await User.findOne({email})
    if(user){

    // the match methos is comiing from the userSchema and also the bycrypt

      const checkPassword = await user.matchPassword(req.body.password, user.password)
      if(checkPassword){
        const {password, ...info} = user._doc
        const token = generateToken({
          id:user._id,
          email:user.email,
          name:user.email
        })

        res.status(200).json({
          message :`welcome back ${user.name}`,
          data:{...info, token}
        })

      }else{
        res.status(400).json({message:"passwors is incorrect"})
      }

    }else{
      res.status(400).json({message :"user is not register"})
    }

  }catch(error){
    res.status(400).json({message : error.message})
  }
  const {email, password} = req.body
}


// api for userSearch 
const allusers = async(req, res)=>{
    const keyword = req.query.search  ?
    {
      $or:[
        {name : {$regex:req.query.search, $options:"i"}},
        {email : {$regex:req.query.search, $options:'i'}},
      ]
    } : {}
  // without token verification you use the comment one
  // const user = await User.find(keyword)

  const user = await User.find(keyword).find({ _id: { $ne: req.user._id } })
  res.status(200).send(user)
}

module.exports = { 
  Register,
  LoginUser,
  allusers
}