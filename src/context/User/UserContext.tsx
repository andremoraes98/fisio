import {createContext, type Dispatch, type SetStateAction} from 'react';
import {type NavigateFunction} from 'react-router-dom';

export type InterCredentials = {
	email: string;
	password: string;
};

export type InterExerciseDetails = {
	exercise: string;
	series: string;
	repetitions: string;
	interval: string;
	concentricSpeed: string;
	eccentricSpeed: string;
	isometric: string[];
};

export type InterUser = {
	_id?: string;
	name: string;
	email: string;
	role: 'user' | 'admin';
	password?: string;
	classes: Record<string, InterExerciseDetails[]>;
};

export type InterContext = {
	users: InterUser[];
	isLoading: boolean;
	setIsLoading: Dispatch<SetStateAction<boolean>>;
	getAllRegistered: () => void;
	getUsers: () => void;
	createUser: (userInfo: InterUser) => Promise<number | undefined>;
	editUser: (id: string, userInfo: InterUser) => Promise<number | undefined>;
	deleteUser: (id: string) => Promise<number | undefined>;
	login: (credentials: InterCredentials) => Promise<Response | undefined>;
	selectedUser: InterUser;
	setSelectedUser: (userInfo: InterUser) => void;
	roleOptions: Array<{value: string; label: string}>;
	autenticatedUser: InterUser | undefined;
	setAutenticatedUser: (userInfo: InterUser | undefined) => void;
	checkPermission: (navigate: NavigateFunction, role: string) => void;
};

const UserContext = createContext<InterContext | undefined>(undefined);

export default UserContext;
