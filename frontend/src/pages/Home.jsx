import React, {useState, useEffect} from 'react'
import Layout from '../components/Layout'
import axios from 'axios';
import {Checkbox, Radio} from 'antd';
import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';
import { toast } from 'react-hot-toast';

const Home = () => {

  const [cart, setCart] = useCart()

  const navigate = useNavigate()

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotall] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);


  


  ///////////////////// Get All Categories ///////////////
  const getAllCategories = async()=>{
    try{
      const {data} = await axios.get(`/category/get-category`);
      if(data?.sucess)
      {
        setCategories(data?.category);
      }
    }
    catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    getAllCategories();
    getTotalCount();
  },[])


  ///////////////////// Get All Products ////////////////
  const getAllProducts = async()=>{
    try{
      setLoading(true)
      // const {data} = await axios.get(`/product/get-product`);
      const {data} = await axios.get(`/product/product-list/${page}`);
      setLoading(false)
      setProducts(data?.products);
    }
    catch(error){
      setLoading(false)
      console.log(error);
    }
  }



  // Get Total Count
  const getTotalCount = async()=>{
    try{
      const {data} = await axios.get(`/product/product-count`)
      setTotall(data?.total)
    }
    catch(error){
      console.log(error);
    }
  }



  ////////// Load More Button ////////////

  const loadMore = async()=>{
    try{
      setLoading(true)
      const {data} = await axios.get(`/product/product-list/${page}`)
      setLoading(false)
      setProducts([...products, ...data?.products])
    }
    catch(error){
      console.log(error);
      setLoading(false)
    }
  }


  useEffect(()=>{
    if(page===1)
    {
      return
    }
    else{
      loadMore();
    }
  },[page])



  ///// Filter By Categroy //////////

  const handleFilter = (value, id)=>{
    let all = [...checked];
    if(value){
      all.push(id);
    }
    else{
      all = all.filter((c) => c !== id);
    }
    setChecked(all)
  }

  useEffect(()=>{
    if(!checked.length || !radio.length ) getAllProducts();
  },[checked.length,radio.length])


  ////// Filter Products Api Calling ////
  const filterProduct = async()=>
  {
    try{
      const {data} = await axios.post(`/product/product-filters`, {
        checked, 
        radio
      });
      setProducts(data?.products)
    }
    catch(error){
      console.log(error);
    }
  } 


  useEffect(()=>{
    if(checked.length || radio.length) filterProduct();
  },[checked, radio]);
  

  return (
    <Layout title={"Home"}>
      <div className='container-fluid pt-5 pb-5 searchResults'>
            <div className="row">
                <div className="col-md-12">
                    <h1 className="text-center text-white">Home Page</h1>
            
                </div>
            </div>
        </div>


       <div className="container">
        <div className="row">
          <div className="col-md-3 mt-5">
            <h4 className='bg-dark p-2 text-white text-center'>Filter By Category</h4>
            <div className="d-flex flex-column">
              {
                categories?.map((c)=>(
                  <Checkbox style={{fontSize:17}} className="m-0" key={c._id} onChange={(e)=> handleFilter(e.target.checked, c._id)}>
                    {c.name}
                  </Checkbox>
                ))
              }
            </div>

              {/* Price Filter */}
            <h4 className='bg-dark p-2 text-white text-center mt-4'>Filter By Price</h4>
            <div>
              <Radio.Group className='d-flex flex-column' onChange={(e)=>setRadio(e.target.value)}>
                {
                  Prices?.map(p=>(
                    <div key={p._id}>
                      <Radio style={{fontSize:17}} value={p.array}>{p.name}</Radio>
                    </div>
                  ))
                }
              </Radio.Group>
            </div>
            {/* Clear Filter */}
            <div>
              <button className='btn btn-dark w-100 mt-5 mb-5' onClick={()=>window.location.reload()}>Clear All Filters</button>
            </div>
          </div>
          <div className="col-md-9 mt-5">
          {/* {JSON.stringify(radio, null , 4)} */}
            <h5>All Products</h5>
            <div className="d-flex flex-wrap">
            {products?.map((p) => (
              
                <div className="card m-2" style={{ width: "16rem" }}>
                  <img
                    src={`/product/product-photo/${p._id}`}
                    className="card-img-top img img-responsive"
                    alt={p.name}
                    height="300px"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description.substring(0,30)}...</p>
                    <p className="card-text">$ {p.price}</p>
                    <span>
                    <button style={{paddingInline:8, paddingBlock:10}} class="btn btn-dark btn-sm me-2" onClick={()=>navigate(`/product/${p.slug}`)}>More Details</button>
                    <button style={{paddingInline:8, paddingBlock:10}} 
                    class="btn btn-dark btn-sm me-4" 
                    onClick={()=>{
                      setCart([...cart, p])
                      localStorage.setItem("cart", JSON.stringify([...cart, p]))
                      toast.success("Item Added To Cart")  
                    }}
                    >Add To Cart</button>
                    </span>
                  </div>
                </div>
            ))}
            </div>
            <div className='mt-3 mb-3 '>
              {
                products && products.length < total && (
                  <button className='btn btn-dark w-100' 
                  onClick={(e)=>{
                    e.preventDefault();
                    setPage(page+1);
                  }}>
                    {
                      loading ? <div class="d-flex justify-content-center">
                      <div class="spinner-border" role="status">
                      <span class="visually-hidden">Loading...</span>
                      </div>
                      </div> : "Load More Products" 
                    }
                  </button>
                )
              }
            </div>
          </div>
        </div>
       </div>
    </Layout>
  )
}

export default Home