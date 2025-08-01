const express=require("express");
const router=express.Router();
const {GetContact,PostContact,DeleteContact,PutContact,GetContactById,DeleteContactbyId    }=require("../controller/contactcontroller.js");
const validateToken=require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route("/").get(GetContact).post(PostContact).delete(DeleteContact);

router.route("/:variable").put(PutContact).get(GetContactById).delete(DeleteContactbyId);

module.exports=router;