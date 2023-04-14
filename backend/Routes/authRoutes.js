const express =  require('express');
const router = express.Router();
const {registerController, loginController,forgotPasswordController ,testController,updateProfileController,getOrdersController} = require('../Controllers/authControllers')
const {requireSignIn,isAdmin} = require('../Middleware/authMiddleware')


// Register Post Routing
router.post('/register', registerController);

// Login Post Routing
router.post('/login', loginController);

// Forgot PAssword
router.post('/forgot-password', forgotPasswordController)


// Test Get Route

router.get('/test', requireSignIn , isAdmin,  testController)


// Private and Protected user Route Auth

router.get('/user-auth', requireSignIn, (req, res)=>{
    res.status(200).json({ok: true})
})

// Private and Protected Admin Route Auth

router.get('/admin-auth', requireSignIn, isAdmin ,(req, res)=>{
    res.status(200).json({ok: true})
})


//update profile
router.put("/profile", requireSignIn, updateProfileController);


//orders
router.get("/orders", requireSignIn, getOrdersController);

module.exports = router;