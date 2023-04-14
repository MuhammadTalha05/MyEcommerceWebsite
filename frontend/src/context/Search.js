import {createContext ,useContext, useState } from "react";


// Create Context Conetxt Ko crete krne k ley 
// UseConetxt jo context hum ne crete ki ahi us ko use krne ke liey kisi bhi component main

const SearchContext = createContext();

const SearchProvider = ({children})=>{
    const [values, setValues] = useState({
        keyword:"",
        results:[] 
    })

    return(
        <SearchContext.Provider value={[values, setValues]}>
            {children}
        </SearchContext.Provider>
    )
}


// Custom Hook
const useSearch = () => useContext(SearchContext); 
// custom hook called useAuth, which uses the useContext hook to access the authentication state stored in the AuthContext. This hook can be used by any component that needs to access the authentication information.

export {useSearch, SearchProvider}
