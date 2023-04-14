
import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout';
import AdminMenu from '../../components/AdminMenu';
import axios from "axios";
import toast from "react-hot-toast";
import {Link} from 'react-router-dom';


const Products = () => {

    const [products, setProducts] = useState([]);

    const getAllProducts = async () => {
        try {
          const res = await axios.get("/product/get-product");
          setProducts(res.data.products);
        } catch (error) {
          console.log(error);
          toast.error("Something Went Wrong");
        }
      };


      useEffect(()=>{
        getAllProducts();
      },[])


  return (
    <Layout title={"All Products"}>

        <div className='container-fluid pt-5 pb-5 searchResults'>
            <div className="row">
                <div className="col-md-12">
                    <h1 className="text-center text-white">All Products</h1>
                </div>
            </div>
        </div>

        <div className='container p-3'>
            <div className='row'>
                <div className='col-md-3'>
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h5>Products</h5>
                    <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/product/${p.slug}`}
                className="product-link"
              >
                <div className="card m-2" style={{ width: "16rem" }}>
                  <img
                    src={`/product/product-photo/${p._id}`}
                    className="card-img-top img img-responsive"
                    alt={p.name}
                    height="300px"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Products