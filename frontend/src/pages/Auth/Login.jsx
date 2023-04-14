import React ,{useState} from "react";
import Layout from "../../components/Layout";
import toast from 'react-hot-toast';
import axios from 'axios';
import {useNavigate, useLocation} from 'react-router-dom';
import { useAuth } from "../../context/auth";
import {NavLink} from 'react-router-dom';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [auth, setAuth] = useAuth();


  const navigate = useNavigate();
  const location = useLocation();
  

  const submitHandler = async(e)=>{
      e.preventDefault();
      try
      {
        const res= await axios.post(`/auth/login`, {email, password})
        console.log(res);
        if(res.data.sucess)
        {
          toast.success(res.data.message);
          setAuth({
            ...auth,
            user: res.data.user,
            token:res.data.token
          })
          localStorage.setItem("auth", JSON.stringify(res.data))
          navigate(location.state || '/') // yeh location ke liey ager to isi or page pe tha to login ke bad wohi page open hoga other wise home page
        }
        else{
          toast.error(res.data.message)
          toast.error("Something Went Wrong");
        }
      }
      catch(error){
        console.log(error);
      }
  }




  return (
    <Layout title={"Login To Your Account"}>

      <div className='container-fluid pt-5 pb-5 searchResults'>
            <div className="row">
                <div className="col-md-12">
                    <h1 className="text-center text-white">Login Page</h1>
                </div>
            </div>
        </div>

    <div className="container pt-5">
        <h1 className="bg-dark p-2 text-white text-center mb-4">Login Your Account</h1>
      <form onSubmit={submitHandler}>
        {/* 2 column grid layout with text inputs for the first and last names */}
        <div className="row mb-4">
        
          <div className="col">
            <div className="form-outline">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input type="email" id="email" name="email" className="form-control" 
              placeholder="Enter Your Email"
              value={email}
              onChange={((e)=>setEmail(e.target.value))}
              required

              />
            </div>
          </div>
        </div>

        {/* Password input */}
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input type="password" id="password" className="form-control" 
          placeholder="Enter Your Password"
          value={password}
          onChange={((e)=>setPassword(e.target.value))}
          required
          />
        </div>
       
        {/* Submit button */}
        <button type="submit" className="btn btn-dark btn-block mb-4 w-100 btn-lg">
          Login
        </button>

        {/* forgot Password */}
        <NavLink style={{color:"black", fontSize:"18px" , display: "block", textAlign:"right", fontWeight:600}} to={'/forgot-password'}>Forgot Your Password ?</NavLink>
      </form>
    </div>
    </Layout>
  )
}

export default Login