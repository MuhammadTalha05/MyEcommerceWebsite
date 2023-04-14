import {createContext ,useContext, useState , useEffect} from "react";
import axios from 'axios';


// Create Context Conetxt Ko crete krne k ley 
// UseConetxt jo context hum ne crete ki ahi us ko use krne ke liey kisi bhi component main

const AuthContext = createContext();

const AuthProvider = ({children})=>{
    const [auth, setAuth] = useState({
        user:null,
        token:""
    })


    // Default Axios
    // Now we dont need to add headers on our auth-user 
    axios.defaults.headers.common['Authorization'] = auth?.token

    useEffect(()=>{
        const data = localStorage.getItem('auth') // auth varivle wich is store in local storage key
        if(data){
            const parseData = JSON.parse(data);
            setAuth({
                ...auth,
                user: parseData.user,
                token:parseData.token,
            })
        }
        // eslint-disable-next-line
    },[])
    return(
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}


// Custom Hook
const useAuth = () => useContext(AuthContext); 
// custom hook called useAuth, which uses the useContext hook to access the authentication state stored in the AuthContext. This hook can be used by any component that needs to access the authentication information.

export {useAuth, AuthProvider}
