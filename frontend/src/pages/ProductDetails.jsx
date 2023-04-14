import React, {useState, useEffect} from 'react'
import Layout from '../components/Layout';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';
import { toast } from 'react-hot-toast';


const ProductDetails = () => {

    const [cart, setCart] = useCart();
    const navigate = useNavigate();


    const params = useParams()
    const [product, setProduct] = useState({})
    const [relatedProducts, setRelatedProducts] = useState([]);



    ///// Initail Reload///

    useEffect(()=>{
        if(params?.slug) getProduct();
    },[params?.slug])


    // Get Single Product Detils
    const getProduct = async()=>{
        try{
            const {data} = await axios.get(`/product/get-product/${params.slug}`);
            setProduct(data?.product)
            getSimilarProducts(data?.product._id, data?.product.category._id)
        }
        catch(error)
        {
            console.log(error);
        }
    }


    // Similar Prodcut Api Call

    const getSimilarProducts = async(pid, cid)=>{
        try {
            const { data } = await axios.get(`/product/related-product/${pid}/${cid}`);
            setRelatedProducts(data?.products);
        }
        catch(error){
            console.log(error);
        }
    }

  return (
    <Layout title={product.name}>
    {/* banner */}
        <div className='container-fluid pt-5 pb-5 searchResults'>
            <div className="row">
                <div className="col-md-12">
                    <h1 className="text-center text-white">{product.name}</h1>
                </div>
            </div>
        </div>

        {/* Single Prodcut Details */}
        <div className='container pt-5 pb-5 mt-3 mb-3'>
            <div className="row d-flex justify-content-between">
                <div className="col-md-5 ">
                <img
                    src={`/product/product-photo/${product._id}`}
                    className="card-img-top img img-responsive"
                    alt={product.name}
                    height= "400px"
                    width="300px"
                  />
                </div>
                <div className="col-md-6 d-flex flex-column justify-content-center">
                    <h1>{product.name}</h1>
                    <h5><strong>Price</strong>: {product?.price}$</h5>
                    <h5><strong>Category</strong>: {product?.category?.name}</h5>
                    <h5><strong>Description</strong>: {product?.description}</h5>
                    <h5><strong>Quantity</strong>: {product?.quantity} Available</h5>
                    <button 
                    className='btn btn-dark w-25 mt-3'
                    onClick={()=>{
                      setCart([...cart, product])
                      localStorage.setItem("cart", JSON.stringify([...cart, product]))
                      toast.success("Item Added To Cart")  
                    }}

                    >Add To Cart</button>
                </div>
            </div>
        </div>


        {/* Similar Products */}
        <div className="container mt-3 mb-3">
            <div className="row">
            {
                relatedProducts.length < 1 && <p>No Similar Products Found</p>
            }
                <div className="col-md-12">
                    <h3 className="bg-dark p-2 text-white text-center" >All Similar Products</h3>
                    <div className="d-flex flex-wrap mt-5 mb-5">
                    {
                        relatedProducts?.map((r) => (
              
                    <div className="card m-2" style={{ width: "16rem" }}>
                    <img
                    src={`/product/product-photo/${r._id}`}
                    className="card-img-top img img-responsive"
                    alt={r.name}
                    height="300px"
                    />
                    <div className="card-body">
                    <h5 className="card-title">{r.name}</h5>
                    <p className="card-text">{r.description.substring(0,30)}...</p>
                    <p className="card-text">$ {r.price}</p>
                    <span>
                    <button style={{paddingInline:8, paddingBlock:10}} class="btn btn-dark btn-sm me-2" onClick={()=>navigate(`/product/${r.slug}`)}>More Details</button>
                    <button style={{paddingInline:8, paddingBlock:10}} class="btn btn-dark btn-sm me-4">Add To Cart</button>
                    </span>
                  </div>
                </div>
            ))}
            </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default ProductDetails