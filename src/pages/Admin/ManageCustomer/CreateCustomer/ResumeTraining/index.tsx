import React, {useContext, useState, type FC} from 'react';
import {Button, ButtonGroup, DropdownButton} from 'react-bootstrap';
import {RiDeleteBinFill} from 'react-icons/ri';
import ExerciseContext from '../../../../../context/Exercise/ExerciseContext';
import {type InterExerciseDetails} from '../../../../../context/User/UserContext';
import ConfirModal from '../ConfirmModal';

type ResumeTrainingProps = {
	classes: Map<string, InterExerciseDetails[]>;
};

const ResumeTraining: FC<ResumeTrainingProps> = ({classes}) => {
	const initialStateDeleted = {
		class: '',
		id: '',
	};
	const {trainingTypes} = useContext(ExerciseContext)!;
	const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
	const [deletedExercise, setDeletedExercise] = useState<{class: string; id: string}>(initialStateDeleted);

	return (
		<>
			<ConfirModal
				show={isConfirmModalOpen}
				setShow={setIsConfirmModalOpen}
				deleteTraining={() => {
					const exerciseClass = classes.get(deletedExercise.class)!;
					const filteredExercises = exerciseClass.filter(({exercise: {_id}}) => _id !== deletedExercise.id);

					if (filteredExercises.length === 0) {
						classes.delete(deletedExercise.class);
					} else {
						classes.set(deletedExercise.class, exerciseClass.filter(({exercise: {_id}}) => _id !== deletedExercise.id));
					}

					setDeletedExercise(initialStateDeleted);
				}}
			/>

			<div className='flex-row-center flex-wrap'>
				{
					trainingTypes.map(trainingName => classes.has(trainingName) && (<DropdownButton
						as={ButtonGroup}
						key={`dropdown-button-drop-${trainingName}`}
						size='sm'
						variant='secondary'
						title={`Treino ${trainingName}`}
						className='resume-training'
					>
						<ul className='p-0 m-0'>
							{
								classes.get(trainingName)!.map((exercise, index) => (
									<li className='flex-center-around m-3' key={`dropdown-button-drop-${index}`}>
										<p className='m-0' style={{flex: 1}}>{exercise.exercise.name}</p>
										<div className='flex-row-center icon-button'>
											<Button
												variant='outline-danger'
												type='button'
												onClick={() => {
													setIsConfirmModalOpen(true);
													setDeletedExercise({class: trainingName, id: exercise.exercise._id!});
												}}
											>
												<RiDeleteBinFill />
											</Button>
										</div>
									</li>
								))
							}
						</ul>
					</DropdownButton>))
				}
			</div>
		</>
	);
};

export default ResumeTraining;
