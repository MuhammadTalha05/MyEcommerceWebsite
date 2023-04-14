import React from 'react'
import Layout from '../../components/Layout'
import { useAuth } from '../../context/auth'
import AdminMenu from '../../components/AdminMenu'

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Admin Dashboard"}>

    <div className='container-fluid pt-5 pb-5 searchResults'>
            <div className="row">
                <div className="col-md-12">
                    <h1 className="text-center text-white">Admin Dashboard</h1>
                </div>
            </div>
        </div>

        <div className="container p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 pt-4">
            <div className="card w-100 p-3">
              <h5><strong> Name : </strong> {auth?.user?.name}</h5>
              <h5><strong> Email Address : </strong> {auth?.user?.email}</h5>
              <h5><strong> Contact Details : </strong> {auth?.user?.phone}</h5>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard