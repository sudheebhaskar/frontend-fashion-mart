const Footer = () => (
  <footer className="bg-dark text-light">
    <div className="container py-4">
      <p> &copy; 2024 || Fashion Mart. All rights reserved</p>
    </div>
  </footer>
)

export default Footer;



// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import { useState } from "react";
// import useFetch from "../useFetch";
// import { Link } from "react-router-dom";

// const Products = () => {
//   const { data, loading } = useFetch(
//     "https://f15320cd-6bed-43c5-890a-244670f65290-00-2lor9opsgx4po.pike.replit.dev/products"
//   );

//   const [selectedCategory, setSelectedCategory] = useState({ men: true, women: true });

//   const handleCategoryChange = (category) => {
//     setSelectedCategory((prev) => ({ ...prev, [category]: !prev[category] }));
//   };

//   const filteredProducts = data?.filter((product) => {
//     if (!product.productUserGender || product.productUserGender.length === 0) {
//       return false;
//     }

//     return (
//       (selectedCategory.men && product.productUserGender.includes("Men")) ||
//       (selectedCategory.women && product.productUserGender.includes("Women"))
//     );
//   });

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (!data || data.length === 0) {
//     return <p>No products available.</p>;
//   }

//   return (
//     <>
//       <Header />
//       <main>
//         <div className="container">
//           <div className="mb-4">
//             <h5>Filter by Category</h5>
//             <div className="form-check">
//               <input
//                 type="checkbox"
//                 id="categoryMen"
//                 className="form-check-input"
//                 checked={selectedCategory.men}
//                 onChange={() => handleCategoryChange("men")}
//               />
//               <label className="form-check-label" htmlFor="categoryMen">
//                 Men
//               </label>
//             </div>
//             <div className="form-check">
//               <input
//                 type="checkbox"
//                 id="categoryWomen"
//                 className="form-check-input"
//                 checked={selectedCategory.women}
//                 onChange={() => handleCategoryChange("women")}
//               />
//               <label className="form-check-label" htmlFor="categoryWomen">
//                 Women
//               </label>
//             </div>
//           </div>
//           {!loading && <h5 className="mb-4">Showing {filteredProducts?.length || 0} Products</h5>}
//           <div className="row">
//             {filteredProducts?.map((product) => (
//               <div className="col-md-4 mb-4" key={product._id}>
//                 <div className="card h-100">
//                   <img
//                     src={product.productImage}
//                     alt={product.productName}
//                     className="card-img-top"
//                   />
//                   <div className="card-body">
//                     <h5 className="card-title">{product.productName}</h5>
//                     <p className="card-text">Brand: {product.productBrandName}</p>
//                     <p className="card-text">Category: {product.productCategory}</p>
//                     <p className="card-text">Price: ₹{product.productPrice}</p>
//                     {product.productDiscountedPrice && (
//                       <p className="card-text">Discounted Price: ₹{product.productDiscountedPrice}</p>
//                     )}
//                     <p className="card-text">Rating: ⭐{product.productRating}</p>
//                     <p className="card-text">Sizes: {product.productSize?.join(", ")}</p>
//                     <p className="card-text">Return Policy: {product.productReturnPolicy}</p>
//                     <div className="d-flex justify-content-between">
//                       <Link
//                         className="btn btn-primary"
//                         to={`/products/${product._id}`}
//                       >
//                         More info
//                       </Link>
//                       <Link className="btn btn-secondary" to="/CartPage">
//                         Add to Cart
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </>
//   );
// };

// export default Products;
