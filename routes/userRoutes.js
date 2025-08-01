const express=require("express");
const { RegisterUser,LoginUser,CurrentUser } = require("../controller/userController");
const validateToken=require("../middleware/validateTokenHandler");
const router=express.Router();

router.post("/register",RegisterUser)

router.post("/login",LoginUser)

router.get("/current",validateToken,CurrentUser)

module.exports=router;