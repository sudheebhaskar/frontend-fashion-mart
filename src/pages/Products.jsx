import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import useFetch from "../useFetch";
import { Link } from "react-router-dom";

const Products = () => {
  const { data, loading } = useFetch(
    "https://backend-fashion-mart.vercel.app/products"
  );

  

  const [selectedCategory, setSelectedCategory] = useState({ men: true, women: true });
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
  };

  const filteredProducts = data
    ?.filter((product) => {
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
    return <p>Loading...</p>;
  }

  if (!data || data.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <>
      <Header />
      <main>
        <div className="container">
          <div className="row">
            {/* Filters Section */}
            <div className="col-md-3">
              <div className="mb-4">
                <h5>Filter by Category</h5>
                <div className="form-check">
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
                <h5>Sort by Price</h5>
                <select
                  className="form-select"
                  value={sortOrder}
                  onChange={(e) => handleSortChange(e.target.value)}
                >
                  <option value="none">None</option>
                  <option value="lowToHigh">Price: Low to High</option>
                  <option value="highToLow">Price: High to Low</option>
                </select>
              </div>

              <div className="mb-4">
                <h5>Filter by Rating</h5>
                <div className="form-check">
                  <input
                    type="radio"
                    id="rating4"
                    name="rating"
                    className="form-check-input"
                    value="4"
                    checked={minRating === 4}
                    onChange={() => handleRatingChange(4)}
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
                    onChange={() => handleRatingChange(3)}
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
                    onChange={() => handleRatingChange(2)}
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
                    onChange={() => handleRatingChange(1)}
                  />
                  <label className="form-check-label" htmlFor="rating1">
                    1 Star & Above
                  </label>
                </div>
              </div>

              <button className="btn btn-outline-secondary w-100" onClick={handleClearFilters}>
                Clear All Filters
              </button>
            </div>

            <div className="col-md-9">
              {!loading && <h5 className="mb-4">Showing {filteredProducts?.length || 0} Products</h5>}
              <div className="row">
                {filteredProducts?.map((product) => (
                  <div className="col-md-4 mb-4" key={product._id}>
                    <div className="card h-100">
                      <img
                        src={product.productImage}
                        alt={product.productName}
                        className="card-img-top"
                      />
                      <div className="card-body">
                        <h5 className="card-title">{product.productName}</h5>
                        <p className="card-text">Brand: {product.productBrandName}</p>
                        <p className="card-text">Category: {product.productCategory}</p>
                        <p className="card-text">Price: ₹{product.productPrice}</p>
                        {product.productDiscountedPrice && (
                          <p className="card-text">Discounted Price: ₹{product.productDiscountedPrice}</p>
                        )}
                        <p className="card-text">Rating: ⭐{product.productRating}</p>
                        <p className="card-text">Sizes: {product.productSize?.join(", ")}</p>
                        <p className="card-text">Return Policy: {product.productReturnPolicy}</p>
                        <div className="d-flex justify-content-between">
                          <Link
                            className="btn btn-primary"
                            to={`/products/${product._id}`}
                          >
                            View Details
                          </Link>
                          <Link className="btn btn-secondary" to="/cart">
                            Add to Cart
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Products;
