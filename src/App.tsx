import React from 'react';
import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AppBar from './components/AppBar';
import JobsPage from './pages/JobsPage';
import { NAV_LINKS } from './utils/constants';

const router = createBrowserRouter([
	{ path: NAV_LINKS.HOME, element: <HomePage /> },
	{ path: NAV_LINKS.LOGIN, element: <LoginPage /> },
	{ path: NAV_LINKS.JOBS, element: <JobsPage /> },
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
