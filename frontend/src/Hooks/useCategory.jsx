import React, {useState, useEffect} from 'react'
import axios from 'axios'

const useCategory = () => {
    const [categories, setCategories] = useState([])


    /// get All Categories

    const getCategories = async()=>{
        try{
            const {data} = await axios.get(`/category/get-category`);
            setCategories(data?.category)
        }
        catch(error)
        {
            console.log(error);
        }
    }

    useEffect(()=>{
        getCategories();
    },[])

  return categories;
}

export default useCategory