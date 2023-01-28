import {createContext, type Dispatch, type SetStateAction} from 'react';

export type InterUser = {
	id?: string;
	name: string;
	email: string;
	password?: string;
};

export type InterContext = {
	users: InterUser[];
	isLoading: boolean;
	setIsLoading: Dispatch<SetStateAction<boolean>>;
	getUsers: () => void;
	createUser: (userInfo: InterUser) => void;
};

const UserContext = createContext<InterContext | undefined>(undefined);

export default UserContext;
