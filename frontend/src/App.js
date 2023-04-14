import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/User/Dashboard';
import { PrivateRoute } from './components/Routes/PrivateRoute';
import ForgotPasswrd from './pages/Auth/ForgotPasswrd';
import { AdminRoute } from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import Profile from './pages/User/Profile';
import Orders from './pages/User/Orders';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import CategoryProductDetails from './pages/CategoryProductDetails';
import CartPage from './pages/CartPage';
function App() {
  return (

    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/product/:slug' element={<ProductDetails/>}></Route>
      <Route path="/search" element={<Search/>}></Route>
      <Route path="/categories" element={<Categories/>}></Route>
      <Route path="/category/:slug" element={<CategoryProductDetails/>}></Route>
      <Route path="/cart" element={<CartPage/>}></Route>
      <Route path='/about' element={<About/>}></Route>
      <Route path='/contact' element={<Contact/>}></Route>
      <Route path='/policy' element={<Policy/>}></Route>

      <Route path='/dashboard' element={<PrivateRoute/>}>
        <Route path='user' element={<Dashboard/>}></Route>
        <Route path='user/profile' element={<Profile/>}></Route>
        <Route path='user/orders' element={<Orders/>}></Route>
      </Route>

      <Route path='/dashboard' element={<AdminRoute/>}>
        <Route path='admin' element={<AdminDashboard/>}></Route>
        <Route path='admin/create-category' element={<CreateCategory/>}></Route>
        <Route path='admin/create-product' element={<CreateProduct/>}></Route>
        <Route path='admin/product/:slug' element={<UpdateProduct/>}></Route>
        <Route path='admin/products' element={<Products/>}></Route>
        <Route path='admin/users' element={<Users/>}></Route>
      </Route>

      <Route path='/register' element={<Register/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/forgot-password' element={<ForgotPasswrd/>}></Route>

      <Route path='/*' element={<PageNotFound/>}></Route>
    </Routes>  
    
  );
}

export default App;
