import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/user/userActions';
import { selectIsAuthenticated,selectUser } from '../../features/user/userSlice';

import bannerImage from '../../assets/img/banner_image_1.svg';
import service1Image from '../../assets/img/services/service-1.svg';
import service2Image from '../../assets/img/services/service-2.svg';
import service3Image from '../../assets/img/services/service-3.svg';
import aboutImage from '../../assets/img/about_frame.png';

export const Navbar = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();
  const user = useSelector(selectUser)

  const handleSignOut = () => {
    dispatch(logout());
  };


  const [navbarOpen, setNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white sticky" data-offset="500">
      <div className="container">
        <Link to="/" className="navbar-brand">Seo<span className="text-primary">Gram.</span></Link>
        <button className="navbar-toggler" type="button" onClick={toggleNavbar}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${navbarOpen ? 'show' : ''}`} id="navbarContent">
          <ul className="navbar-nav ml-auto">
        
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">About</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link">Contact</Link>
            </li>
            <li className="nav-item">
          <p className='mt-3'>{user?.user?.email || "Guest"}!</p>
          
            </li>
            <li className="nav-item bg-primary">
              {isAuthenticated ? (
                <button className="nav-link text-white" onClick={handleSignOut}>Sign Out</button>
              ) : (
                
                <Link to="/signin" className="nav-link text-white">Sign In</Link>
              )}
             
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export const Home = () => {
  return (
    <>
    <div className="container">
      <div className="page-banner home-banner" style={{ backgroundColor: "#2D2B3A" }}>
        <div className="row align-items-center flex-wrap-reverse h-100  " style={{color:"white"}} >
          <div className="col-md-6 py-5 wow fadeInLeft">
            <h1 className="mb-4">Let's Check and Optimize your website!</h1>
            <p className="text-lg text-grey mb-5">Ignite the most powerful growth engine you have ever built for your company</p>
            <a href="" className="btn btn-primary btn-split">Watch Video <div className="fab"><span className="mai-play"></span></div></a>
          </div>
          <div className="col-md-6 py-5 wow zoomIn">
            <div className="img-fluid text-center">
              <img src={bannerImage} alt="" />
            </div>
          </div>
        </div>
        <a href="#about" className="btn-scroll" data-role="smoothscroll"><span className="mai-arrow-down"></span></a>
      </div>
    </div>
    

<div>

    <div className="page-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="card-service wow fadeInUp">
              <div className="header">
                <img src={service1Image} alt="" />
              </div>
              <div className="body">
                <h5 className="text-secondary">SEO Consultancy</h5>
                <p>We help you define your SEO objective & develop a realistic strategy with you</p>
                <a href="service.html" className="btn btn-primary">Read More</a>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card-service wow fadeInUp">
              <div className="header">
                <img src={service2Image} alt="" />
              </div>
              <div className="body">
                <h5 className="text-secondary">Content Marketing</h5>
                <p>We help you define your SEO objective & develop a realistic strategy with you</p>
                <a href="service.html" className="btn btn-primary">Read More</a>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card-service wow fadeInUp">
              <div className="header">
                <img src={service3Image} alt="" />
              </div>
              <div className="body">
                <h5 className="text-secondary">Keyword Research</h5>
                <p>We help you define your SEO objective & develop a realistic strategy with you</p>
                <a href="service.html" className="btn btn-primary">Read More</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
</>

  );
};


export const About = () => (
 <div>

    <div className="page-section" id="about">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 py-3 wow fadeInUp">
            <span className="subhead">About us</span>
            <h2 className="title-section">The number #1 SEO Service Company</h2>
            <div className="divider"></div>
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
            <p>At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren.</p>
            <a href="about.html" className="btn btn-primary mt-3">Read More</a>
          </div>
          <div className="col-lg-6 py-3 wow fadeInRight">
            <div className="img-fluid py-3 text-center">
              <img src={aboutImage} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);


export const Contact = () => (
      <footer className="page-footer bg-image" style={{backgroundImage: "url('../assets/img/world_pattern.svg')"}}>
        <div className="container">
          <div className="row mb-5">
            <div className="col-lg-3 py-3">
              <h3>SEOGram</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero amet, repellendus eius blanditiis in iusto eligendi iure.</p>

              <div className="social-media-button">
                <a href="#"><span className="mai-logo-facebook-f"></span></a>
                <a href="#"><span className="mai-logo-twitter"></span></a>
                <a href="#"><span className="mai-logo-google-plus-g"></span></a>
                <a href="#"><span className="mai-logo-instagram"></span></a>
                <a href="#"><span className="mai-logo-youtube"></span></a>
              </div>
            </div>
            <div className="col-lg-3 py-3">
              <h5>Company</h5>
              <ul className="footer-menu">
                <li><a href="#">About Us</a></li>
                <li><a href="#">Career</a></li>
                <li><a href="#">Advertise</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Help & Support</a></li>
              </ul>
            </div>
            <div className="col-lg-3 py-3">
              <h5>Contact Us</h5>
              <p>203 Fake St. Mountain View, San Francisco, California, USA</p>
              <a href="#" className="footer-link">+00 1122 3344 5566</a>
              <a href="#" className="footer-link">seogram@temporary.com</a>
            </div>
            <div className="col-lg-3 py-3">
              <h5>Newsletter</h5>
              <p>Get updates, news or events on your mail.</p>
              <form action="#">
                <input type="text" className="form-control" placeholder="Enter your email.." />
                <button type="submit" className="btn btn-success btn-block mt-2">Subscribe</button>
              </form>
            </div>
          </div>

          <p className="text-center" id="copyright">Copyright &copy; 2020. This template design and develop by <a href="https://macodeid.com/" target="_blank">MACode ID</a></p>
        </div>
      </footer>)


const Layout = () => {
  return (
    <div>
      <Navbar />
      <Home/>
      <About/>
      <Contact/>
    </div>
  );
};
    

export default Layout;
