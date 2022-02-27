const express = require("express")
const route = express.Router()
const path = require('path')
const multer = require("multer")
const cloudinary = require("cloudinary")

const {Register, LoginUser} = require("../Controller/useController")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const uploads = multer({ storage: storage }).single("image")

route.post("/register", uploads, Register)
route.post("/login", LoginUser)
module.exports = route

