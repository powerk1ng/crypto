import { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"

import Navbar from './pages/Navbar';
import Home from './pages/Home';
import SingleCoinPage from './pages/SingleCoinPage';
import ErrorPage from './pages/ErrorPage';

const App = () => {

  const [coins, setCoins] = useState([]);
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false`

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(json => setCoins(json))
      .catch((error) => console.log(error))
  }, []);


  const Layout = () => {
    return (
      <div className="app">
        <Navbar />
        <Outlet />
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage/>,
      children: [
        {
          path: "/",
          element: <Home data={coins} />
        },
        {
          path: "/coin/:id",
          element: <SingleCoinPage/>
        },
      ]
    },

  ]);


  return (
    <div className='font-rubik bg-[#26272b] min-h-screen'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App 