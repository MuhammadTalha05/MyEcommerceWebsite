const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema =  new Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type:String,
        required:true,
        unique: true,
    },
    password: {
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    address:{
        type:{},  // if we use text area then we use Obj insted of String for multiple lines 
        required:true,
    },
    answer: {
        type:String,
        required:true,
    },
    role:{
        type:Number,
        default: 0,
        // type:String,
        // enum:["admin", "user"],
        // default:"user",
    }

},{
    timestamps:true
})


const userSchemaModel = mongoose.model('users', userSchema);
module.exports = userSchemaModel;