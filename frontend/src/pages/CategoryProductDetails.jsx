import React, {useState, useEffect} from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const CategoryProductDetails = () => {
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState([])
    const navigate = useNavigate()

    const params = useParams()


    useEffect(() => {
    if (params?.slug) getPrductsByCat();
    }, [params?.slug]);

    /// Get Product by Category 
    const getPrductsByCat = async() => {
    try {
      const { data } = await axios.get(`/product/product-category/${params.slug}`);
      setProducts(data?.products);
      setCategory(data.category);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Layout title={category.name}>
         {/* banner */}
         <div className='container-fluid pt-5 pb-5 searchResults'>
            <div className="row">
                <div className="col-md-12">
                    <h1 className="text-center text-white">{category.name}</h1>
                    <h6 className="text-center text-white">{products.length} Products Found</h6>
                </div>
            </div>
        </div>

        <div className="container pt-5 mt-3 mb-5">
            <div className="row">
                <div className="col-md-12">
                <div className="d-flex flex-wrap">
            {products.map((p) => (
              
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

export default CategoryProductDetails