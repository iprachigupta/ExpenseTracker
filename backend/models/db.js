//mongoose setup
const mongoose = require("mongoose");
const mongo_url = process.env.MONGO_CONNECT;

//checking for connection
mongoose.connect(mongo_url).then(()=>{
    console.log("MongoDB Connected . . .");
}).catch((error)=>{
    console.log("MongoDB Error : ",error);
})