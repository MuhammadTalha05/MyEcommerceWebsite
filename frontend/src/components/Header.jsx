import React from "react";
import { NavLink, Link} from "react-router-dom";
import { useAuth } from "../context/auth";
import toast from 'react-hot-toast'
import SearchInput from "./Form/SearchInput";
import useCategory from "../Hooks/useCategory";
import { useCart } from "../context/cart";
import {Badge} from 'antd'

const Header = () => {
  
  const [auth, setAuth] = useAuth();
  const categories = useCategory();

  const [cart] = useCart()

  console.log(categories);

  // Now We want to clear Local store
  // local store clear kne ke le liey hamin page refresh krna parta hi to wo ni krn ahi 
  // direct hi state se clear kr dain ge
  
  const logoutHandler = ()=>{
    setAuth({
      ...auth ,
      user:null,
      token:""
    })
    localStorage.removeItem("auth") // yeh key di hi local tore gi ke ise clear kro
    toast.success("Logout Sucsssfully")
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand" to="/">
              <img src="/images/logo.png" alt="" style={{ width: "20%" }} />
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>

              {/* categories Start */}


              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  {/* <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li> */}
                  {categories?.map((c) => (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {/* categories End */}





              {/* <li className="nav-item">
                <NavLink className="nav-link" to="/categories">
                  Categories
                </NavLink>
              </li> */}
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">
                  Contact
                </NavLink>
              </li>

              {!auth?.user ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register">
                      Register
                    </NavLink>
                  </li>
                </>
              ) : (
                <>

                {/* Dashboard Pe name Llane ke liey */}
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="dropdown-item">
                          Dashboard
                        </NavLink>
                      </li>
                      
                        <NavLink 
                          onClick={logoutHandler}
                          className="dropdown-item"
                          to="/login"
                        >
                          Logout
                        </NavLink>
                      
                    </ul>
                  </li>
                </>
              )}

              <li className="nav-item">
              <Badge count={cart?.length} >
                <NavLink className="nav-link" to="/cart">
                  Cart
                </NavLink>
              </Badge>
                
              </li>
            </ul>
            <SearchInput/>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
