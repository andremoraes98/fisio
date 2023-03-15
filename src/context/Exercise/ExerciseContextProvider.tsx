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
	const trainingTypes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'U', 'M'];
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
	const isometricOptions = [
		{label: 'Antes 5”', value: 'before-5'},
		{label: 'Antes 10”', value: 'before-10'},
		{label: 'Antes 15”', value: 'before-15'},
		{label: 'Antes 20”', value: 'before-20'},
		{label: 'Antes 25”', value: 'before-25'},
		{label: 'Antes 30”', value: 'before-30'},
		{label: 'Durante 5”', value: 'in-5'},
		{label: 'Durante 10”', value: 'in-10'},
		{label: 'Durante 15”', value: 'in-15'},
		{label: 'Durante 20”', value: 'in-20'},
		{label: 'Durante 25”', value: 'in-25'},
		{label: 'Durante 30”', value: 'in-30'},
		{label: 'Final 5”', value: 'after-5'},
		{label: 'Final 10”', value: 'after-10'},
		{label: 'Final 15”', value: 'after-15'},
		{label: 'Final 20”', value: 'after-20'},
		{label: 'Final 25”', value: 'after-25'},
		{label: 'Final 30”', value: 'after-30'},
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

	const filterExerciseById = (id: string): InterExercise => exercises.find(exercise => exercise._id === id)!;

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
		isometricOptions,
		filterExerciseById,
	};

	return (
		<ExerciseContext.Provider value={context}>
			{children}
		</ExerciseContext.Provider>
	);
};

export default ExerciseProvider;
