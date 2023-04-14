import React, {useState, useEffect} from 'react'
import Layout from '../../components/Layout';
import UserMenu from '../../components/UserMenu';
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
import axios from 'axios';



const Profile = () => {

    const [auth, setAuth] = useAuth() 

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");




     //get user data
    useEffect(() => {
        const { email, name, phone, address } = auth?.user;
        setName(name);
        setPhone(phone);
        setEmail(email);
        setAddress(address);
    }, [auth?.user]);


    /// Form Submit 

    const submitHandler = async(e)=>{
        e.preventDefault();
        try {
            const { data } = await axios.put("/auth/profile", {
              name,
              email,
              password,
              phone,
              address,
            });
            if (data?.error) {
              toast.error(data?.error);
            } else {
              setAuth({ ...auth, user: data?.updatedUser });
              let ls = localStorage.getItem("auth");
              ls = JSON.parse(ls);
              ls.user = data.updatedUser;
              localStorage.setItem("auth", JSON.stringify(ls));
              toast.success("Profile Updated Successfully");
            }
          } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
          }
    }


  return (
    <Layout title={'Your Profile'}>

        <div className='container-fluid pt-5 pb-5 searchResults'>
            <div className="row">
                <div className="col-md-12">
                    <h1 className="text-center text-white">Update Profile</h1>
                </div>
            </div>
        </div>

        <div className="container p-3">
            <div className="row">
                <div className="col-md-3">
                    <UserMenu/>
                </div>
                <div className="col-md-9">
                    <h5>Profile</h5>
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

              disabled

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
          />
        </div>
       
        {/* Submit button */}
        <button type="submit" className="btn btn-dark btn-block mb-4 w-100 btn-lg">
          Update Your Profile
        </button>
      </form>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Profile