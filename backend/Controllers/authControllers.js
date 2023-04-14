const userSchemaModel =  require('../Models/userModel');
const {hashPassword,comparePassword} = require('../Helpers/authHelper');
const orderModelSchema = require('../Models/orderModel')
const jwt = require('jsonwebtoken');



// Register Auth Controller
const registerController = async(req, res)=>{
    const {name , email , password , phone , address, answer ,role} = req.body;
    if(!name)
        {
            return res.json({message: 'Name Is Required'});
        }

        if(!email)
        {
            return res.json({message: 'Email Is Required'});
        }

        if(!password)
        {
            return res.json({message: 'Password Is Required'});
        }

        if(!phone)
        {
            return res.json({message: 'Phone Is Required'});
        }

        if(!address)
        {
            return res.json({message: 'Address Is Required'});
        }
        if(!answer)
        {
            return res.json({answer: 'Answer Is Required'});
        }

    try{
        
        // Check User
        const existingUser = await userSchemaModel.findOne({email:email})

        // Is Exiting User
        if(existingUser){
            return res.status(200).json({sucess:false, message:`Already Register Please Please Login`})
        }

        // Registring A New User
        const hashedPassword = await hashPassword(password);

        // Save User Into Database
        const user = new userSchemaModel({
            name:name,
            email:email,
            password:hashedPassword,
            phone:phone,
            address:address,
            answer:answer,
            role:role
        })

        await user.save();

        res.status(200).json({sucess:true, message:"User Register Sucessfully" , user})


    }
    catch(error){
        res.status(500).json({
            sucess:false,
            message:"Error In Registration",
            error: error.message,
        })
    }
}




// Login Auth Controller

const loginController = async(req, res)=>{

    const {email, password} = req.body;

    try{

        if(!email || !password){
            return res.status(404).json({
                sucess:false,
                message:'Invalid Email Or Password',
            })
        }
    
        // Check User Is Exist Or Not On Email Bases
        const user = await userSchemaModel.findOne({email:email})
        if(!user){
            return res.status(404).json({sucess:false, message:'This Email Is Not Registered'})
        }
        const match = await comparePassword(password, user.password)
        if(!match){
            return res.status(404).json({sucess :false, message: `Invalid Password`})
        }
    
        // Now we create token with user Id
        // const token = await jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:"7d"});
        const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
          });
        // After creating Token
        res.status(200).json({
            sucess:true, 
            message: "Login Sucessfuly",
            // Show krwane ke liey bas user main hum yeh kr rahey hain
            user:{
                _id: user.id,
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role
            },
            // Token Bhi Hum ne show krwa dia hi
            token:token,
        })    
    }
    catch(error){
        res.status(500).json({
            sucess:false,
            message: "Something Went Wrong While Login",
            error: error.message
        })
    }
}



// Forgot Password Controller
const forgotPasswordController = async(req, res)=>{
    const {email, answer , newPassword} = req.body;
    try{
        if (!email) {
            res.status(400).json({ message: "Email Is Required" });
          }
          if (!answer) {
            res.status(400).json({ message: "Answer Is Required" });
          }
          if (!newPassword) {
            res.status(400).json({ message: "New Password Is Required" });
          }


        // check email or password is correct or not
        const user = await userSchemaModel.findOne({email, answer})
        // validation
        if(!user)
        {
            return res.status(404).json({
                sucess: false,
                message: "Wrong Email Or Answer",
            });
        }

        // if user available then 

        const hashed = await hashPassword(newPassword)
        await userSchemaModel.findByIdAndUpdate(user._id, {password: hashed}) // oper wala user._id uthad or us main password ko update kr do
        res.status(200).json({
            sucess: true,
            message: "Password Reset Successfully",
          });

    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({
            sucess : false,
            message: `Something Went Wrong`,
            erorr:error,
        });
    }
}

//// Update Controller
const updateProfileController = async(req, res)=>{
    try {
        const { name, email, password, address, phone } = req.body;
        const user = await userSchemaModel.findById(req.user._id);
        //password
        if (password && password.length < 6) {
          return res.json({ error: "Passsword is required and 6 character long" });
        }
        const hashedPassword = password ? await hashPassword(password) : undefined;
        const updatedUser = await userSchemaModel.findByIdAndUpdate(
          req.user._id,
          {
            name: name || user.name,
            password: hashedPassword || user.password,
            phone: phone || user.phone,
            address: address || user.address,
          },
          { new: true }
        );
        res.status(200).json({
          sucess: true,
          message: "Profile Updated SUccessfully",
          updatedUser,
        });
      } catch (error) {
        console.log(error);
        res.status(400).json({
          sucess: false,
          message: "Error WHile Update profile",
          error,
        });
      }
}



const getOrdersController = async(req,res)=>{
    try {
        const orders = await orderModelSchema
          .find({ buyer: req.user._id })
          .populate("products", "-photo")
          .populate("buyer", "name");
        res.json(orders);
      } catch (error) {
        console.log(error);
        res.status(500).json({
          sucess: false,
          message: "Error While Geting Orders",
          error,
        });
      }
}

// Test Controller

const testController = (req, res)=>{
    res.json("Protected Routes")
}

module.exports = {
    registerController,
    loginController,
    forgotPasswordController,
    updateProfileController,
    getOrdersController,
    testController,
}