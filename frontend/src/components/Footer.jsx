import React from 'react'

const Footer = () => {
  return (
    <div>
        <footer className="footer-area bg-dark">
            <div className="container py-3">
              <div className="row">
                <div className="col-lg-12">
                  <h5 className='text-white mb-0 text-center'>&copy; {new Date().getFullYear()} All Right Reserved</h5>
                </div>
              </div>
            </div>
        </footer>
    </div>
  )
}

export default Footer