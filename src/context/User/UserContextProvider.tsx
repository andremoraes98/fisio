import React, {useState, type FC, type PropsWithChildren} from 'react';
import {type NavigateFunction, useNavigate} from 'react-router-dom';
import type {InterCredentials, InterUser} from './UserContext';
import UserContext from './UserContext';

// eslint-disable-next-line @typescript-eslint/naming-convention
const MAIN_URL = process.env.REACT_APP_MAIN_API ?? 'localhost:3001';

const UserProvider: FC<PropsWithChildren> = ({children}) => {
	const [users, setUsers] = useState<InterUser[]>([]);
	const [autenticatedUser, setAutenticatedUser] = useState<InterUser | undefined>(undefined);
	const [selectedUser, setSelectedUser] = useState<InterUser>({
		email: '',
		name: '',
		_id: '',
		role: 'user',
		classes: [],
	});
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const roleOptions: Array<{value: string; label: string}> = [
		{label: 'Aluno', value: 'user'},
		{label: 'Administrador', value: 'admin'},
	];

	const getAllRegistered = async () => {
		setIsLoading(true);
		try {
			const response = await fetch(`${MAIN_URL}/user`);
			const fetchedUsers = await response.json() as InterUser[];

			setUsers(fetchedUsers);
		} catch (e: any) {
			console.log(e.message);
		} finally {
			setIsLoading(false);
		}
	};

	const getUsers = async () => {
		setIsLoading(true);
		try {
			const response = await fetch(`${MAIN_URL}/user/role/user`);
			const fetchedUsers = await response.json() as InterUser[];

			setUsers(fetchedUsers);
		} catch (e: any) {
			console.log(e.message);
		} finally {
			setIsLoading(false);
		}
	};

	const createUser = async (userInfo: InterUser) => {
		setIsLoading(true);
		console.log(userInfo);
		try {
			const response = await fetch(`${MAIN_URL}/user`, {
				method: 'PUT',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(userInfo),
			});

			return response.status;
		} catch (e: any) {
			console.log(e.message);
		} finally {
			setIsLoading(false);
		}
	};

	const editUser = async (id: string, userInfo: InterUser) => {
		setIsLoading(true);
		try {
			const response = await fetch(`${MAIN_URL}/user/${id}`, {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(userInfo),
			});

			return response.status;
		} catch (e: any) {
			console.log(e.message);
		} finally {
			setIsLoading(false);
		}
	};

	const deleteUser = async (id: string) => {
		setIsLoading(true);
		try {
			const response = await fetch(`${MAIN_URL}/user/${id}`, {
				method: 'DELETE',
				headers: {'Content-Type': 'application/json'},
			});

			return response.status;
		} catch (e: any) {
			console.log(e.message);
		} finally {
			setIsLoading(false);
		}
	};

	const login = async (credentials: InterCredentials) => {
		setIsLoading(true);
		try {
			const response = await fetch(`${MAIN_URL}/login`, {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(credentials),
			});

			return response;
		} catch (e: any) {
			console.log(e.message);
		} finally {
			setIsLoading(false);
		}
	};

	const checkPermission = (navigate: NavigateFunction, role: string) => {
		const user = localStorage.getItem('user');

		if (!user) {
			setAutenticatedUser(undefined);
			navigate('/login');
			return;
		}

		const {role: userRole} = JSON.parse(user) as InterUser;
		if (role === userRole) {
			return;
		}

		if (!autenticatedUser || autenticatedUser.role !== role) {
			setAutenticatedUser(undefined);
			navigate('/login');
		}
	};

	const context = {
		isLoading,
		setIsLoading,
		users,
		getAllRegistered,
		getUsers,
		createUser,
		editUser,
		deleteUser,
		login,
		selectedUser,
		setSelectedUser,
		roleOptions,
		autenticatedUser,
		setAutenticatedUser,
		checkPermission,
	};

	return (
		<UserContext.Provider value={context}>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;
