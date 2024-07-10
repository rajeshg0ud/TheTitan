import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Header from './Components/Header';
import Home from './Components/Home';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Product from './utills/Product';
import { Store } from './reduxStore/Store';
import {Provider} from 'react-redux';
import Cart from './Components/Cart';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Shipping from './Components/Shipping';
import PlaceOrder from './Components/PlaceOrder';
import MyOrders from './Components/MyOrders';

  function AppLayout(){
    return(
      <div className="bg-white">
      <Provider store={Store} >
      <Header />
      <Outlet />
      <ToastContainer />
      </Provider>
    </div>
    )
  }

  const appRouter=createBrowserRouter([{
    path: '/',
    element: <AppLayout />,
    children: [
    {
      path: '/',
      element: <Home />
    },
    {
    path:'/product',
    element:<Product />
  },
  {
    path:'/Cart',
    element: <Cart />
  },
  {
    path: '/SignIn',
    element: <SignIn />
  },
  {
    path: '/SignUp',
    element: <SignUp />
  },
  {
    path: '/Shipping',
    element: <Shipping />
  },
  {
    path: '/PlaceOrder',
    element: <PlaceOrder />
  },
  {
    path: '/Order-history',
    element: <MyOrders />
  }
]
  }])

 
const root= ReactDOM.createRoot(document.getElementById('root'));

root.render(<RouterProvider router={appRouter} />);



