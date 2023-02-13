import React, {useContext, useState, type FC} from 'react';
import {Button, FloatingLabel, Form} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import UserContext, {type InterUser} from '../../../context/UserContext';

const CreateCustomer: FC = () => {
	const {createUser} = useContext(UserContext)!;
	const navigate = useNavigate();
	const [formInfos, setFormInfos] = useState<InterUser>({
		name: '',
		email: '',
		role: 'user',
		password: '',
	});

	const {name, email, password, role} = formInfos;

	const handleInputFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {id, value} = e.target;
		setFormInfos(prevState => ({...prevState, [id]: value}));
	};

	const handleSelectFormChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const {id, value} = e.target;
		setFormInfos(prevState => ({...prevState, [id]: value}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		console.log(formInfos);
		const status = await createUser(formInfos);

		if (status !== 201) {
			throw new Error('Algo deu errado');
		}

		navigate(-1);
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
				controlId='email'
				label='Email'
				className='login-input'
			>
				<Form.Control
					type='email'
					placeholder='name@example.com'
					value={email}
					onChange={handleInputFormChange}
				/>
			</FloatingLabel>

			<Form.Select
				id='role'
				className='login-input'
				style={{padding: '1rem 0.75rem'}}
				value={role}
				onChange={handleSelectFormChange}
			>
				<option disabled={Boolean(role)}>Selecione um aluno</option>
				<option value='user'>Aluno</option>
				<option value='admin'>Administrador</option>
			</Form.Select>

			<FloatingLabel
				controlId='password'
				label='Senha'
				className='login-input'
			>
				<Form.Control
					type='password'
					placeholder='Senha'
					value={password}
					onChange={handleInputFormChange}
				/>
			</FloatingLabel>

			<div className='flex-row-center flex-wrap'>
				<div className='small-button'>
					<Button
						variant='success'
						type='submit'
						style={{width: '100%'}}
					>
            Criar
					</Button>
				</div>

				<div className='small-button'>
					<Button
						variant='secondary'
						type='button'
						style={{width: '100%'}}
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
