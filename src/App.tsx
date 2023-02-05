import React from 'react';
import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AppBar from './components/AppBar';

const router = createBrowserRouter([
	{ path: '/', element: <HomePage /> },
	{ path: '/login', element: <LoginPage /> },
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
