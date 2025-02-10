import React from 'react';  
import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "../components/Header";
import Footer from "../components/Footer";
import useFetch from "../useFetch";

const Products = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const { data, loading } = useFetch(
    "https://backend-fashion-mart.vercel.app/products"
  );

  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedCategory, setSelectedCategory] = useState({ men: true, women: true });
  const [wishlisted, setWishlisted] = useState({});
  const [sortOrder, setSortOrder] = useState("none");
  const [minRating, setMinRating] = useState(0);

  const handleCategoryChange = (category) => {
    setSelectedCategory((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const handleRatingChange = (rating) => {
    setMinRating(rating);
  };

  const handleClearFilters = () => {
    setSelectedCategory({ men: true, women: true });
    setSortOrder("none");
    setMinRating(0);
    toast.info('All filters have been cleared');
  };

  const handleSizeSelect = (productId, size) => {
    setSelectedSizes(prev => ({...prev, [productId]: size}));
  };

  const toggleWishlist = async (productId) => {
    try {
      const userId = "temp-user-1";
      if (wishlisted[productId]) {
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
          setWishlisted(prev => ({...prev, [productId]: false}));
          toast.success('Product removed from wishlist!');
        }
      } else {
        const response = await fetch('https://backend-fashion-mart.vercel.app/wishlist/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            productId
          }),
        });
        if (response.ok) {
          setWishlisted(prev => ({...prev, [productId]: true}));
          toast.success('Product added to wishlist!');
        }
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
      toast.error('Failed to update wishlist');
    }
  };

  const addToCart = async (productId, availableSizes) => {
    try {
      if (!selectedSizes[productId]) {
        setSelectedSizes(prev => ({...prev, [productId]: availableSizes[0]}));
      }

      const size = selectedSizes[productId] || availableSizes[0];
      const userId = "temp-user-1";

      const response = await fetch('https://backend-fashion-mart.vercel.app/cartpage/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          productId,
          quantity: 1,
          size
        }),
      });

      if (response.ok) {
        toast.success('Product added to cart successfully!');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add product to cart: ' + error.message);
    }
  };

  const filteredProducts = data
    ?.filter((product) => {
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        return (
          product.productName.toLowerCase().includes(searchLower) ||
          product.productBrandName.toLowerCase().includes(searchLower) ||
          product.productCategory.toLowerCase().includes(searchLower)
        );
      }
      return true;
    })
    .filter((product) => {
      if (!product.productUserGender || product.productUserGender.length === 0) {
        return false;
      }
      return (
        (selectedCategory.men && product.productUserGender.includes("Men")) ||
        (selectedCategory.women && product.productUserGender.includes("Women"))
      );
    })
    .filter((product) => product.productRating >= minRating)
    .sort((a, b) => {
      if (sortOrder === "lowToHigh") {
        return a.productPrice - b.productPrice;
      }
      if (sortOrder === "highToLow") {
        return b.productPrice - a.productPrice;
      }
      return 0;
    });

  if (loading) {
    return (
      <>
        <Header />
        <main className="bg-light py-4">
          <div className="container">
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!data || data.length === 0) {
    return (
      <>
        <Header />
        <ToastContainer />
        <main className="bg-light py-4">
          <div className="container">
            <div className="text-center py-4">
              <h3>No products available</h3>
              <p className="text-muted">Please check back later</p>
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
      <main className="bg-light py-4">
        <div className="container">
          <div className="row g-4">
            {/* Filters section */}
            <div className="col-md-3">
              <div className="card shadow-sm">
                <div className="card-body">
                  <div className="mb-4">
                    <h5 className="fw-bold mb-3">Filter by Category</h5>
                    <div className="form-check mb-2">
                      <input
                        type="checkbox"
                        id="categoryMen"
                        className="form-check-input"
                        checked={selectedCategory.men}
                        onChange={() => handleCategoryChange("men")}
                      />
                      <label className="form-check-label" htmlFor="categoryMen">
                        Men
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="categoryWomen"
                        className="form-check-input"
                        checked={selectedCategory.women}
                        onChange={() => handleCategoryChange("women")}
                      />
                      <label className="form-check-label" htmlFor="categoryWomen">
                        Women
                      </label>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h5 className="fw-bold mb-3">Sort by Price</h5>
                    <select
                      className="form-select border-secondary"
                      value={sortOrder}
                      onChange={(e) => handleSortChange(e.target.value)}
                    >
                      <option value="none">None</option>
                      <option value="lowToHigh">Price: Low to High</option>
                      <option value="highToLow">Price: High to Low</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <h5 className="fw-bold mb-3">Filter by Rating</h5>
                    {[4, 3, 2, 1].map((rating) => (
                      <div className="form-check mb-2" key={rating}>
                        <input
                          type="radio"
                          id={`rating${rating}`}
                          name="rating"
                          className="form-check-input"
                          value={rating}
                          checked={minRating === rating}
                          onChange={() => handleRatingChange(rating)}
                        />
                        <label className="form-check-label" htmlFor={`rating${rating}`}>
                          {rating} {rating === 1 ? 'Star' : 'Stars'} & Above
                        </label>
                      </div>
                    ))}
                  </div>

                  <button 
                    className="btn btn-outline-primary w-100"
                    onClick={handleClearFilters}
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Products section */}
            <div className="col-md-9">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="m-0">
                  {searchQuery ? (
                    <>
                      Search results for "{searchQuery}"
                      <small className="text-muted ms-2">
                        ({filteredProducts?.length || 0} products found)
                      </small>
                    </>
                  ) : (
                    `Showing ${filteredProducts?.length || 0} Products`
                  )}
                </h4>
              </div>

              {filteredProducts?.length === 0 ? (
                <div className="text-center py-4">
                  <h5 className="text-muted">
                    No products found{searchQuery ? ` for "${searchQuery}"` : ''}.
                  </h5>
                  <p>Try adjusting your filters or search criteria</p>
                </div>
              ) : (
                <div className="row g-4">
                  {filteredProducts?.map((product) => (
                    <div className="col-md-4" key={product._id}>
                      <div className="card h-100 shadow-sm border-0 position-relative">
                        <button 
                          className={`btn position-absolute end-0 top-0 m-2 rounded-circle p-2 ${
                            wishlisted[product._id] ? 'btn-danger' : 'btn-outline-danger'
                          }`}
                          onClick={() => toggleWishlist(product._id)}
                          style={{ zIndex: 1, width: '40px', height: '40px', lineHeight: '0' }}
                        >
                          ♥
                        </button>

                        <div className="position-relative" style={{ height: '200px', overflow: 'hidden' }}>
                          <img
                            src={product.productImage}
                            alt={product.productName}
                            className="card-img-top h-100 w-100"
                            style={{ objectFit: 'cover' }}
                          />
                        </div>

                        <div className="card-body">
                          <h5 className="card-title mb-1">{product.productName}</h5>
                          <p className="text-muted small mb-2">{product.productBrandName}</p>

                          <div className="mb-2">
                            <span className="text-danger fw-bold">₹{product.productDiscountedPrice || product.productPrice}</span>
                            {product.productDiscountedPrice && (
                              <span className="text-muted text-decoration-line-through ms-2">
                                ₹{product.productPrice}
                              </span>
                            )}
                          </div>

                          <div className="mb-3">
                            <span className="badge bg-warning text-dark me-2">
                              ⭐ {product.productRating}
                            </span>
                            <span className="badge bg-light text-dark">
                              {product.productCategory}
                            </span>
                          </div>

                          <div className="mb-3">
                            <p className="mb-2 small">Select Size:</p>
                            <div className="d-flex gap-1 flex-wrap">
                              {product.productSize?.map((size) => (
                                <button
                                  key={size}
                                  type="button"
                                  className={`btn btn-sm ${
                                    selectedSizes[product._id] === size 
                                      ? 'btn-primary' 
                                      : 'btn-outline-primary'
                                  }`}
                                  onClick={() => handleSizeSelect(product._id, size)}
                                >
                                  {size}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="d-grid gap-2">
                            <button 
                              className="btn btn-primary"
                              onClick={() => addToCart(product._id, product.productSize)}
                            >
                              Add to Cart
                            </button>
                            <Link
                              className="btn btn-outline-primary"
                              to={`/products/${product._id}`}
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Products;


