/* eslint-disable @typescript-eslint/ban-types */
import React, {useContext, useEffect, useState, type FC} from 'react';
import {Button, Form, ToggleButton} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {type SingleValue} from 'react-select';
import BootStrapInput from '../../../../components/BootStrapInput';
import Select from '../../../../components/ReactSelect';
import ExerciseContext from '../../../../context/Exercise/ExerciseContext';
import UserContext, {type InterUser} from '../../../../context/User/UserContext';

const CreateCustomer: FC = () => {
	const {createUser, roleOptions, checkPermission, isLoading} = useContext(UserContext)!;
	const {exercises, getAllExercise, trainingTypes, eccentricSpeedOptions, concentricSpeedOptions} = useContext(ExerciseContext)!;
	const navigate = useNavigate();
	const [formInfos, setFormInfos] = useState<InterUser>({
		name: '',
		email: '',
		role: 'user',
		password: '',
		classes: [],
	});
	const [training, setTraining] = useState<string>('A');
	const [createdTrainings, setCreatedTrainings] = useState<{
		series: string;
		repetitions: string;
		interval: string;
		speed: string;
	}>({
		series: '',
		repetitions: '',
		interval: '',
		speed: '',
	});
	const {series, repetitions, interval, speed} = createdTrainings;

	const [selectRole, setSelectRole] = useState<SingleValue<{
		value: string | undefined;
		label: string;
	}> | null>(null);

	const [selectExercise, setSelectExercise] = useState<SingleValue<{
		value: string | undefined;
		label: string;
	}> | null>(null);

	const [eccentricSpeed, setEccentricSpeed] = useState<SingleValue<{
		value: string | undefined;
		label: string;
	}> | null>(null);

	const [concentricSpeed, setConcentricSpeed] = useState<SingleValue<{
		value: string | undefined;
		label: string;
	}> | null>(null);

	const {name, email, password} = formInfos;

	const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {id, value} = e.target;
		setFormInfos(prevState => ({...prevState, [id]: value}));
	};

	const handleTrainingInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {id, value} = e.target;
		setCreatedTrainings(prevState => ({...prevState, [id]: value}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!selectRole) {
			return;
		}

		const status = await createUser({...formInfos, role: selectRole.value as 'user' | 'admin'});

		if (status !== 201) {
			throw new Error('Algo deu errado');
		}

		navigate(-1);
	};

	useEffect(() => {
		checkPermission(navigate, 'admin');
		getAllExercise();
	}, []);

	return (
		<Form
			onSubmit={handleSubmit}
			className='flex-column-center '
		>
			<main className='flex-row-center'>
				<section style={{paddingRight: '20px'}}>
					<BootStrapInput
						id='name'
						type='text'
						placeholder='Nome'
						value={name}
						changeStateFunc={handlePersonalInfoChange}
					/>

					<BootStrapInput
						id='email'
						type='email'
						placeholder='Email'
						value={email}
						changeStateFunc={handlePersonalInfoChange}
					/>

					<Select
						options={roleOptions}
						placeholder='Selecione um cargo...'
						setValue={setSelectRole}
						value={selectRole}
						isClearable={false}
					/>

					<BootStrapInput
						id='password'
						type='password'
						placeholder='Senha'
						value={password}
						changeStateFunc={handlePersonalInfoChange}
					/>
				</section>

				<section style={{paddingLeft: '20px', borderLeft: '1px solid gray'}}>
					<div className='flex-row-center'>
						{trainingTypes.map(trainingName => (
							<ToggleButton
								key={trainingName}
								className='m-2'
								id={`toggle-check-${trainingName}`}
								type='radio'
								name='training-type'
								variant='outline-primary'
								checked={trainingName === training}
								value={trainingName}
								onChange={e => {
									setTraining(e.target.value);
								}}
							>
								{trainingName}
							</ToggleButton>
						))}
					</div>

					<Select
						options={exercises.map(({name, _id}) => ({label: name, value: _id}))}
						placeholder='Selecione um exercício...'
						setValue={setSelectExercise}
						value={selectExercise}
					/>

					<BootStrapInput
						id='series'
						type='number'
						placeholder='Séries'
						value={series}
						changeStateFunc={handleTrainingInfoChange}
					/>

					<BootStrapInput
						id='repetitions'
						type='number'
						placeholder='Repetições'
						value={repetitions}
						changeStateFunc={handleTrainingInfoChange}
					/>

					<BootStrapInput
						id='interval'
						type='number'
						placeholder='Tempo de intervalo'
						value={interval}
						changeStateFunc={handleTrainingInfoChange}
					/>

					<Select
						options={concentricSpeedOptions}
						placeholder='Concêntrico'
						setValue={setConcentricSpeed}
						value={concentricSpeed}
						isClearable
					/>

					<Select
						options={eccentricSpeedOptions}
						placeholder='Excêntrico'
						setValue={setEccentricSpeed}
						value={eccentricSpeed}
						isClearable
					/>

					<div>
						<Button
							variant='primary'
							type='submit'
							className='large-button'
						>
							{`Adicionar ao treino ${training}`}
						</Button>
					</div>
				</section>
			</main>

			<div className='flex-row-center flex-wrap'>
				<div>
					<Button
						variant='success'
						type='submit'
						className='small-button'
					>
						Criar
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

export default CreateCustomer;
