import {createContext, type Dispatch, type SetStateAction} from 'react';

export type InterExercise = {
	_id?: string;
	name: string;
	link: string;
	muscle: string[];
};

export type InterExerciseContext = {
	exercises: InterExercise[];
	setSelectedExercise: (exerciseInfo: InterExercise) => void;
	isLoading: boolean;
	setIsLoading: Dispatch<SetStateAction<boolean>>;
	getAllExercise: () => void;
	createExercise: (exerciseInfo: InterExercise) => Promise<number | undefined>;
	editExercise: (id: string, exerciseInfo: InterExercise) => Promise<number | undefined>;
	deleteExercise: (id: string) => Promise<number | undefined>;
	selectedExercise: InterExercise;
	muscleOptions: Array<{value: string; label: string}>;
};

const ExerciseContext = createContext<InterExerciseContext | undefined>(undefined);

export default ExerciseContext;
