const mongoose = require("mongoose")
const bycrpt = require("bcrypt")

const userSchema = mongoose.Schema({
  name:{ 
    type:String,
    require:true
  },
  email:{ 
    type:String,
    require:true
  },
  password:{ 
    type:String,
    require:true
  },
  avatar:{ 
    type:String,
    require:true
  },
},
// timestamps:true
)

userSchema.methods.matchPassword = async function(enterPassword){
  return await bycrpt.compare(enterPassword, this.password)
}

userSchema.pre('save', async function(next){
  if(!this.isModified){
    next()
  }
  const salt = await bycrpt.genSalt(10)
  this.password = await bycrpt.hash(this.password, salt)
})

module.exports = mongoose.model("User", userSchema)