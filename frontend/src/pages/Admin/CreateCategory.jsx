import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout';
import AdminMenu from '../../components/AdminMenu';
import axios from 'axios';
import toast from "react-hot-toast";
import CategoryForm from '../../components/Form/CategoryForm';
import { Button, Modal } from 'antd';


const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const res = await axios.post('/category/create-category', {name})
        if(res.data?.sucess)
        {
            toast.success(res.data?.message);
            getAllCategories();
            setName("")
            
        }
        else{
            toast.error(res.data?.message);
        }

    }


    // Category Update
    const handleUpdate = async (e)=>{
        e.preventDefault();
        try {
            const res = await axios.put(`/category/update-category/${selected._id}`,{ name: updatedName }
            );
            if (res.data?.sucess) {
              toast.success(`${updatedName} is updated`);
              setSelected(null);
              setUpdatedName("");
              setVisible(false);
              getAllCategories();
            } else {
              toast.error(res.data?.message);
            }
          } catch (error) {
            console.log(error);
          }
    }




     // Category Delete
     const handleDelete = async (pId)=>{
        try {
            const res = await axios.delete(`/category/delete-category/${pId}`
            );
            if (res.data?.sucess) {
              toast.success(res.data?.message);
              setVisible(false);
              getAllCategories();
            } else {
              toast.error(res.data?.message);
            }
          } catch (error) {
            console.log(error);
          }
    }

    // Get All Cetegories
    
    const getAllCategories = async()=>{
        try{
            const res = await axios.get('/category/get-category');
            if(res.data?.sucess)
            {
                setCategories(res.data?.category);
            }
        }
        catch(error){
            console.log(error);
            toast.error("Something went wrong in getting categories");
        }
        
    }
    useEffect(()=>{
        getAllCategories()
    },[])
  return (
    <Layout title={'Create Categories'}>

        <div className='container-fluid pt-5 pb-5 searchResults'>
            <div className="row">
                <div className="col-md-12">
                    <h1 className="text-center text-white">Create Categories</h1>
                </div>
            </div>
        </div>

        <div className="container p-3">
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu/>
                </div>
                <div className="col-md-9 ps-4">
                    <h5>Manage Categories</h5>
                    <div>
                        <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
                    </div>
                    <div>
                        <table className="table mt-3">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                categories.map((val)=>{
                                    return (
                                      <>
                                        <tr>
                                          <td>{val.name}</td>
                                          <td>
                                            <button
                                              className="btn btn-dark ms-2"
                                              onClick={() => {
                                                setVisible(true);
                                                setUpdatedName(val.name); 
                                                setSelected(val);
                                              }}
                                            >
                                              Edit
                                            </button>
                                            <button
                                              className="btn btn-dark ms-2"
                                              onClick={() => handleDelete(val._id)}
                                              >
                                              Delete
                                            </button>
                                          </td>
                                        </tr>
                                      </>
                                    );
                                })
                            }
                        </tbody>
                        </table>
                    </div>
                    <Modal
                        onCancel={() => setVisible(false)}
                        footer={null}
                        visible={visible}
                        >
                        <CategoryForm
                            value={updatedName}
                            setValue={setUpdatedName}
                            handleSubmit={handleUpdate}
                        />
                    </Modal>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default CreateCategory