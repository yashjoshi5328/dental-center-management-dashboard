import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './globalComponent/Login';
import { createBrowserRouter, Outlet} from 'react-router-dom';
import PatientDashboard from './components/patient/PatientDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import Navbar from './globalComponent/Navbar';
import { RouterProvider } from 'react-router';
import Appointments from './components/patient/Appointments';
import History from './components/patient/History';
import SideNavbar from './globalComponent/SideNavbar';

const App = () => {
  return (
    <div>
      <Navbar/>
      <Outlet/>
    </div>
  )
}
const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'patient',
        element:<PatientDashboard/>,
        children:[
          {
            path:'appointments',
            element:<Appointments/>
          },
          {
            path:'history',
            element:<History/>
          }
        ]
      },
      {
        path:'admin',
        element:<AdminDashboard/>
      }
    ]
  },
  {
    path:'/login',
    element:<Login/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<RouterProvider router={router}/>);
