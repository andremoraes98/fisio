import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Calendar from './pages/Calendar';
import Home from './pages/Home';
import Login from './pages/Login';
import ManageCustomer from './pages/ManageCustomer';
import ManageClass from './pages/ManageClass';
import CreateCustomer from './pages/ManageCustomer/CreateCustomer';
import EditCustomer from './pages/ManageCustomer/EditCustomer';
import EditClass from './pages/ManageClass/Edit';
import CreateClass from './pages/ManageClass/Create';
import Redirect from './pages/Redirect';

function App() {
	return (
		<Routes>
			<Route path='/login' element={<Login />}/>
			<Route path='/home' element={<Home />}/>
			<Route path='/calendar' element={<Calendar />}/>
			<Route path='/manage-customer' element={<ManageCustomer />}/>
			<Route path='/edit-customer' element={<EditCustomer />}/>
			<Route path='/create-user' element={<CreateCustomer />}/>
			<Route path='/manage-class' element={<ManageClass />}/>
			<Route path='/edit-class' element={<EditClass />}/>
			<Route path='/create-class' element={<CreateClass />}/>
			<Route path='/' element={<Redirect />}/>
		</Routes>
	);
}

export default App;
