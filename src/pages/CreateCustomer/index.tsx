import React, {useContext, useState, type FC} from 'react';
import {Button, FloatingLabel, Form} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import UserContext from '../../context/UserContext';
import {type InterUser} from '../../context/UserContext';

const CreateCustomer: FC = () => {
	const {createUser} = useContext(UserContext)!;
	const navigate = useNavigate();
	const [formInfos, setFormInfos] = useState<InterUser>({
		name: '',
		email: '',
		password: '',
	});

	const {name, email, password} = formInfos;

	const handleInputFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {id, value} = e.target;
		setFormInfos(prevState => ({...prevState, [id]: value}));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		createUser(formInfos);
		navigate('/home');
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

			<div className='flex-center-around'>
				<div>
					<Button
						variant='success'
						type='submit'
					>
            Criar
					</Button>
				</div>

				<div>
					<Button
						variant='secondary'
						type='button'
						onClick={() => {
							navigate('/home');
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
