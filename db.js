
//connect to database
//mongoose.connect=> connects to mongoose
const mongoose=require('mongoose');
const mongoURI="mongodb://localhost:27017/inotes" //just change this connection strig to deploy your app anywhere on cloud
const connectToMongo = ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connected")
    })
}
//export this func
module.exports=connectToMongo;
