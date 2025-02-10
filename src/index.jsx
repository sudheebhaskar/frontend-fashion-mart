import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import CartPage from './pages/CartPage'
import WishlistPage from './pages/WishlistPage'

const  router = createBrowserRouter([
	{
		path: "/",
		element: <App />
	},
	{
		path: "/products",
		element: <Products />
	},
	{
		path: "/products/:productId",
		element: <ProductDetails />
	},
	{
		path: "/cartpage",
		element: <CartPage />
	},
	{
		path: "/wishlist",
		element: <WishlistPage />
	}
])



ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)