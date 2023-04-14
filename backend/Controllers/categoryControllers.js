const categoryModelSchema = require('../Models/categoryModel');
const slugify = require('slugify')


const createCategoryController = async(req, res)=>{
    

    const {name} = req.body;
    if(!name)
    {
        return res.status(401).json({message: `Name Is Required`});
    }
    try {
    
        const existingCategory = await categoryModelSchema.findOne({name:name})
        if(existingCategory){
            return res.status(200).json({sucess:false, message: `Category Already Exist`});
        }

        const category = new categoryModelSchema({
            name:name,
            slug:slugify(name), // yeh name ki base pe slug bna rahey hain
        })

        await category.save();

        res.status(200).json({
            sucess: true,
            message: `Category Created Succesfuly`,
            category
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
          sucess: false,
          error:error,
          message: "Errro in Category",
        });
      }

}

// ////////// update Category///////////

const updateCategoryController = async(req, res)=>{
    const { id } = req.params;
    const { name } = req.body;    
    try{
        const category = await categoryModelSchema.findByIdAndUpdate(id, {name, slug:slugify(name)}, {new:true});
        res.status(200).json({
            sucess: true,
            message: "Category Updated Successfully",
            category,
          });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
          sucess: false,
          error:error,
          message: "Error While Updating Category",
        });
      }
}

///////////////////// Get All Categories /////////
const categoryControlller = async(req,res)=>{
    try{
        const category = await categoryModelSchema.find({});
        res.status(200).json({
        sucess: true,
        message: "All Categories List",
        category,
    });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
          sucess: false,
          error:error,
          message: "Error While Getting All Category",
        });
      }
}


///////////////////// Get Single categories////////////////////////
const singleCategoryController = async(req, res)=>{
    const {slug} = req.params
    try{
       const category = await categoryModelSchema.findOne({slug})
       res.status(200).json({
        sucess: true,
        message: "Get SIngle Category SUccessfully",
        category,
      });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
          sucess: false,
          error:error,
          message: "Error While Getting Single Category",
        });
      }
}

///////////////////////// DELETE CATEGORY //////////////////////
const deleteCategoryController = async(req, res)=>{
    const {id} = req.params
    try{
        await categoryModelSchema.findByIdAndDelete(id)
        res.status(200).json({
            sucess: true,
            message: "Category Deleted Successfully",
          });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
          sucess: false,
          error:error,
          message: "Error While Deleting Category",
        });
      }
}


module.exports = {
    createCategoryController,
    updateCategoryController,
    categoryControlller,
    singleCategoryController,
    deleteCategoryController
    
}