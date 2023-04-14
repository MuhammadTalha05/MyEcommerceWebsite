import React from 'react'
import Layout from '../components/Layout'
import { useSearch } from '../context/Search'
import { useNavigate } from 'react-router-dom'

const Search = () => {
    const [values, setValues] = useSearch()
    const navigate = useNavigate()
  return (
    <Layout title={"Search Results"}>

        <div className='container-fluid pt-5 pb-5 searchResults'>
            <div className="row">
                <div className="col-md-12">
                    <h1 className="text-center text-white">All Search Results</h1>
                    <h6 className='text-center text-white'>{values?.results.length < 1 ? "No Products Found" : `Found ${values?.results.length} Results`}</h6>
                </div>
            </div>
        </div>

        <div className="container pt-5 mt-5">
            <div className="row">
                <div className="col-md-12">
                <div className="d-flex flex-wrap">
            {values?.results.map((p) => (
              
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
 
export default Search