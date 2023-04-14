import React from 'react'
import Layout from '../components/Layout';
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title={"Contact Us"}>

        <div className='container-fluid pt-5 pb-5 searchResults'>
            <div className="row">
                <div className="col-md-12">
                    <h1 className="text-center text-white">Contact Us</h1>

                </div>
            </div>
        </div>


    <div className='container contactus'>
      <div className="row">
        <div className="col-md-6 left">
          <img
            src="/images/contactus.jpg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-6 right">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            Any query and info about product feel free to call anytime we 24/7
            Avialible
          </p>
          <p className="mt-3">
            <BiMailSend /> : talharashid229@gmail.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 0309-0494920
          </p>
          <p className="mt-3">
            <BiSupport /> : 0320-1461983
          </p>
        </div>
      </div>
      </div>
    </Layout>
  )
}

export default Contact