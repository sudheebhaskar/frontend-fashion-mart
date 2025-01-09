import React from "react";
import useFetch from "../useFetch";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { data, loading, error } = useFetch(
    "https://ff4e841b-09cb-4517-8b1e-23051206f851-00-4c03amsdunal.pike.replit.dev/products"
  );
  const { productID } = useParams();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading product details.</p>;

  const selectedProduct = data?.find((products) => products._id === productID);

  if (!selectedProduct) return <p>Product not found.</p>;

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1 container my-4">
        <div className="row align-items-center g-3">
          {/* Image Section */}
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <img
              src={selectedProduct.productImage}
              alt="Shirt"
              className="img-fluid rounded"
              style={{ maxHeight: "400px" }}
            />
          </div>

          {/* Product Details Section */}
          <div className="col-md-6">
            <h2 className="fw-bold">{selectedProduct.productBrandName}</h2>
            <p className="text-muted">{selectedProduct.productName}</p>
            <p className="text-success">{selectedProduct.productRating}</p>
            <p className="text-muted">{selectedProduct.productDescription}</p>
             <p className="text-muted">{selectedProduct.productReturnPolicy}</p>
            <h3 className="text-primary">
             
              <span className="text-muted text-decoration-line-through">
                 ₹{selectedProduct.productPrice}{" "}
              </span>{" "}
              <span className="text-success">₹{selectedProduct.productDiscountedPrice}{" "}</span>
            </h3>
            <p className="text-muted">inclusive of all taxes</p>
          
            {/* Size Selector */}
            {/* <h5>Select Size</h5>
            <div className="d-flex gap-2 mb-3">
              {[38, 40, 42, 44, 46].map((size, index) => (
                <button
                  key={index}
                  className={`btn btn-outline-dark ${
                    size === 44 ? "disabled" : ""
                  }`}
                  disabled={size === 44}
                >
                  {size}
                </button>
              ))}
            </div> */}

            {/* Add to Bag and Wishlist */}
            <div className="d-flex gap-3">
              <button className="btn btn-primary w-50">ADD TO CART</button>
              <button className="btn btn-outline-dark w-50">WISHLIST</button>
            </div>

            {/* Delivery Options */}
            {/* <div className="mt-4">
              <h5>Delivery Options</h5>
              <input
                type="text"
                placeholder="Enter Pincode"
                className="form-control w-50 mb-2"
              />
              <button className="btn btn-primary">Check</button>
              <p className="text-muted mt-2">
                Enter pincode to check delivery time & Pay on Delivery
                Availability
              </p>
            </div> */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetails;








