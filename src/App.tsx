import React from 'react';
import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AppBar from './components/AppBar';
import JobsPage from './pages/JobsPage';
import { NAV_LINKS } from './utils/constants';
import BlogPage from './pages/BlogPage';
import ProfilePage from './pages/ProfilePage';
import JobDetailPage from './pages/JobDetailPage';
import ErrorPage from './pages/ErrorPage';
import {
  loadAll as allJobsLoader,
  loadOne as oneJobLoader,
} from './features/job/loaders';

const router = createBrowserRouter([
  { path: NAV_LINKS.HOME, element: <HomePage />, errorElement: <ErrorPage /> },
  { path: NAV_LINKS.LOGIN, element: <LoginPage /> },
  { path: NAV_LINKS.JOBS, element: <JobsPage />, loader: allJobsLoader },
  {
    path: `${NAV_LINKS.JOBS}/:jobId`,
    element: <JobDetailPage />,
    loader: oneJobLoader,
  },
  { path: NAV_LINKS.BLOG, element: <BlogPage /> },
  { path: NAV_LINKS.PROFILE, element: <ProfilePage /> },
]);

function App() {
  return (
    <div>
      <AppBar />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
