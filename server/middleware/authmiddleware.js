const jwt = require("jsonwebtoken")
const User = require("../Models/userModel")

//this verification is only applicaple for the current user not to return itself  when ever the current user is searching for other user

const protect = async(req, res, next) =>{
  try{
    const authToken = req.headers.authorization
    if(authToken){
     const token = authToken.split(" ")[2]
     const decode = jwt.verify(token, process.env.SECRET_KEY)

     req.user = await User.findById(decode.id).select("-password")
     next()

    }else{
      res.status("400").json({messae:"token is not passed"})
    }

  }catch(error){
   res.status(400).json({messae: "token is not passed"})
  }
}

module.exports = {
  protect
}