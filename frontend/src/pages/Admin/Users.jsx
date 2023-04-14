import React from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu'

const Users = () => {
  return (
    <Layout title={'Users'}>

        <div className='container-fluid pt-5 pb-5 searchResults'>
            <div className="row">
                <div className="col-md-12">
                    <h1 className="text-center text-white">All Users</h1>
                </div>
            </div>
        </div>


        <div className="container p-3">
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu/>
                </div>
                <div className="col-md-9">
                    <h5>Users</h5>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Users