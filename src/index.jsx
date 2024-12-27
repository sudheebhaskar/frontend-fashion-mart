import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MenShirts from './pages/MenShirts'
import MenShirtsDetails from './pages/MenShirtsDetails'
import Cart from './pages/Cart'
import TravelBags from './pages/TravelBags'
import TravelBagsDetails from "./pages/TravelBagsDetails"
	
const  router = createBrowserRouter([
	{
		path: "/",
		element: <App />
	},
	{
		path: "/shirts",
		element: <MenShirts />
	},
	{
		path: "/shirts/:shirtID",
		element: <MenShirtsDetails />
	},
	{
		path: "/cart",
		element: <Cart />
	},
	{
		path: "/travelBags",
		element: <TravelBags />
	},
	{
		path: "/travelBags/:bagID",
		element: <TravelBagsDetails />
	}
])



ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)