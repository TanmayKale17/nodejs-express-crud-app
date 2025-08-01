const mongoose=require("mongoose");

const contactSchema=mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    name:{
        type:String,
        required:[true,"ADD NAME"]
    }
    ,
    email:{
        type:String,
        required:[true,"ADD Email"]
    },

    password:{
        type:String,
        reqired:[true,"ADD PHONE"]
    }
},
{
    timestamp:[true]
})

module.exports=mongoose.model("Contacts",contactSchema);