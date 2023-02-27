import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Calendar from './pages/Admin/Calendar';
import Home from './pages/Admin/Home';
import Login from './pages/Login';
import ManageCustomer from './pages/Admin/ManageCustomer';
import ManageClass from './pages/Admin/ManageClass';
import CreateCustomer from './pages/Admin/ManageCustomer/CreateCustomer';
import EditCustomer from './pages/Admin/ManageCustomer/EditCustomer';
import EditClass from './pages/Admin/ManageClass/Edit';
import CreateClass from './pages/Admin/ManageClass/Create';
import Redirect from './pages/Redirect';
import MainUser from './pages/Users';

function App() {
	return (
		<Routes>
			<Route path='/login' element={<Login />}/>
			<Route path='/admin' element={<Home />}/>
			<Route path='/user' element={<MainUser />}/>
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
