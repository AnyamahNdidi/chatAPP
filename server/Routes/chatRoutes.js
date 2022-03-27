const express = require("express")
const route = express.Router()
const {protect} = require("../middleware/authmiddleware")
const {accessChat, fetchChat,createGroupChat, renameGropup, addGroup, removeGroup}  = require("../Controller/chatController")


route.post("/", protect, accessChat)
route.get("/", protect, fetchChat)
route.post("/group", protect, createGroupChat)
route.put("/rename", protect, renameGropup)
route.put("/groupadd", protect, addGroup)
route.put("/removeGroup", protect, removeGroup)


module.exports = route 