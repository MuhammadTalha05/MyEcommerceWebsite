const express = require('express');
const router = express.Router();
const formidable = require('express-formidable');
const { requireSignIn, isAdmin } = require('../Middleware/authMiddleware');
const {createProductController,getProductController,getSingleProductController,productPhotoController,deleteProductController,updateProductController,productFilterController,productCountController,productListController,searchProductControllers,realtedProductController,productCategoryController,braintreeTokenController,brainTreePaymentController} = require('../Controllers/productControllers')

// Create Product
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)


//get all products
router.get("/get-product", getProductController);


//get single product
router.get("/get-product/:slug", getSingleProductController);


//get photo Of Product
router.get("/product-photo/:pid", productPhotoController);


//delete product Route
router.delete("/delete-product/:pid", requireSignIn, isAdmin, deleteProductController);


//Update Product Routes
router.put("/update-product/:pid", requireSignIn,isAdmin,formidable(),updateProductController);


///////////// Filtration Part //////////////////

// Product Filters
router.post("/product-filters", productFilterController)



// Product Count
router.get("/product-count", productCountController) 

// Product Per Page
router.get("/product-list/:page", productListController)


// Search Product Controller
router.get("/search/:keyword", searchProductControllers)

// Similar Products Routes

router.get("/related-product/:pid/:cid", realtedProductController)



/////////////////////////// Category Wise Product Route /////////////////

// Category Wise Product
router.get(`/product-category/:slug`, productCategoryController)


//////////////////////////////////////// Payment gateway Routes ///////////
// Token Verifcation From Brain tree
router.get("/braintree/token", braintreeTokenController);


//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);


module.exports = router;