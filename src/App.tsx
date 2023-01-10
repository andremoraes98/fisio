import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Login from './pages/Login/Login';
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
