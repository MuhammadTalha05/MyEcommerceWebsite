import React,  {useState, useEffect} from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu'
import axios from 'axios';
import toast from "react-hot-toast";
import { useNavigate, useParams} from "react-router-dom";
import {Select} from 'antd';  
const {Option} = Select

const UpdateProduct = () => {

    const navigate = useNavigate();
    const params =  useParams()
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");
    const [id, setId] = useState("");



    //get single product
  const getSingleProduct = async () => {
    try {
      const {data} = await axios.get(`/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);




    // Get All Cetegories
    
    const getAllCategories = async()=>{
        try{
            const res = await axios.get('/category/get-category');
            if(res.data?.sucess)
            {
                setCategories(res.data?.category);
            }
        }
        catch(error){
            console.log(error);
            toast.error("Something went wrong in getting categories");
        }
        
    }
    useEffect(()=>{
        getAllCategories()
    },[])


     //create product function
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
        const productData = new FormData();
        productData.append("name", name);
        productData.append("description", description);
        productData.append("price", price);
        productData.append("quantity", quantity);
        photo && productData.append("photo", photo);
        productData.append("category", category);
        const res = await axios.put(`/product/update-product/${id}`, productData);
        if (res.data?.success) {
            toast.success(res.data?.message);
            navigate(`/dashboard/admin/products`)
        } else {
            toast.error(res.data?.message);
        }
        } catch (error) {
        console.log(error);
        toast.error("something went wrong");
        }
    };


    const handleDelete = async()=>{
        try{
            const answer =  window.prompt("Are You Sure To Want To Delete This Product ?")
            if(!answer){
                return;
            }
            else{
                const {data} = await axios.delete(`/product/delete-product/${id}`)
                toast.success('Product Deleted Sucessfuly');
                navigate(`/dashboard/admin/products`)
            }
            
        }
        catch(error){
            console.log(error);
            toast.error(`Something Went Wrong While Delete Product`)
        }
    }

  return (
    <Layout title={"Update Product"}>
        <div className="container p-3">
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu/>
                </div>
                <div className="col-md-9">
                    <h5>Update Product</h5>
                    <div className='m-1 w-100'>

                    <div className='mb-3'>
                        <input
                            type="text"
                            value={name}
                            placeholder="Product name"
                            className="form-control"
                            onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className='mb-3'>
                        <textarea
                            value={description}
                            placeholder="Enter Description"
                            className="form-control"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        </div>

                        <div className='mb-3'>
                        <input
                            type="number"
                            value={price}
                            placeholder="Enter Price"
                            className="form-control"
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        </div>

                        <div className='mb-3'>
                        <input
                            type="number"
                            value={quantity}
                            placeholder="Enter Quantity"
                            className="form-control"
                            onChange={(e) => setQuantity(e.target.value)}
                            />
                        </div>

                        <div className='mb-3'>
                        <Select
                        bordered={false}
                        placeholder="Select Shipping "
                        size="small"
                        showSearch
                        className="form-select mb-3"
                        onChange={(value) => {
                            setShipping(value);
                        }}
                        value={shipping ? "yes" : "No"}
                        >
                        <Option value="0">No</Option>
                        <Option value="1">Yes</Option>
                        </Select>
                        </div>

                        <Select bordered={false} 
                        placeholder="Select a category" 
                        size='small' 
                        showSearch
                        className='form-select mb-3'
                        onChange={(value)=>setCategory(value)} // Value prp is from antd not from react
                        value={category}
                        >
                            {
                                categories.map((val)=>{
                                    return(
                                        <>
                                            <Option value={val._id}>
                                                {val.name}
                                            </Option>
                                        </>
                                    )
                                })
                            }

                        </Select> 
                        {/* Image Upload */}
                        <div className='mb-3'>
                            <label className='btn btn-dark w-100 '>
                                {photo ? photo.name : "Upload Photo"} 
                                <input type="file" name="photo" accept='image/*' onChange={(e)=>setPhoto(e.target.files[0])} hidden/>
                            </label>
                        </div>
                        {/* Preview Image */}
                        <div className='mb-3'>
                        {photo ? (
                            <div className="text-center">
                                <img
                                src={URL.createObjectURL(photo)}
                                alt="product_photo"
                                height={"200px"}
                                className="img img-responsive"
                                />
                            </div>
                            ) : (
                            <div className="text-center">
                                <img
                                src={`/product/product-photo/${id}`}
                                alt="product_photo"
                                height={"200px"}
                                className="img img-responsive"
                                />
                            </div>
                            )}
                            {/* {photo && (
                                <div className="text-center">
                                    <img className='img img-responsive' src={URL.createObjectURL(photo)} alt="Product Photo" height={'200px'} />
                                </div>
                            )} */}
                        </div>
        

                    <div className="mb-3">
                        <span>
                            <button style={{marginRight:"10px", width:"48%"}} className="btn btn-dark" onClick={handleUpdate}>
                                Update Product
                            </button>

                            <button style={{marginLeft:"10px", width:"48%"}}className="btn btn-dark" onClick={handleDelete}>
                                Delete Product
                            </button>
                        </span>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default UpdateProduct