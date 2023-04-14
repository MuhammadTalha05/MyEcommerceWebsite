import axios from 'axios'
import React, {useState, useEffect} from 'react'
import Layout from '../../components/Layout'
import UserMenu from '../../components/UserMenu'
import { useAuth } from '../../context/auth'
import moment from "moment";


const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();


  // Get Oders
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);


  return (
    <Layout title={'Your Orders'}>

        <div className='container-fluid pt-5 pb-5 searchResults'>
            <div className="row">
                <div className="col-md-12">
                    <h1 className="text-center text-white">Order Page</h1>
                </div>
            </div>
        </div>

        <div className="container p-3">
            <div className="row">
                <div className="col-md-3">
                    <UserMenu/>
                </div>
                <div className="col-md-9">
                    <h5>Orders</h5>
                    {orders?.map((o, i) => {
              return (
                <div className="border shadow mb-5">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createAt).fromNow()}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {o?.products?.map((p, i) => (
                      <div className="row mb-2 p-3 card flex-row " key={p._id}>
                        <div className="col-md-2">
                          <img
                            src={`/product/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            width="100px"
                            height={"100px"}
                          />
                        </div>
                        <div className="col-md-8">
                            <h4 style={{marginBlock:10}}>{p.name}</h4>
                            <p style={{margin:0}}>{p.description}</p>
                            <p>{p.price}$</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Orders