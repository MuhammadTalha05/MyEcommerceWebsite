const jwt = require("jsonwebtoken");
const userSchemaModel = require("../Models/userModel");

// Protected Routes Token base means ke jab token aye tab hi router halo otherwise ni 

// jab bhi hamre pas request aye to pahle next execute ho phir response de
const requireSignIn = async(req, res, next)=>{

    try{
        // Now We Compare Token With Authentic token
        // Our Token Is Always is header and we also give Secret Key 
        const decode =  jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        // console.log(req.user);
        // when above line executed then we use next()
        req.user = decode;
        next(); 
    }
    catch(error)
    {
        console.log(error);
    }

}



// Is Admin Middleware

const isAdmin = async(req,res,next)=>{
    try{
        const user = await userSchemaModel.findById(req.user._id)
        console.log(user.role);

        if(user && user.role === 1)
        {
            next();
        }
        else{
            return res.status(404).json({
                sucess:false,
                message:"Un-Authorized Access"
            })
        }

        // if(user.role !== 1)
        // {
        //     return res.status(404).json({
        //         sucess:false,
        //         message:"Un-Authorized Access"
        //     })
        // }
        // else{
        //     next();
        // }
    }
    catch(error){
        res.status(404).json({
            sucess:false,
            error:error.message
        });
    }
}

module.exports = {
    requireSignIn,
    isAdmin,
}