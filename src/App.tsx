import React from 'react';
import logo from './logo.svg';
import {Routes, Route, redirect} from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Redirect from './pages/Redirect';

function App() {
	return (
		<Routes>
			<Route path='/login' element={<Login />}/>
			<Route path='/' element={<Redirect />}/>
		</Routes>
	);
}

export default App;
