/* eslint-disable @typescript-eslint/ban-types */
import React, {useContext, useEffect, useState, type FC} from 'react';
import {Form, Button} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import ReactSelect, {type SingleValue} from 'react-select';
import ExerciseContext from '../../context/Exercise/ExerciseContext';
import {MdAdd} from 'react-icons/md';
import './style.css';

const SelectCustomer: FC = () => {
	const {
		exercises,
		getAllExercise,
		isLoading,
		selectedExercise: {_id},
		setSelectedExercise,
		deleteExercise,
	} = useContext(ExerciseContext)!;
	const navigate = useNavigate();

	const [selectValue, setSelectValue] = useState<SingleValue<{
		value: string | undefined;
		label: string;
	}> | null>(null);

	useEffect(() => {
		getAllExercise();
	}, []);

	const handleSelectExercise = (target: SingleValue<{
		value: string | undefined;
		label: string;
	}>) => {
		const selectedUser = exercises.find(({_id}) => _id === target?.value);

		if (selectedUser) {
			setSelectedExercise(selectedUser);
		}

		setSelectValue(target);
	};

	const handleDeleteButtonClick = async () => {
		if (!_id) {
			return;
		}

		const status = await deleteExercise(_id);

		if (status !== 204) {
			throw new Error('Algo deu errado');
		}

		window.location.reload();
	};

	return (
		<Form
			className='main-container'
			onSubmit={() => {
				navigate('/calendar');
			}}
		>
			<div className='flex-row-center flex-wrap'>
				<ReactSelect
					isDisabled={isLoading}
					className='rselect-input'
					options={exercises.map(({name, _id}) => ({label: name, value: _id}))}
					value={selectValue}
					onChange={handleSelectExercise}
					isClearable
					placeholder='Selecione um exercício...'
				/>

				<div className='icon-button'>
					<Button
						type='button'
						variant='success'
						className='flex-row-center'
						onClick={() => {
							navigate('/create-class');
						}}
					>
						<MdAdd size={20}/>
					</Button>
				</div>
			</div>

			<div className='flex-center-evenly flex-wrap'>
				<div className='large-button'>
					<Button
						onClick={() => {
							navigate('/edit-class');
						}}
						disabled={!selectValue}
					>
						Editar
					</Button>
				</div>

				<div className='large-button'>
					<Button
						type='button'
						onClick={handleDeleteButtonClick}
						variant='danger'
						disabled={!selectValue}
					>
						Excluir
					</Button>
				</div>
			</div>

			<div className='large-button mx-auto'>
				<Button
					type='button'
					variant='secondary'
					onClick={() => {
						navigate(-1);
					}}
				>
					Cancelar
				</Button>
			</div>
		</Form>
	);
};

export default SelectCustomer;
