import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useFetch from "../useFetch"; // Import your custom hook

const CartPage = () => {
  const { data: cartItems, loading, error } = useFetch(
    "https://9d335446-e3c0-4c59-bc08-2ec666aae52c-00-9hvgatjrazml.sisko.replit.dev/travelBags"
  );

  const [localCartItems, setLocalCartItems] = useState([]);

  // Sync fetched data with local state when `cartItems` is available
  React.useEffect(() => {
    if (cartItems) {
      setLocalCartItems(cartItems);
    }
  }, [cartItems]);

  const handleQuantityChange = (id, increment) => {
    setLocalCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + increment),
            }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setLocalCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const calculateTotal = () =>
    localCartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading cart data.</div>;

  return (
    <div className="container mt-5">
      <h3>Shopping Cart</h3>
      <div className="row">
        <div className="col-md-8">
          {localCartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            localCartItems.map((item) => (
              <div
                className="d-flex align-items-center border p-3 mb-3"
                key={item.id}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="img-thumbnail"
                  style={{ width: "100px", height: "100px", objectFit: "cover" }}
                />
                <div className="ms-3 flex-grow-1">
                  <h5>{item.name}</h5>
                  <p>Price: ₹{item.price}</p>
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => handleQuantityChange(item.id, -1)}
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => handleQuantityChange(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
        <div className="col-md-4">
          <div className="card p-3">
            <h5>Summary</h5>
            <p>
              Total Items:{" "}
              {localCartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </p>
            <p>Total Price: ₹{calculateTotal()}</p>
            <button className="btn btn-primary w-100">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

























// import React from "react";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import useFetch from "../useFetch";

// const Cart = ({ cart }) => {

  

  
//   return (
//     <>
//     <Header />
//       <main>
//     <div className="container mt-4">
//       <h5>Cart</h5>
//       {cart.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <ul className="list-group">
//           {cart.map((item) => (
//             <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
//               <div>
//                 <strong>{item.shirtName}</strong>
//                 <p className="m-0">Quantity: {item.quantity}</p>
//                 <p className="m-0">Price: ₹{item.shirtPrice * item.quantity}</p>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//         </main>
//       <Footer />
//       </>
//   );
// };

// export default Cart;












// // export default Cart;
