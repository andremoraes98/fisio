import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Calendar from './pages/Calendar';
import Home from './pages/Home';
import Login from './pages/Login';
import Redirect from './pages/Redirect';

function App() {
	return (
		<Routes>
			<Route path='/login' element={<Login />}/>
			<Route path='/home' element={<Home />}/>
			<Route path='/calendar' element={<Calendar />}/>
			<Route path='/' element={<Redirect />}/>
		</Routes>
	);
}

export default App;
