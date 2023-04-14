import React, {useState, useEffect} from 'react'
import Layout from '../components/Layout'
import { useAuth } from '../context/auth'
import { useCart } from '../context/cart'
import { useNavigate } from 'react-router-dom'
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios'
import { toast } from 'react-hot-toast'




const CartPage = () => {
    const [cart , setCart] = useCart();
    const [auth, setAuth] = useAuth();
    const [clientToken, setClientToken] = useState("")
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();



    /////// Price Calculation ///////////

    const totalPrice = ()=>{
        try{
            let total = 0;
            cart?.map((item)=>{
                total = total + item.price; 
            })
            return total.toLocaleString("en-US", {
                style:"currency",
                currency: "USD",
            })
        }
        catch(error){
            console.log(error);
        }
    }





    ///// Remove Cart Function ///

    const removecartItem = (pid)=>{
        try{
            let myCart = [...cart];
            let index = myCart.findIndex(item => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart)
            localStorage.setItem('cart', JSON.stringify(myCart))
        }
        catch(error){
            console.log(error);
        }
    }


    // /get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);



  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };


  return (
    <Layout title={"Add To Cart"}>
    {/* banner */}
    <div className='container-fluid pt-5 pb-5 searchResults'>
            <div className="row">
                <div className="col-md-12">
                    <h3 className='text-center text-white'>
                        {!auth?.user? "Hello Guest" : `Hello  ${auth?.token && auth?.user?.name}`}
                    </h3>

                    <h6 className="text-center text-white">
                        {cart?.length ? `You Have ${cart.length} items in your cart ${auth?.token ? "" : "please login to checkout !"}` : " Your Cart Is Empty"}
                    </h6>
                </div>
            </div>
        </div>

        {/* Cart Start */}
        <div className="container pt-5 pb-5">
        {/* <h3>Cart Details</h3> */}
        <div className="row d-flex justify-content-between">
            <div className="col-md-7">
                {
                    cart?.map(p =>(
                        <div className="row card flex-row align-items-center mb-3">
                            <div className="col-md-2" style={{paddingBlock:20}}>
                            <img
                                src={`/product/product-photo/${p._id}`}
                                className="card-img-top img img-responsive"
                                alt={p.name}
                                style={{borderRadius:4, height:80}}
                                
                            />
                            </div>
                            <div className="col-md-6">
                                <h4 style={{marginBlock:10}}>{p.name}</h4>
                                <p style={{margin:0}}>{p.description}</p>
                                <p>{p.price}$</p>
                            </div>

                            <div className="col-md-4">
                                <button className='btn btn-dark' onClick={()=> removecartItem(p._id)}>Delete From Cart</button>
                            </div>
                        </div>
                    ))
                }
            </div>

            {/* Cart Price  */}
            <div className='col-md-4'>
                <h2>Cart Summary</h2>
                <hr />
                <h4>Total: {totalPrice()}</h4>

                <div className="mt-2">
                {!clientToken || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <button
                      className="btn btn-dark w-100"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>

            </div>
        </div>
        </div>

    </Layout>
  )
}

export default CartPage