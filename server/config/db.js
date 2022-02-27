const mongoose = require("mongoose")

mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
  console.log("connect successfully database")
}).catch((error)=>{
  console.log("something is wrong with this connection")
})

module.exports = mongoose