import React from 'react'
import Layout from '../components/Layout'

const About = () => {
  return (
    <Layout title={"About Us"}>

        <div className='container-fluid pt-5 pb-5 searchResults'>
            <div className="row">
                <div className="col-md-12">
                    <h1 className="text-center text-white">About Us</h1>
                </div>
            </div>
        </div>

    <div className='container aboutus'>
      <div className="row  ">
        <div className="col-md-5 ">
          <img
            src="/images/aboutus.jpg"
            alt="aboutus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-7 right">
          <h1 className="bg-dark p-2 text-white text-center">ABOUT US</h1>
          <p className="text-justify mt-2">
          Welcome to our online store! We are a team of passionate individuals who are committed to providing our customers with a one-stop-shop for all their needs. Our store is designed to offer a seamless shopping experience, with a vast array of high-quality products available at competitive prices.
          </p>
          <p className="text-justify mt-2">
          At our online store, we are dedicated to sourcing the best products from trusted suppliers, ensuring that our customers only receive items of the highest quality. 
          </p>
        </div>
      </div>
    </div>  
    </Layout>
  )
}

export default About