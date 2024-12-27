import React from "react";
import useFetch from "../useFetch";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";

const TravelBagsDetails = () => {
  const { data, loading, error } = useFetch(
    "https://9d335446-e3c0-4c59-bc08-2ec666aae52c-00-9hvgatjrazml.sisko.replit.dev/travelBags"
  );
  const { bagID } = useParams(); // Extract bagID from URL params

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading bag details.</p>;

  const selectedBag = data?.find((bag) => bag._id === bagID);

  if (!selectedBag) return <p>Bag not found.</p>;

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1 container my-5">
        <div className="row align-items-center g-3">
          {/* Image Section */}
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <img
              src={selectedBag.bagImage}
              alt="Travel Bag"
              className="img-fluid rounded"
              style={{ maxHeight: "400px" }}
            />
          </div>

          {/* Product Details Section */}
          <div className="col-md-6">
            <h2 className="fw-bold">{selectedBag.bagBrand}</h2>
            <p className="text-muted">{selectedBag.bagType}</p>
            <p className="text-success">⭐ {selectedBag.bagRatings} Ratings</p>
            <h3 className="text-primary">
              ₹{selectedBag.bagPrice}{" "}
              <span className="text-muted text-decoration-line-through">
                ₹{selectedBag.originalPrice || "1999"}
              </span>{" "}
              <span className="text-success">
                ({selectedBag.discountPercentage || "71% OFF"})
              </span>
            </h3>
            <p className="text-muted">Inclusive of all taxes</p>
            <p>{selectedBag.bagDescription}</p>
            <p className="text-muted">{selectedBag.returnPolicy}</p>

            {/* Add to Bag and Wishlist */}
            <div className="d-flex gap-3 mb-4">
              <button className="btn btn-primary flex-grow-1">ADD TO BAG</button>
              <button className="btn btn-outline-dark flex-grow-1">WISHLIST</button>
            </div>

            {/* Delivery Options */}
            {/* <div>
              <h5>Delivery Options</h5>
              <div className="d-flex mb-3">
                <input
                  type="text"
                  placeholder="Enter Pincode"
                  className="form-control w-50 me-2"
                />
                <button className="btn btn-primary">Check</button>
              </div>
              <p className="text-muted">
                Enter pincode to check delivery time & Pay on Delivery Availability.
              </p>
            </div> */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TravelBagsDetails;











