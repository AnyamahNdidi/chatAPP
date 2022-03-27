const express = require("express")
const app = express()
const cors = require("cors")
const dotenv = require('dotenv')
const myRouter = require('./Routes/myRoutes')
const myChat = require("./Routes/chatRoutes")
dotenv.config()
require("./config/db")
const PORT = process.env.PORT || 2024

app.use(express.json())
app.use(cors())


app.use('/', myRouter)
app.use("/chat", myChat)

app.listen(PORT , ()=>{
  console.log("im runnig on this port")
})


