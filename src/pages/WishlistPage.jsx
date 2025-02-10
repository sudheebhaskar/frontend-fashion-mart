import React from 'react'
import { useState, useEffect } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState({ products: [] });
  const [loading, setLoading] = useState(false);
  const userId = "temp-user-1"; // Temporary userId until auth is implemented

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://backend-fashion-mart.vercel.app/wishlist/${userId}`);
      const data = await response.json();
      setWishlist(data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      toast.error('Failed to load wishlist. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const response = await fetch('https://backend-fashion-mart.vercel.app/wishlist/remove', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          productId
        }),
      });
      if (response.ok) {
        fetchWishlist();
        toast.success('Product removed from wishlist!');
      } else {
        toast.error('Failed to remove product from wishlist');
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      toast.error('Failed to remove from wishlist. Please try again.');
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="container my-4">
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <main className="container my-4">
        <h2>Your Wishlist</h2>
        {wishlist.products.length === 0 ? (
          <div className="text-center my-5">
            <div className="alert alert-info">
              Your wishlist is empty
              <div className="mt-3">
                <Link to="/products" className="btn btn-primary">
                  Browse Products
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="row">
            {wishlist.products.map((product) => (
              <div className="col-md-4 mb-4" key={product._id}>
                <div className="card h-100">
                  <img
                    src={product.productImage}
                    alt={product.productName}
                    className="card-img-top"
                    style={{ height: '300px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.productName}</h5>
                    <p className="card-text">Brand: {product.productBrandName}</p>
                    <div className="product-price mb-3">
                      {product.productDiscountedPrice ? (
                        <>
                          <span className="text-muted text-decoration-line-through me-2">
                            ₹{product.productPrice}
                          </span>
                          <span className="text-danger fw-bold">
                            ₹{product.productDiscountedPrice}
                          </span>
                        </>
                      ) : (
                        <span className="fw-bold">₹{product.productPrice}</span>
                      )}
                    </div>
                    <div className="d-flex justify-content-between">
                      <Link
                        className="btn btn-primary"
                        to={`/products/${product._id}`}
                      >
                        View Details
                      </Link>
                      <button 
                        className="btn btn-outline-danger"
                        onClick={() => removeFromWishlist(product._id)}
                      >
                        <i className="bi bi-trash me-1"></i>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default WishlistPage;





