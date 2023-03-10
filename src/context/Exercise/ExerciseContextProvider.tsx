import React, {useState, type FC, type PropsWithChildren} from 'react';
import type {InterExercise} from './ExerciseContext';
import ExerciseContext from './ExerciseContext';

// eslint-disable-next-line @typescript-eslint/naming-convention
const MAIN_URL = process.env.REACT_APP_MAIN_API ?? 'localhost:3001';

const ExerciseProvider: FC<PropsWithChildren> = ({children}) => {
	const [exercises, setExercises] = useState<InterExercise[]>([]);
	const [selectedExercise, setSelectedExercise] = useState<InterExercise>({
		_id: '',
		link: '',
		name: '',
		muscle: [],
	});
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const trainingTypes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'U', 'M'];
	const eccentricSpeedOptions = [
		{label: 'Excêntrico Lento', value: 'slow'},
		{label: 'Excêntrico Normal', value: 'normal'},
		{label: 'Excêntrico Rápido', value: 'fast'},
	];
	const concentricSpeedOptions = [
		{label: 'Concêntrico Lento', value: 'slow'},
		{label: 'Concêntrico Normal', value: 'normal'},
		{label: 'Concêntrico Rápido', value: 'fast'},
	];

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

	const getAllExercise = async () => {
		setIsLoading(true);
		try {
			const response = await fetch(`${MAIN_URL}/exercise`);
			const fetchedExercises = await response.json() as InterExercise[];

			setExercises(fetchedExercises);
		} catch (e: any) {
			console.log(e.message);
		} finally {
			setIsLoading(false);
		}
	};

	const createExercise = async (userInfo: InterExercise) => {
		setIsLoading(true);
		console.log(userInfo);
		try {
			const response = await fetch(`${MAIN_URL}/exercise`, {
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

	const editExercise = async (id: string, exerciseInfo: InterExercise) => {
		setIsLoading(true);
		try {
			const response = await fetch(`${MAIN_URL}/exercise/${id}`, {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(exerciseInfo),
			});

			return response.status;
		} catch (e: any) {
			console.log(e.message);
		} finally {
			setIsLoading(false);
		}
	};

	const deleteExercise = async (id: string) => {
		setIsLoading(true);
		try {
			const response = await fetch(`${MAIN_URL}/exercise/${id}`, {
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
		exercises,
		getAllExercise,
		createExercise,
		editExercise,
		deleteExercise,
		selectedExercise,
		setSelectedExercise,
		muscleOptions,
		trainingTypes,
		eccentricSpeedOptions,
		concentricSpeedOptions,
	};

	return (
		<ExerciseContext.Provider value={context}>
			{children}
		</ExerciseContext.Provider>
	);
};

export default ExerciseProvider;
