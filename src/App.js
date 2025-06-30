import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './globalComponent/Login';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import PatientDashboard from './components/patient/PatientDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import Patients from './components/admin/Patients';
import Incidents from './components/admin/Incidents';
import CalendarView from './components/admin/CalendarView';
import AdminLayout from './components/admin/AdminLayout';
import Navbar from './globalComponent/Navbar';
import NotFound from './globalComponent/NotFound';
import { RouterProvider } from 'react-router';
import { getUserFromLocalStorage, isAdmin, isPatient } from './utils/auth';
import { RootRedirect, RequireAdmin, RequirePatient } from './utils/RouteGuards';

const App = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <RootRedirect />,
      },
      {
        path: 'patient',
        element: <RequirePatient><PatientDashboard /></RequirePatient>,
      },
      {
        path: 'admin',
        element: <RequireAdmin><AdminLayout /></RequireAdmin>,
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: 'patients', element: <Patients /> },
          { path: 'incidents', element: <Incidents /> },
          { path: 'calendar-view', element: <CalendarView /> },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<RouterProvider router={router} />);
