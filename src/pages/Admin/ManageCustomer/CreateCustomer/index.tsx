/* eslint-disable @typescript-eslint/ban-types */
import React, {useContext, useEffect, useState, type FC} from 'react';
import {Button, Form, ToggleButton} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import ReactSelect, {type MultiValue, type SingleValue} from 'react-select';
import BootStrapInput from '../../../../components/BootStrapInput';
import Select from '../../../../components/ReactSelect';
import ExerciseContext from '../../../../context/Exercise/ExerciseContext';
import UserContext, {type InterUser} from '../../../../context/User/UserContext';
import './style.css';

const CreateCustomer: FC = () => {
	const {createUser, roleOptions, checkPermission} = useContext(UserContext)!;
	const {exercises, getAllExercise, trainingTypes, eccentricSpeedOptions, concentricSpeedOptions, isometricOptions} = useContext(ExerciseContext)!;
	const navigate = useNavigate();
	const [formInfos, setFormInfos] = useState<InterUser>({
		name: '',
		email: '',
		role: 'user',
		password: '',
		classes: {},
	});
	const [training, setTraining] = useState<string>('A');
	const [createdTrainings, setCreatedTrainings] = useState<{
		series: string;
		repetitions: string;
		interval: string;
	}>({
		series: '',
		repetitions: '',
		interval: '',
	});
	const {series, repetitions, interval} = createdTrainings;

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

	const [isometric, setIsometric] = useState<MultiValue<{
		label: string;
		value: string | undefined;
	}> | null>(null);

	const {name, email, password, classes} = formInfos;

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

	const clearExerciseInputs = () => {
		setSelectExercise(null);
		setCreatedTrainings({
			series: '',
			repetitions: '',
			interval: '',
		});
		setConcentricSpeed(null);
		setEccentricSpeed(null);
		setIsometric(null);
	};

	const handleExerciseAdd = () => {
		if (!selectExercise || !concentricSpeed || !eccentricSpeed || !isometric) {
			return;
		}

		if (classes[training]) {
			classes[training].push({
				exercise: selectExercise.value!,
				series,
				repetitions,
				interval,
				concentricSpeed: concentricSpeed.value!,
				eccentricSpeed: eccentricSpeed.value!,
				isometric: isometric.map(type => type.value!),
			});
		} else {
			classes[training] = [{
				exercise: selectExercise.value!,
				series,
				repetitions,
				interval,
				concentricSpeed: concentricSpeed.value!,
				eccentricSpeed: eccentricSpeed.value!,
				isometric: isometric.map(type => type.value!),
			}];
		}

		clearExerciseInputs();
	};

	useEffect(() => {
		checkPermission(navigate, 'admin');
		getAllExercise();
	}, []);

	return (
		<Form
			onSubmit={handleSubmit}
			className='flex-column-center'
		>
			<h1 className='my-4'>Criar um usuário</h1>

			<main id='create-customer-main'>
				<section>
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
					/>

					<BootStrapInput
						id='password'
						type='password'
						placeholder='Senha'
						value={password}
						changeStateFunc={handlePersonalInfoChange}
					/>
				</section>

				<section>
					<div className='training-buttons'>
						{trainingTypes.map(trainingName => (
							<ToggleButton
								key={trainingName}
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
						type='text'
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

					<ReactSelect
						options={isometricOptions}
						placeholder='Isometria'
						className='login-input'
						onChange={target => {
							setIsometric(target);
						}}
						value={isometric}
						isClearable
						isMulti
						styles={{
							indicatorsContainer: base => ({...base, padding: '10px 0'}),
						}}
					/>

					<div className='text-center'>
						<Button
							variant='primary'
							type='submit'
							className='large-button'
							onClick={handleExerciseAdd}
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
