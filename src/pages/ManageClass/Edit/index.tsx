import React, {useContext, useState, type FC} from 'react';
import {Button, FloatingLabel, Form} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import ReactSelect, {type MultiValue, type SingleValue} from 'react-select';
import ExerciseContext, {type InterExercise} from '../../../context/Exercise/ExerciseContext';

const EditCustomer: FC = () => {
	const navigate = useNavigate();
	const {
		selectedExercise: {
			_id,
			name: selectedName,
			link: selectedLink,
			muscle: selectedMuscles,
		},
		muscleOptions,
		editExercise,
	} = useContext(ExerciseContext)!;
	const [formInfos, setFormInfos] = useState<InterExercise>({
		name: selectedName,
		link: selectedLink,
		muscle: selectedMuscles,
	});
	const {name, link, muscle} = formInfos;

	const [selectMuscles, setSelectMuscles] = useState<Array<{
		value: string;
		label: string;
	}> | undefined>(muscle.map(item => ({value: item, label: item})));

	const handleInputFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {id, value} = e.target;
		setFormInfos(prevState => ({...prevState, [id]: value}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		if (!_id) {
			return;
		}

		e.preventDefault();
		const status = await editExercise(_id, formInfos);

		if (status !== 204) {
			throw new Error('Algo deu errado');
		}

		navigate(-1);
	};

	const handleSelectRole = (target: MultiValue<{
		value: string;
		label: string;
	}> | undefined) => {
		setSelectMuscles(target as Array<{
			value: string;
			label: string;
		}>);

		if (!target) {
			return;
		}

		setFormInfos(prevState => ({...prevState, muscle: target.map(({label}) => label)}));
	};

	return (
		<Form
			onSubmit={handleSubmit}
		>
			<FloatingLabel
				controlId='name'
				label='Nome'
				className='login-input'
			>
				<Form.Control
					type='text'
					placeholder='Nome'
					value={name}
					onChange={handleInputFormChange}
				/>
			</FloatingLabel>

			<FloatingLabel
				controlId='link'
				label='Link'
				className='login-input'
			>
				<Form.Control
					type='link'
					placeholder='name@example.com'
					value={link}
					onChange={handleInputFormChange}
				/>
			</FloatingLabel>

			<ReactSelect
				className='login-input'
				options={muscleOptions}
				value={selectMuscles}
				onChange={handleSelectRole}
				isClearable
				isMulti
				placeholder='Selecione os músculos...'
				styles={{
					indicatorsContainer: base => ({...base, padding: '10px 0'}),
				}}
			/>

			<div className='flex-row-center flex-wrap'>
				<div>
					<Button
						variant='success'
						type='submit'
						className='small-button'
					>
            Editar
					</Button>
				</div>

				<div>
					<Button
						variant='secondary'
						type='button'
						className='small-button'
						onClick={() => {
							navigate(-1);
						}}
					>
            Cancelar
					</Button>
				</div>
			</div>
		</Form>
	);
};

export default EditCustomer;
