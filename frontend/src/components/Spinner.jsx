import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { useNavigate, useLocation } from "react-router-dom";

const Spinner = ({path = "login"}) => {

    const [count, setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation()

    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount((previousValue)=>{
                return --previousValue;
            })
        },1000)
        count === 0 && navigate(`/${path}` , {
            state:location.pathname // yahna se hum jo location hi wo bhi check kr lain ge ke kahan se wo kahan pe gaya 
        })
        return ()=> clearInterval(interval);
    },[count, navigate, location, path])


  return (
    <Layout title={"Loading In Process"}>
    <div className="d-flex flex-column justify-content-center align-items-center" style={{height:"70vh"}}>
    <h1 className="bg-dark p-2 text-white text-center mt-3">Redirecting In {count} Seconds... </h1>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
    </Layout>
  );
};

export default Spinner;
