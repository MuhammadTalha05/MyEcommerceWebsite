import React ,{useState} from "react";
import Layout from "../../components/Layout";
import toast from 'react-hot-toast';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");

    const navigate = useNavigate();
  

    const submitHandler = async(e)=>{
        e.preventDefault();
        try
        {
          const res= await axios.post(`/auth/register`, {name, email, password, phone, address, answer})
          console.log(res);
          if(res.data.sucess)
          {
            toast.success(res.data.message);
            navigate('/login')
          }
          else{
            toast.error(res.data.message)
          }
        }
        catch(error){
          console.log(error);
          toast.error("Something Went Wrong");
        }
    }




  return (
    <Layout title={"Create New Account"}>

        <div className='container-fluid pt-5 pb-5 searchResults'>
            <div className="row">
                <div className="col-md-12">
                    <h1 className="text-center text-white">Signup Page</h1>
                </div>
            </div>
        </div>


    <div className="container pt-5">
        <h1 className="bg-dark p-2 text-white text-center mb-4">Register Your Account</h1>
      <form onSubmit={submitHandler}>
        {/* 2 column grid layout with text inputs for the first and last names */}
        <div className="row mb-4">
          <div className="col">
            <div className="form-outline">
              <label className="form-label" htmlFor="name">
                Name
              </label>
              <input type="text" id="name" name="name" className="form-control"  
              placeholder="Enter Your Name"
              value={name}
              onChange={((e)=>setName(e.target.value))}
              required
              />
            </div>
          </div>
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

        {/*Phone No */}
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="phone">
            Phone No
          </label>
          <input type="text" id="phone" name="phone" className="form-control" 
          placeholder="Enter Your Phone No"
          value={phone}
          onChange={((e)=>setPhone(e.target.value))}
          required
          
          />
        </div>
        {/*Address*/}
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="address">
            Address
          </label>
          <input type="text" id="address" name="address" className="form-control" 
          placeholder="Enter Your Address"
          value={address}
          onChange={((e)=>setAddress(e.target.value))}
          required
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="answer">
            Whrer Do You Live
          </label>
          <input type="text" id="answer" name="answer" className="form-control" 
          placeholder="Please Enter Your Answer"
          value={answer}
          onChange={((e)=>setAnswer(e.target.value))}
          required
          />
        </div>
       
        {/* Submit button */}
        <button type="submit" className="btn btn-dark btn-block mb-4 w-100 btn-lg">
          SIGN UP
        </button>
      </form>
    </div>
    </Layout>
  );
};

export default Register;
