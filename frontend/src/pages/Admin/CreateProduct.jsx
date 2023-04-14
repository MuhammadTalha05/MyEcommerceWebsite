import React, {useState, useEffect} from 'react';
import { toast } from 'react-hot-toast';
import Layout from '../../components/Layout';
import axios from 'axios';
import AdminMenu from '../../components/AdminMenu';
import { useNavigate } from 'react-router-dom';
import {Select} from 'antd';
const {Option} = Select

const CreateProduct = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] =  useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");

    console.log(photo);

    // Get All Categories

    const getAllCategories = async()=>{
        try{
            const {data} = await axios.get(`/category/get-category`);
            if(data?.sucess)
            {
                setCategories(data?.category)
            }
        }
        catch(error){
            console.log(error);
            toast.error(`Error While Getting Categories`)
        }
    }

    useEffect(() => {
        getAllCategories();
    },[])



    //////////////////// Create Product Handler ///////////////
    const handleCreate = async(e)=>{
        e.preventDefault();
        try{
            const productData = new FormData();
            productData.append('name', name);
            productData.append('description', description);
            productData.append('price', price);
            productData.append('quantity', quantity);
            productData.append('photo', photo);
            productData.append('category', category);

            const {data} = await axios.post(`/product/create-product`, productData)
            if(data?.sucess)
            {
                toast.success(data?.message)
                navigate(`/dashboard/admin/products`)
            }
            else{
                toast.error(data?.message)
            }

        }
        catch(error)
        {
            console.log(error);
            toast.error(`Something Went Wrong While Creating Product`);
        }
    }

    
return (
<Layout title={'Create Products'}>

        <div className='container-fluid pt-5 pb-5 searchResults'>
            <div className="row">
                <div className="col-md-12">
                    <h1 className="text-center text-white">Create Product</h1>
                </div>
            </div>
        </div>

    <div className="container p-3">
        <div className="row">
            <div className="col-md-3">
                <AdminMenu/>
            </div>
            <div className="col-md-9">
                <h5>Create Products</h5>
                <div className='m-1 w-100'>
                    {/* Product Name */}
                    <div className='mb-3'>
                        <input type="text" value={name} 
                        placeholder="Enter Product Name"
                        className='form-control'
                        onChange={(e)=>setName(e.target.value)}
                         />
                    </div>
                    {/* Product Description */}
                    <div className='mb-3'>
                        <input type="text" value={description} 
                        placeholder="Enter Product Description"
                        className='form-control'
                        onChange={(e)=>setDescription(e.target.value)}
                         />
                    </div>
                    {/* Product Price */}
                    <div className='mb-3'>
                        <input type="number" value={price} 
                        placeholder="Enter Product Price"
                        className='form-control'
                        onChange={(e)=>setPrice(e.target.value)}
                         />
                    </div>
                    {/* Product Quantity */}
                    <div className='mb-3'>
                        <input type="number" value={quantity} 
                        placeholder="Enter Product Quantity"
                        className='form-control'
                        onChange={(e)=>setQuantity(e.target.value)}
                         />
                    </div>


                    {/* For Categories */}
                    <Select bordered={false} placeholder="Please Select Your Category"
                    showSearch
                    className='form-select mb-3'
                    size='small'
                    onChange={(value)=>{setCategory(value)}}
                    >

                    {
                        categories?.map(c=>(
                            <Option key={c._id} value={c._id}>{c.name}</Option>
                        ))
                    }

                    </Select>

                    {/* Product Shipping */}
                    <div className='mb-3'>
                        <Select bordered={false}
                        placeholder="Please Select Your Shipping"
                        showSearch
                        className='form-select mb-3'
                        size='small'
                        onChange={(value)=>{setShipping(value)}}
                        >
                            <Option value="0">No</Option>
                            <Option value="1">Yes</Option>
                        </Select>
                    </div>
                    

                    {/* For Uploading Images */}
                    <div className="mb-3">
                        <label className='btn btn-dark w-100' >
                        {
                            photo ? photo.name : "Upload Photo"
                        }
                            <input type="file" name="photo" accept='image/*' onChange={(e)=> setPhoto(e.target.files[0])} hidden/>
                        </label>
                    </div>

                    {/* For Image Previewing */}
                    <div className="mb-3">
                        {
                            photo && (
                                <div className="text-center">
                                    <img src={URL.createObjectURL(photo)} alt="ProductPhoto" 
                                    height="200px" 
                                    className='img img-responsive' />
                                </div>
                            )
                        }
                    </div>
                    {/* Create Product Button */}
                    <div className="mb-3">
                        <button className='btn btn-dark w-100' onClick={handleCreate}>Create Product</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</Layout>
  )
}

export default CreateProduct