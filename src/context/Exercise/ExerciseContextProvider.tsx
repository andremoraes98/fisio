import React, {useState, type FC, type PropsWithChildren} from 'react';
import type {InterExercise} from './ExerciseContext';
import ExerciseContext from './ExerciseContext';

// eslint-disable-next-line @typescript-eslint/naming-convention
const MAIN_URL = process.env.REACT_APP_MAIN_API ?? 'localhost:3001';

const UserProvider: FC<PropsWithChildren> = ({children}) => {
	const [exercises, setExercises] = useState<InterExercise[]>([]);
	const [selectedExercise, setSelectedExercise] = useState<InterExercise>({
		_id: '',
		link: '',
		name: '',
		muscle: [],
	});
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const muscleOptions: Array<{value: string; label: string}> = [
		{label: 'Costas', value: 'costas'},
		{label: 'Peito', value: 'peito'},
		{label: 'Bíceps', value: 'biceps'},
		{label: 'Tríceps', value: 'triceps'},
		{label: 'Quadríceps', value: 'quadriceps'},
		{label: 'Posterior', value: 'posterior'},
		{label: 'Panturrilha', value: 'Panturrilha'},
		{label: 'Glúteo', value: 'Glúteo'},
	];

	const getAllRegistered = async () => {
		setIsLoading(true);
		try {
			const response = await fetch(`${MAIN_URL}/user`);
			const fetchedUsers = await response.json() as InterExercise[];

			setExercises(fetchedUsers);
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
			const fetchedUsers = await response.json() as InterExercise[];

			setExercises(fetchedUsers);
		} catch (e: any) {
			console.log(e.message);
		} finally {
			setIsLoading(false);
		}
	};

	const createUser = async (userInfo: InterExercise) => {
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

	const editUser = async (id: string, userInfo: InterExercise) => {
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

	const context = {
		isLoading,
		setIsLoading,
		users: exercises,
		getAllRegistered,
		getUsers,
		createUser,
		editUser,
		deleteUser,
		selectedUser: selectedExercise,
		setSelectedUser: setSelectedExercise,
		roleOptions: muscleOptions,
	};

	return (
		<ExerciseContext.Provider value={context}>
			{children}
		</ExerciseContext.Provider>
	);
};

export default UserProvider;
