import React from 'react'
import Layout from '../components/Layout'
import useCategory from '../Hooks/useCategory'

const Categories = () => {
    const categories = useCategory();
  return (
    <Layout title={"All Categories"}>
         {/* banner */}
         <div className='container-fluid pt-5 pb-5 searchResults'>
            <div className="row">
                <div className="col-md-12">
                    <h1 className="text-center text-white">All Categories</h1>
                </div>
            </div>
        </div>

    </Layout>
  )
}

export default Categories