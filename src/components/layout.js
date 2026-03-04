import React from 'react';
import { createHashRouter, RouterProvider, Link, Outlet } from 'react-router-dom';
import './layout.css'; 
import Todaylist from './todaylist';
import WeeklyPlan from './weeklyplan';
import Teamplanning from './teamplanning';

// A simple layout component that renders the navigation and an Outlet
function AppLayout() {
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
        <Outlet />
      </div>
    </div>
  );
}

export default function Layout() {
  const router = createHashRouter([
    {
      element: <AppLayout />,
      children: [
        { path: '/', element: <Todaylist /> },
        { path: '/weeklyplan', element: <WeeklyPlan /> },
        { path: '/Teamplanning', element: <Teamplanning /> }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
}
