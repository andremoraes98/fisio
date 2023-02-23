import {createContext} from 'react';

export type InterExercise = {
	_id?: string;
	name: string;
	link: string;
	muscle: string[];
};

export type InterContext = Record<string, unknown>;

const ExerciseContext = createContext<InterContext | undefined>(undefined);

export default ExerciseContext;
