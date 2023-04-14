const express =  require('express');
const { requireSignIn, isAdmin } = require('../Middleware/authMiddleware');
const {createCategoryController, updateCategoryController,categoryControlller,singleCategoryController,deleteCategoryController} = require('../Controllers/categoryControllers')
const router = express.Router();

// Create Category
router.post('/create-category', requireSignIn, isAdmin, createCategoryController)

//update category
router.put("/update-category/:id", requireSignIn, isAdmin, updateCategoryController);


//getALl category
router.get("/get-category", categoryControlller);

//single category
router.get("/single-category/:slug", singleCategoryController);

//delete category
router.delete("/delete-category/:id", requireSignIn, isAdmin, deleteCategoryController);





module.exports = router;