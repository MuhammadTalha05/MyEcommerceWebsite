import React ,{useState} from "react";
import Layout from "../../components/Layout";
import toast from 'react-hot-toast';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


const ForgotPasswrd = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");


  const navigate = useNavigate();
  

  const submitHandler = async(e)=>{
      e.preventDefault();
      try
      {
        const res= await axios.post(`/auth/forgot-password`, {email, newPassword, answer})
        console.log(res);
        if(res.data.sucess)
        {
          toast.success(res.data.message);
          navigate('/login')
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
    <Layout title={"Reset Password"}>

        <div className='container-fluid pt-5 pb-5 searchResults'>
            <div className="row">
                <div className="col-md-12">
                    <h1 className="text-center text-white">Forgot Password</h1>
                </div>
            </div>
        </div>


        <div className="container pt-5">
        <h1 className="bg-dark p-2 text-white text-center mb-4">Change Your Password</h1>
      <form onSubmit={submitHandler}>
        {/* 2 column grid layout with text inputs for the first and last names */}
        <div className="row mb-4">
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

        {/* Secret Answer Input */}
        <div className="row mb-4">
            <div className="form-outline">
              <label className="form-label" htmlFor="answer">
                Where Do You Live
              </label>
              <input type="text" id="answer" name="answer" className="form-control" 
              placeholder="Enter Your Answer"
              value={answer}
              onChange={((e)=>setAnswer(e.target.value))}
              required

              />
            </div>
        </div>


        {/* Password input */}
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="newPassword">
            Password
          </label>
          <input type="password" id="newPassword" name="newPassword" className="form-control" 
          placeholder="Enter New Password"
          value={newPassword}
          onChange={((e)=>setNewPassword(e.target.value))}
          required
          />
        </div>
       
        {/* Submit button */}
        <button type="submit" className="btn btn-dark btn-block mb-4 w-100 btn-lg">
          Reset Your Password
        </button>
        
      </form>
    </div>
    </Layout>
  )
}

export default ForgotPasswrd