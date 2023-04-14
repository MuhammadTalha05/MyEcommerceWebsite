import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/auth'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../Spinner'

export const AdminRoute = () => {
    const [ok , setOk] = useState(false)
    const [auth, setAuth] = useAuth()


    useEffect(()=>{
        // yahna se hum server per req baijh rahry hin get request or sath token bhi baijh rahy hi request main ke tokey verify kre token sahi hi ke ni 
        const authCheck =async()=>{
            // const res = await axios.get('/auth/user-auth', {
            //     headers:{
            //         "Authorization":auth?.token
            //     }
            // }) 

            const res = await axios.get('/auth/admin-auth')  // Globaly Add kr diey hin header ab yahan add krne ki zarorat ni hi

            // Once the response is received from the server, the code checks if the "ok" property of the response's data object is true or false. If it is true, the user is authenticated, and the "ok" variable is set to true using the "setOk" function. If "ok" is false, the user is not authenticated, and the "ok" variable is set to false.
            if(res.data.ok)
            {
                setOk(true);
            }
            else{
                setOk(false);
            }
        }

        // In other words, this code checks if the user has an authentication token. If there is a token, it calls the "authCheck()" function to verify the user's authentication status. If there is no token, "authCheck()" is not called, and the "ok" variable remains false, preventing the user from accessing the protected route.
        if(auth?.token)
        {
            authCheck();
        }

    },[auth?.token])

    return ok ? <Outlet/> : <Spinner path=''/>
}  