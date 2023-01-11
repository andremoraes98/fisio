import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Calendar from './pages/Calendar/Calendar';
import Login from './pages/Login/Login';
import Redirect from './pages/Redirect';

function App() {
	return (
		<Routes>
			<Route path='/login' element={<Login />}/>
			<Route path='/calendar' element={<Calendar />}/>
			<Route path='/' element={<Redirect />}/>
		</Routes>
	);
}

export default App;
