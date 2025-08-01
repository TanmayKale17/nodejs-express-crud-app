const mongoose=require("mongoose");
require("dotenv").config();

const connectDb= async ()=>{

    try{

        const connect=await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected To DB:" ,"\nHost:",connect.connection.host,"\nDB:",connect.connection.name);
    }
    catch (err){

        console.log(err);
        process.exit(1);

    }
}

module.exports=connectDb;