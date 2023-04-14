const mongoose =  require('mongoose');
const colors = require("colors");

const dbConnection = async(dbUsername, dbPassword)=>{
    const URI = `mongodb+srv://${dbUsername}:${dbPassword}@curs-web-application.6588msl.mongodb.net/ecommerce?retryWrites=true&w=majority`
    try{
        await mongoose.connect(URI, {useUnifiedTopology:true, useNewUrlParser:true})
        console.log(`DB Connected Sucessfully`.bgRed.white);
    }
    catch(error){
        console.log(`Something Went Wrong While Connecting To DB ${error}`);
    }
}

module.exports = dbConnection;