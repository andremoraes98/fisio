import {createContext, type Dispatch, type SetStateAction} from 'react';

export type InterCredentials = {
	email: string;
	password: string;
};

export type InterUser = {
	_id?: string;
	name: string;
	email: string;
	password?: string;
};

export type InterContext = {
	users: InterUser[];
	isLoading: boolean;
	setIsLoading: Dispatch<SetStateAction<boolean>>;
	getUsers: () => void;
	createUser: (userInfo: InterUser) => Promise<number | undefined>;
	editUser: (id: string, userInfo: InterUser) => Promise<number | undefined>;
	deleteUser: (id: string) => Promise<number | undefined>;
	checkLoginCredentials: (credentials: InterCredentials) => Promise<Response | undefined>;
	selectedUser: InterUser;
	setSelectedUser: (userInfo: InterUser) => void;
};

const UserContext = createContext<InterContext | undefined>(undefined);

export default UserContext;
