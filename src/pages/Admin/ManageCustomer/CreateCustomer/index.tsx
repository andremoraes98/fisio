/* eslint-disable @typescript-eslint/ban-types */
import React, {useContext, useEffect, useState, type FC} from 'react';
import {Button, ButtonGroup, Dropdown, DropdownButton, Form, ToggleButton} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import ReactSelect, {type MultiValue, type SingleValue} from 'react-select';
import {RiDeleteBinFill} from 'react-icons/ri';
import BootStrapInput from '../../../../components/BootStrapInput';
import Select from '../../../../components/ReactSelect';
import ExerciseContext from '../../../../context/Exercise/ExerciseContext';
import UserContext, {type InterUser} from '../../../../context/User/UserContext';
import './style.css';
import ResumeTraining from './ResumeTraining';

const CreateCustomer: FC = () => {
	const {createUser, roleOptions, checkPermission} = useContext(UserContext)!;
	const {
		exercises,
		getAllExercise,
		trainingTypes,
		eccentricSpeedOptions,
		concentricSpeedOptions,
		isometricOptions,
		filterExerciseById,
	} = useContext(ExerciseContext)!;
	const navigate = useNavigate();
	const [formInfos, setFormInfos] = useState<InterUser>({
		name: '',
		email: '',
		role: 'user',
		password: '',
		classes: new Map(),
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

	const handleExerciseAdd = () => {
		if (!selectExercise || !concentricSpeed || !eccentricSpeed || !isometric) {
			return;
		}

		const exercise = filterExerciseById(selectExercise.value!);

		if (classes.has(training)) {
			classes.set(training, [...classes.get(training)!, {
				exercise,
				series,
				repetitions,
				interval,
				concentricSpeed: concentricSpeed.value!,
				eccentricSpeed: eccentricSpeed.value!,
				isometric: isometric.map(type => type.value!),
			}]);
		} else {
			classes.set(training, [{
				exercise,
				series,
				repetitions,
				interval,
				concentricSpeed: concentricSpeed.value!,
				eccentricSpeed: eccentricSpeed.value!,
				isometric: isometric.map(type => type.value!),
			}]);
		}

		setSelectExercise(null);
	};

	const isPossibleAddExercise = Boolean(selectExercise)
		&& Boolean(createdTrainings.interval)
		&& Boolean(createdTrainings.repetitions)
		&& Boolean(createdTrainings.series)
		&& Boolean(concentricSpeed)
		&& Boolean(eccentricSpeed)
		&& Boolean(isometric);

	console.log(isPossibleAddExercise);
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

				<section className='flex-column-center'>
					<div className='training-buttons flex-row-center'>
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

					<ResumeTraining
						classes={classes}
					/>

					<div style={{width: '100%'}}>
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
							className='input-forms'
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
								type='button'
								className='large-button'
								onClick={handleExerciseAdd}
								disabled={!isPossibleAddExercise}
							>
								{`Adicionar ao treino ${training}`}
							</Button>
						</div>
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
