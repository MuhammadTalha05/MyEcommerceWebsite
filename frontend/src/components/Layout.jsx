import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Helmet} from "react-helmet";
import { Toaster } from 'react-hot-toast';

const Layout = ({children, title, description, keywords}) => {
  return (
    <div>

        {/* Make Seo Friendly */}
        <Helmet>
              <meta charSet="utf-8" />
              <meta name="description" content={description} />
              <meta name="keywords" content={keywords} />
              <title>{title}</title>
        </Helmet>
        <Header />
        <main style={{minHeight:"79vh"}}>
            {/* {props.children} */}
            <Toaster/>
            {children}
        </main>
        <Footer />
    </div>
  )
}

Layout.defaultProps = {
  title: "Ecommerce Website",
  description: "mern stack project",
  keywords: "mern,react,node,mongodb",
  author: "Muhammad Talha",
}

export default Layout