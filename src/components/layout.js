import React from 'react';
import { createHashRouter, RouterProvider, Link } from 'react-router-dom';
import './layout.css'; 
import Todaylist from './todaylist';
import WeeklyPlan from './weeklyplan';
import Teamplanning from './teamplanning';

export default function Layout() {
  const router = createHashRouter([
    {
      path: "/",
      element: <Todaylist />
    },
    {
      path: "/weeklyplan",
      element: <WeeklyPlan />
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
        <li><Link to="/">Today list</Link></li>
        <li><Link to="/weeklyplan">Weekly plan</Link></li>
        <li><Link to="/Teamplanning">Team planning</Link></li>
                </ul>
    </div>
      <div className='main-content'>
        <RouterProvider router={router} />
      </div>
    </div>
  );
}
