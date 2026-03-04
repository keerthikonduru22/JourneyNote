import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './layout.css'; 
import Todaylist from './todaylist';
import Weekllyplan from './weekllyplan';
import Teamplanning from './teamplanning';

export default function Layout() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Todaylist />
    },
    {
      path: "/Weekllyplan",
      element: <Weekllyplan />
    },
    {
      path: "/Teamplanning",
      element: <Teamplanning />
    }
  ]);

    return (
      <div>
    <div className='container'>
      <ul className='first'>
        <li><a href="/">Today list</a></li>
        <li><a href="/Weekllyplan">Weekly plan</a></li>
        <li><a href="/Teamplanning">Team planning</a></li>
                </ul>
    </div>
      <div className='main-content'>
        <RouterProvider router={router} />
      </div>
    </div>
  );
}
