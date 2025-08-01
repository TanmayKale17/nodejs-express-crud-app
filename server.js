const express=require("express");
require("dotenv").config();
const errorHandler = require("./errorhandler/errorHandler.js");
const connectDb = require("./config/dbConnection.js");
const port=process.env.PORT || 7000;
connectDb();
const app=express();
app.use(express.json());
app.use("/api/contacts",require("./routes/router.js"));
app.use("/api/user",require("./routes/userRoutes.js"));
app.use(errorHandler);

app.listen(port,()=>{
    console.log(`RUNNING ON PORT ${port}`);
})