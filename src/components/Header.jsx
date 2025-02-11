import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="bg-light shadow-sm py-3">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between">

          <div className="d-flex align-items-center justify-content-between">
            <h1 className="m-0 text-primary fw-bold me-3">Fashion Mart</h1>
            <nav className="d-flex">
              <a href="/" className="btn btn-outline-primary me-2 px-2">
                Home
              </a>
              <a href="/products" className="btn btn-outline-primary me-2 px-2">
                Products
              </a>
            </nav>
          </div>

          {/* Search Bar */}
          <form className="d-flex mx-3" onSubmit={handleSearch}>
            <div className="input-group">
              <input
                type="search"
                className="form-control"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-outline-primary" type="submit">
                Search
              </button>
            </div>
          </form>

          <div className="d-flex align-items-center">
            <a className="btn btn-success me-2 d-flex align-items-center" href="/cartpage">
              <i className="bi bi-cart me-2">Cart</i>
            </a>
            <a className="btn btn-success d-flex align-items-center" href="/wishlist">
              <i className="bi bi-heart me-2">Wishlist</i>
            </a>
          </div>

    
         
          
        </div>
      </div>
    </header>
  );
};

export default Header;















