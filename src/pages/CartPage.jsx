import React from 'react'
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "../components/Header";
import Footer from "../components/Footer";

const CartPage = () => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);
  const userId = "temp-user-1"; // Temporary userId, can be updated when auth is added

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://backend-fashion-mart.vercel.app/cartpage/${userId}`);
      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error('Error fetching cart:', error);
      toast.error('Failed to load cart. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity, size) => {
    try {
      const response = await fetch('https://backend-fashion-mart.vercel.app/cartpage/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          productId,
          quantity,
          size
        }),
      });
      const updatedCart = await response.json();
      setCart(updatedCart);
      toast.success('Cart updated successfully');
    } catch (error) {
      console.error('Error updating cart:', error);
      toast.error('Failed to update cart. Please try again.');
    }
  };

  const removeFromCart = async (productId, size) => {
    try {
      const response = await fetch('https://backend-fashion-mart.vercel.app/cartpage/remove', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          productId,
          size
        }),
      });
      const updatedCart = await response.json();
      setCart(updatedCart);
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove item. Please try again.');
    }
  };

  const calculateTotal = () => {
    return cart.items.reduce((total, item) => {
      const price = item.product.productDiscountedPrice || item.product.productPrice;
      return total + (price * item.quantity);
    }, 0);
  };

  if (loading) {
    return <p>Loading cart...</p>;
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
        <h2>Your Shopping Cart</h2>
        {cart.items.length === 0 ? (
          <div className="text-center my-5">
            <h4>Your cart is empty</h4>
            <p>Add some items to your cart to get started!</p>
          </div>
        ) : (
          <>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Size</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.items.map((item) => (
                    <tr key={`${item.product._id}-${item.size}`}>
                      <td>
                        <div className="d-flex align-items-center">
                          <img 
                            src={item.product.productImage} 
                            alt={item.product.productName} 
                            style={{ width: '50px', marginRight: '10px' }}
                          />
                          <div>
                            <h6 className="mb-0">{item.product.productName}</h6>
                            <small>{item.product.productBrandName}</small>
                          </div>
                        </div>
                      </td>
                      <td>{item.size}</td>
                      <td>₹{item.product.productDiscountedPrice || item.product.productPrice}</td>
                      <td>
                        <div className="input-group" style={{ width: '120px' }}>
                          <button 
                            className="btn btn-outline-secondary"
                            onClick={() => updateQuantity(item.product._id, item.quantity - 1, item.size)}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="form-control text-center">{item.quantity}</span>
                          <button 
                            className="btn btn-outline-secondary"
                            onClick={() => updateQuantity(item.product._id, item.quantity + 1, item.size)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>₹{(item.product.productDiscountedPrice || item.product.productPrice) * item.quantity}</td>
                      <td>
                        <button 
                          className="btn btn-danger btn-sm"
                          onClick={() => removeFromCart(item.product._id, item.size)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="d-flex justify-content-end">
              <div className="card" style={{ width: '300px' }}>
                <div className="card-body">
                  <h5 className="card-title">Cart Total</h5>
                  <p className="card-text">Total: ₹{calculateTotal()}</p>
                  <button 
                    className="btn btn-primary w-100"
                    onClick={() => toast.info('Checkout functionality will be added')}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
};

export default CartPage;







