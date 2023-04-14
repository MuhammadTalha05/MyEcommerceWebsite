const productModelSchema = require('../Models/productModel');
const categoryModelSchema = require('../Models/categoryModel');
const orderModelSchema = require('../Models/orderModel')
const fs = require('fs'); // File System Handling
const slugify = require('slugify');
const braintree = require("braintree");
const dotenv = require("dotenv");

dotenv.config()


/////////// Payment Gateway //////

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY ,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});



// Post Products
// Now we get data from fields 
const createProductController = async(req, res)=>{
    
  try{
      const {name,slug,description,price,category,quantity,shipping} = req.fields;
      const {photo} = req.files;
      // Validation
        switch (true) {
            case !name:
              return res.status(500).json({ error: "Name is Required" });
            case !description:
              return res.status(500).json({ error: "Description is Required" });
            case !price:
              return res.status(500).json({ error: "Price is Required" });
            case !category:
              return res.status(500).json({ error: "Category is Required" });
            case !quantity:
              return res.status(500).json({ error: "Quantity is Required" });
            case photo && photo.size > 1000000:
              return res.status(500).json({ error: "photo is Required and should be less then 1mb" });
          }
        const products =  new productModelSchema({...req.fields, slug:slugify(name)})
        if(photo){
          products.photo.data = fs.readFileSync(photo.path);
          products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).json({
            sucess: true,
            message: "Product Created Successfully",
            products,
          });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
          sucess: false,
          error:error,
          message: "Error While Uploading Product",
        });
    }
}




///////////////////////// Get All Products ////////////////////////////

const getProductController = async(req,res)=>{
  try{
    const products = await productModelSchema.find({}).populate('category').select("-photo").limit(12).sort({ createdAt: -1 });
    res.status(200).json({
    sucess: true,
    counTotal: products.length,
    message: "All Products ",
    products,
  });
  }
  catch(error) {
    console.log(error);
    res.status(500).json({
      sucess: false,
      error:error,
      message: "Error While Getting Product",
    });
}
}





///////////////////////// Get Single Product //////////////////////
const getSingleProductController = async(req, res)=>{
  const {slug} = req.params;
  try{
    const product = await productModelSchema.findOne({slug}).select("-photo").populate("category");
    // console.log(product);
    res.status(200).json({
      sucess: true,
      message: "Single Product Fetched",
      product,
    })
  }
  catch(error) {
    console.log(error);
    res.status(500).json({
      sucess: false,
      error:error,
      message: "Error While Getting Single Product",
    });
  }
}





///////////////////////// get Photo Of Any Product /////////////////////
const productPhotoController = async(req, res)=>{
  try {
    const product = await productModelSchema.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-Type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  }
  catch(error) {
    console.log(error);
    res.status(500).json({
      sucess: false,
      error:error,
      message: "Error While Getting Single Product Photo",
    });
  }
}




//////////////////// Delete Product Controller //////////////////////////
const deleteProductController = async(req, res)=>{
  try {
    await productModelSchema.findByIdAndDelete(req.params.pid).select("-photo")
    res.status(200).json({
      sucess: true,
      message: "Product Deleted successfully",
    });
  }
  catch(error) {
    console.log(error);
    res.status(500).json({
      sucess: false,
      error:error,
      message: "Error While Deleting Product",
    });
  }
}



/////////////////////////// Update Product Controller /////////////////////////
const updateProductController = async(req, res)=>{

  const { name, description, price, category, quantity, shipping } = req.fields;
  const { photo } = req.files;

  try {
    //Validation 
    switch (true) {
      case !name:
        return res.status(500).json({ error: "Name is Required" });
      case !description:
        return res.status(500).json({ error: "Description is Required" });
      case !price:
        return res.status(500).json({ error: "Price is Required" });
      case !category:
        return res.status(500).json({ error: "Category is Required" });
      case !quantity:
        return res.status(500).json({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res.status(500).json({ error: "photo is Required and should be less then 1mb" });
    }

    const products = await productModelSchema.findByIdAndUpdate(req.params.pid, { ...req.fields, slug: slugify(name) },
    { new: true }
    );
    if(photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).json({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  }
  catch(error){
    console.log(error);
    res.status(500).json({
      sucess: false,
      error:error,
      message: "Error While Updating Product",
    });
  }
}



/////////// Filters ///////////
const productFilterController = async(req, res)=>{
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModelSchema.find(args);
    res.status(200).json({
      sucess: true,
      products,
    });
  }
  catch (error) {
    console.log(error);
      res.status(400).json({
      sucess: false,
      message: "Error While Filtering Products",
      error,
    });
  }
}



///////// Product Counting////////////

const productCountController = async(req, res)=>{
  try{
    const total = await productModelSchema.find().estimatedDocumentCount() // this will give us all document count
    res.status(200).json({
      sucess:true,
      total,
    })
  }
  catch(error){
    console.log(error);
      res.status(400).json({
      sucess: false,
      message: "Error While Product Counting",
      error,
  })
}}



// Product List based on Pages
const productListController = async(req,res)=>{
  try{
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModelSchema
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      products,
    });
  }
  catch(error)
  {
    console.log(error);
      res.status(400).json({
      sucess: false,
      message: "Error In Product Per Page",
      error,
    })
  }
}



// Product Search Controller
const searchProductControllers = async(req, res)=>{
  try {
    const { keyword } = req.params;
    const results = await productModelSchema
      .find({
        $or: [ // if any word found in name or description then it also make it case insensitive
          { name: { $regex: keyword, $options: "i" } }, 
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(results);
  }
  catch(error)
  {
      console.log(error);
      res.status(400).json({
      sucess: false,
      message: "Error Search Product API",
      error,
    })
  }
}




////// Related Simpilar Product Contrller

const realtedProductController = async(req, res)=>{
  try {
    const { pid, cid } = req.params;
    const products = await productModelSchema
      .find({
        category: cid,
        _id: { $ne: pid }, // ne Means Not Included when some product is open we dont want to show same product in similar product
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).json({
      sucess: true,
      products,
    });
  }
  catch (error) {
    console.log(error);
    res.status(400).json({
      sucess: false,
      message: "Error while geting related product",
      error,
    });
  }
}


// ///////// category Wise Product /////////////

const productCategoryController = async(req, res)=>{
  try {
    const category = await categoryModelSchema.findOne({ slug: req.params.slug });
    const products = await productModelSchema.find({ category }).populate("category");
    res.status(200).json({
      sucess: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      sucess: false,
      error,
      message: "Error While Getting products",
    });
  }
}


/////////////// Pyment Gateway Controller //////////////

//// Token Verification//////

const braintreeTokenController = async(req,res)=>{
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
}


const brainTreePaymentController = async(req, res)=>{
  try {
    const { nonce, cart } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModelSchema({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).json(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
    createProductController,
    getProductController,
    getSingleProductController,
    productPhotoController,
    deleteProductController,
    updateProductController,

    productFilterController,
    productCountController,
    productListController,
    searchProductControllers,
    realtedProductController,
    productCategoryController,


    braintreeTokenController,
    brainTreePaymentController
}