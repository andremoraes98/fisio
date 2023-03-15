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
	const {trainingTypes} = useContext(ExerciseContext)!;
	const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
	const [deletedTraining, setDeletedTraining] = useState<string>('');

	return (
		<>
			<ConfirModal
				show={isConfirmModalOpen}
				setShow={setIsConfirmModalOpen}
				deleteTraining={() => classes.delete(deletedTraining)}
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
						<ul>
							{
								classes.get(trainingName)!.map(exercise => (
									<li key={`dropdown-button-drop-${exercise.exercise.name}`}>
										<p>{exercise.exercise.name}</p>
									</li>
								))
							}
						</ul>
						<div className='flex-row-center icon-button'>
							<Button
								variant='outline-danger'
								type='button'
								onClick={() => {
									setIsConfirmModalOpen(true);
									setDeletedTraining(trainingName);
								}}
							>
								<RiDeleteBinFill />
							</Button>
						</div>
					</DropdownButton>))
				}
			</div>
		</>
	);
};

export default ResumeTraining;
