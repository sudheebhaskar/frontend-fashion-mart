import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useFetch from "../useFetch";

const TravelBags = () => {
  const { data, loading, error } = useFetch(
    "https://9d335446-e3c0-4c59-bc08-2ec666aae52c-00-9hvgatjrazml.sisko.replit.dev/travelBags"
  );

  
  const [sortOrder, setSortOrder] = useState("default");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [minRating, setMinRating] = useState(0);

  // const filteredBags = data
  //   ?.filter(
  //     (bag) =>
  //       bag.bagPrice >= priceRange[0] &&
  //       bag.bagPrice <= priceRange[1] 
  //      )
  //   ?.sort((a, b) => {
  //     if (sortOrder === "lowToHigh") return a.bagPrice - b.bagPrice;
  //     if (sortOrder === "highToLow") return b.bagPrice - a.bagPrice;
  //     return 0;
  //   });

  const filteredBags = data
  ?.filter(
    (bag) =>
      bag.bagPrice >= priceRange[0] &&
      bag.bagPrice <= priceRange[1] &&
      (minRating === 0 || bag.bagRatings >= minRating) // Add rating filter
  )
  ?.sort((a, b) => {
    if (sortOrder === "lowToHigh") return a.bagPrice - b.bagPrice;
    if (sortOrder === "highToLow") return b.bagPrice - a.bagPrice;
    return 0;
  });


  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header />
      <main>
        <div className="container">
          <div className="row">
            {/* Filters Sidebar */}
            <aside className="col-md-3">
              <h5 className="mt-3">Filters</h5>
              <button
                className="btn btn-outline-secondary btn-sm mb-3"
                onClick={() => {
                  setPriceRange([0, 2000]);
                  setSortOrder("default");
                  setMinRating(0);
                }}
              >
                Clear All
              </button>

              {/* Price Filter */}
              <div className="mb-4">
                <h6>Price Range</h6>
                <input
                  type="range"
                  min="0"
                  max="20000"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="form-range"
                />
                <div className="d-flex justify-content-between">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
              </div>


              {/* Ratings Filter */}
              {/* <div className="mb-4">
                <h6>Rating</h6>
                <div className="form-check">
                  <input
                    type="radio"
                    id="rating4"
                    name="rating"
                    className="form-check-input"
                    value="4"
                    checked={minRating === 4}
                    onChange={() => setMinRating(4)}
                  />
                  <label className="form-check-label" htmlFor="rating4">
                    4 Stars & Above
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    id="rating3"
                    name="rating"
                    className="form-check-input"
                    value="3"
                    checked={minRating === 3}
                    onChange={() => setMinRating(3)}
                  />
                  <label className="form-check-label" htmlFor="rating3">
                    3 Stars & Above
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    id="rating2"
                    name="rating"
                    className="form-check-input"
                    value="2"
                    checked={minRating === 2}
                    onChange={() => setMinRating(2)}
                  />
                  <label className="form-check-label" htmlFor="rating2">
                    2 Stars & Above
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    id="rating1"
                    name="rating"
                    className="form-check-input"
                    value="1"
                    checked={minRating === 1}
                    onChange={() => setMinRating(1)}
                  />
                  <label className="form-check-label" htmlFor="rating1">
                    1 Star & Above
                  </label>
                </div>
              </div>
 */}
              {/* Sort Filter */}
              <div className="mb-4">
                <h6>Sort by Price</h6>
                <select
                  id="sortOrder"
                  className="form-select"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="default">Default</option>
                  <option value="lowToHigh">Price: Low to High</option>
                  <option value="highToLow">Price: High to Low</option>
                </select>
              </div>
            </aside>
            
            <section className="col-md-9">
              <h5 className="mb-4">
                Showing {filteredBags?.length || 0} Products
              </h5>
              <div className="row">
                {filteredBags?.map((bag) => (
                  <div className="col-md-4 mb-4" key={bag._id}>
                    <div className="card h-100">
                      <img
                        src={bag.bagImage}
                        alt={bag.bagBrand}
                        className="card-img-top"
                      />
                      <div className="card-body">
                        <h5 className="card-title">{bag.bagBrand}</h5>
                        <p className="card-text">{bag.bagType}</p>
                        <p className="card-text">
                          Price: ₹{bag.discountedPrice}
                        </p>
                        <p className="card-text">
                          Rating: ⭐{bag.bagRatings}
                        </p>
                        <div className="d-flex justify-content-between">
                          {/* <Link className="btn btn-primary" to={`/travelBags/${bag._id}`}> */}
                          <Link className="btn btn-primary" to={`/travelBags/${bag._id}`}>
                            More info
                          </Link>
                          <Link className="btn btn-secondary" to="/CartPage">Add to Cart</Link>
                            </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default TravelBags;




