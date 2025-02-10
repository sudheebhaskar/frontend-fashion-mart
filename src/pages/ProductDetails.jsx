import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "../components/Header";
import Footer from "../components/Footer";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);


  // const { data, loading, error } = useFetch(
  //   "https://backend-fashion-mart.vercel.app/products"
  //  );

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("https://eb89fe42-efa8-4e85-8537-c611a7582df7-00-a3eag0wnvdb5.pike.replit.dev/products");
        if (response.ok) {
          const products = await response.json();
          const foundProduct = products.find(p => p._id === productId);
          if (foundProduct) {
            setProduct(foundProduct);
          } else {
            throw new Error('Product not found');
          }
        } else {
          throw new Error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // Check if product is in wishlist
  useEffect(() => {
    const checkWishlist = async () => {
      try {
        const userId = "temp-user-1";
        const response = await fetch(`https://eb89fe42-efa8-4e85-8537-c611a7582df7-00-a3eag0wnvdb5.pike.replit.dev/wishlist/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setIsWishlisted(data.products.some(item => item._id === productId));
        }
      } catch (error) {
        console.error('Error checking wishlist:', error);
        toast.error('Failed to check wishlist status');
      }
    };

    checkWishlist();
  }, [productId]);

  const toggleWishlist = async () => {
    try {
      const userId = "temp-user-1";
      const endpoint = isWishlisted ? 'remove' : 'add';
      const response = await fetch(`https://eb89fe42-efa8-4e85-8537-c611a7582df7-00-a3eag0wnvdb5.pike.replit.dev/wishlist/${endpoint}`, {
        method: isWishlisted ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          productId
        }),
      });

      if (response.ok) {
        setIsWishlisted(!isWishlisted);
        toast.success(`Product ${isWishlisted ? 'removed from' : 'added to'} wishlist!`);
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
      toast.error('Failed to update wishlist');
    }
  };

  const addToCart = async () => {
    try {
      if (!selectedSize) {
        toast.warning('Please select a size first!');
        return;
      }

      const userId = "temp-user-1";
      const response = await fetch('https://eb89fe42-efa8-4e85-8537-c611a7582df7-00-a3eag0wnvdb5.pike.replit.dev/cartpage/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          productId,
          quantity,
          size: selectedSize
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

  if (!product) {
    return (
      <>
        <Header />
        <ToastContainer />
        <main className="bg-light py-4">
          <div className="container">
            <div className="text-center py-4">
              <h3 className="text-danger">Product Not Found</h3>
              <p className="text-muted">The product you're looking for doesn't exist or has been removed.</p>
              <Link to="/products" className="btn btn-primary mt-3">
                Back to Products
              </Link>
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
          <div className="card shadow-sm border-0">
            <div className="row g-0">
              {/* Product Image */}
              <div className="col-md-6">
                <div className="position-relative">
                  <img
                    src={product.productImage}
                    alt={product.productName}
                    className="img-fluid rounded-start"
                    style={{ maxHeight: '500px', width: '100%', objectFit: 'cover' }}
                  />
                  <button 
                    className={`btn position-absolute end-0 top-0 m-3 rounded-circle p-2 ${
                      isWishlisted ? 'btn-danger' : 'btn-outline-danger'
                    }`}
                    onClick={toggleWishlist}
                    style={{ width: '45px', height: '45px', lineHeight: '0' }}
                  >
                    ♥
                  </button>
                </div>
              </div>

              {/* Product Details */}
              <div className="col-md-6">
                <div className="card-body p-4">
                  <nav aria-label="breadcrumb" className="mb-3">
                    <ol className="breadcrumb mb-0">
                      <li className="breadcrumb-item">
                        <Link to="/products" className="text-decoration-none">Products</Link>
                      </li>
                      <li className="breadcrumb-item active">{product.productName}</li>
                    </ol>
                  </nav>

                  <h2 className="card-title mb-2">{product.productName}</h2>
                  <h6 className="text-muted mb-3">{product.productBrandName}</h6>

                  <div className="mb-3">
                    <span className="badge bg-warning text-dark me-2">⭐ {product.productRating}</span>
                    <span className="badge bg-light text-dark">{product.productCategory}</span>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-danger mb-2">
                      ₹{product.productDiscountedPrice || product.productPrice}
                      {product.productDiscountedPrice && (
                        <small className="text-muted text-decoration-line-through ms-2">
                          ₹{product.productPrice}
                        </small>
                      )}
                    </h3>
                  </div>

                  <div className="mb-4">
                    <h6 className="mb-2">Select Size:</h6>
                    <div className="d-flex gap-2 flex-wrap">
                      {product.productSize?.map((size) => (
                        <button
                          key={size}
                          type="button"
                          className={`btn ${
                            selectedSize === size 
                              ? 'btn-primary' 
                              : 'btn-outline-primary'
                          }`}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h6 className="mb-2">Quantity:</h6>
                    <div className="input-group" style={{ width: '150px' }}>
                      <button 
                        className="btn btn-outline-secondary"
                        onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      >
                        -
                      </button>
                      <span className="form-control text-center">{quantity}</span>
                      <button 
                        className="btn btn-outline-secondary"
                        onClick={() => setQuantity(prev => prev + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h6 className="mb-2">Description:</h6>
                    <p className="card-text">{product.productDescription}</p>
                  </div>

                  <div className="mb-4">
                    <h6 className="mb-2">Return Policy:</h6>
                    <p className="card-text">{product.productReturnPolicy}</p>
                  </div>

                  <div className="d-grid gap-2">
                    <button 
                      className="btn btn-primary btn-lg"
                      onClick={addToCart}
                    >
                      Add to Cart
                    </button>
                    <Link 
                      to="/products" 
                      className="btn btn-outline-secondary"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductDetails;









