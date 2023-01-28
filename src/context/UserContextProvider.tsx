import React, {useState, type FC, type PropsWithChildren} from 'react';
import type {InterUser} from './UserContext';
import UserContext from './UserContext';

// eslint-disable-next-line @typescript-eslint/naming-convention
const MAIN_URL = process.env.REACT_APP_MAIN_API ?? 'localhost:3001';

const UserProvider: FC<PropsWithChildren> = ({children}) => {
	const [users, setUsers] = useState<InterUser[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const getUsers = async () => {
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

	const createUser = async (userInfo: InterUser) => {
		setIsLoading(true);
		try {
			await fetch(`${MAIN_URL}/user`, {
				method: 'PUT',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(userInfo),
			});
		} catch (e: any) {
			console.log(e.message);
		} finally {
			setIsLoading(false);
		}
	};

	const context = {
		isLoading,
		setIsLoading,
		users,
		getUsers,
		createUser,
	};

	return (
		<UserContext.Provider value={context}>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;
