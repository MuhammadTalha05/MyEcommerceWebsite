import {createContext ,useContext, useState , useEffect} from "react";


const CartContext = createContext();

const CartProvider = ({children})=>{
    const [cart, setCart] = useState([])

    useEffect(()=>{
        let existingCartItems = localStorage.getItem('cart');
        if(existingCartItems){
            setCart(JSON.parse(existingCartItems))
        }
    },[])

    return(
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    )
}


// Custom Hook
const useCart = () => useContext(CartContext); 
// custom hook called useAuth, which uses the useContext hook to access the authentication state stored in the AuthContext. This hook can be used by any component that needs to access the authentication information.

export {useCart, CartProvider}
