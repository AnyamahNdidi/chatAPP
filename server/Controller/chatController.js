const Chat = require("../Models/chatModels")
const User = require("../Models/userModel")
 

const accessChat = async (req, res)=>{
  const { userId} = req.body

  if(!userId){
     console.log( "userId param not sent with request")
     return res.status(400).json({message :"userId param not sent with request"})
  }

  let isChat = await  Chat.find({ 
     isGroupChat:false,
     $and:[
       {users:{$elemMatch:{$eq:req.user._id }}},
       {users: {$elemMatch:{$eq:userId}}}
     ]
  }).populate("users", "-password").populate("latestMessage")
  
  //latestmessga is coming from the chatModel while the sender is coming from the messageModel

  isChat = await User.populate(isChat,{
    path : 'latestMessage.sender',
    select:"name email avatar"
  })

  if(isChat.length > 0){
      res.send(isChat[0])
  }else{
    let chatData = {
      chayName: "sender",
      isGroupChat:false, 
      users:[req.user._id, userId]
    }

    try{
      const createChat = await Chat.create(chatData)
      const fullChat = await Chat.findOne({_id:createChat}).populate(
        "users",
        "-password"
      )

      res.status(200).send(fullChat)
    }catch(error){
       res.status(400).json({message: error.message})
    }
  }

    

}

const fetchChat = async (req, res)=>{
  try{
    Chat.find({users : {$elemMatch:{$eq:req.user._id}},})
    .populate("users", "-password")
    .populate("groupAdmn", "password")
    .populate("latestMessage")
    .sort({updatedAt:-1}) 
    .then(async  (results)=>{
      results  = await User.populate(results, {
        path:"latestMessage.sender",
        select:"name email avatar"
      })
      res.status(200).send(results)
    })
    // .then(results=> res.send(results))

  }catch(error){
  res.status(400).json({message : error.message})
  }

}

const createGroupChat = async (req, res)=>{
  if(!req.body.users || !req.body.name){
    return  res.status(400).send({message:"please fill all the fields"})
  }
  let users = JSON.parse(req.body.users)

  if(users.length < 2){
    return res.status(400).send("more that 2 users are required to form a group chat")
  }

  users.push(req.user)

  try{
    const groupChat = await Chat.create({
      chayName:req.body.name,
      users:users,
      isGroupChat:false, 
      groupAdmn:req.user
    })

    const fullGroupChat = await Chat.findOne({
      _id:groupChat._id
    }).populate("users", "-password")
    .populate("groupAdmn", "-password")

    res.status(200).json(fullGroupChat)

  }catch(error){
    res.status(400).json({message : error.message})
  }

    
}

const renameGropup = async (req, res)=>{
  const {chatId, chatName} = req.body;

  const updateChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName
    }, 
    {
      new:true
    }
  ).populate("users", "-password")
  .populate("groupAdmn", "-password")

  if(!updateChat){
    res.status(404).json({message:"chat not found"})
  }else{
    res.json(updateChat)
  }

}
const addGroup = async (req, res)=>{
  const {chatId, userId} = req.body

  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push : {users : userId}
    },
    {new: true}
  ).populate("users", "-password")
  .populate("groupAdmn", "-password")

  if(!added){
    res.status(404).json({message:"chat not found"})
  }else{
    res.json(added)
  }
}

const removeGroup = async (req, res)=>{
  const {chatId, userId} = req.body

  const remove = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull : {users : userId}
    },
    {new: true}
  ).populate("users", "-password")
  .populate("groupAdmn", "-password")

  if(!remove){
    res.status(404).json({message:"chat not found"})
  }else{
    res.json(removw)
  }
}

module.exports = {
  accessChat,
  fetchChat,
  createGroupChat,
  renameGropup,
  addGroup,
  removeGroup
}