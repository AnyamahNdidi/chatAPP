const mongoose = require("mongoose")

const roomSchema = mongoose.Schema({ 
  name:{
    type:String,
    require:true
  }

})

moduke.exports = mongoose.model("room", roomSchema)