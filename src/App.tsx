import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Calendar from './pages/Calendar';
import Home from './pages/Home';
import Login from './pages/Login';
import ManageCustomer from './pages/ManageCustomer';
import CreateCustomer from './pages/ManageCustomer/CreateCustomer';
import EditCustomer from './pages/ManageCustomer/EditCustomer';
import SelectCustomer from './pages/ManageCustomer/SelectCustomer';
import Redirect from './pages/Redirect';

function App() {
	return (
		<Routes>
			<Route path='/login' element={<Login />}/>
			<Route path='/home' element={<Home />}/>
			<Route path='/calendar' element={<Calendar />}/>
			<Route path='/select-customer' element={<SelectCustomer />}/>
			<Route path='/manage-customer' element={<ManageCustomer />}/>
			<Route path='/edit-customer' element={<EditCustomer />}/>
			<Route path='/create-customer' element={<CreateCustomer />}/>
			<Route path='/' element={<Redirect />}/>
		</Routes>
	);
}

export default App;
