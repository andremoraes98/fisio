import React, {useState, type FC} from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';
import './Login.css';

type LoginForm = {
	email: string;
	password: string;
};

const Login: FC = () => {
	const navigate = useNavigate();
	const [credentials, setCredentials] = useState<LoginForm>({email: '', password: ''});
	const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
	const correctCredentials: LoginForm = {
		email: 'andre.moraes.98@gmail.com',
		password: '123456',
	};

	const isDisabled = credentials.email.length < 10 || credentials.password.length < 5;

	const handleCredentialsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {target: {id, value}} = e;
		setCredentials((prevState: LoginForm) => ({
			...prevState,
			[id]: value,
		}));
		setErrorMessage(undefined);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		if (credentials.email === correctCredentials.email && credentials.password === correctCredentials.password) {
			navigate('/home');
		} else {
			e.preventDefault();
			setErrorMessage('Email ou senha incorretos');
		}
	};

	return (
		<form
			id='login-form'
			className='d-flex flex-column'
			onSubmit={handleSubmit}
		>
			<p className='text-danger text-center my-0'>{errorMessage}</p>
			<FloatingLabel
				controlId='email'
				label='Email'
				className='login-input'
			>
				<Form.Control
					type='email'
					placeholder='name@example.com'
					value={credentials.email}
					onChange={handleCredentialsChange}
				/>
			</FloatingLabel>

			<FloatingLabel
				controlId='password'
				label='Senha'
				className='login-input'
			>
				<Form.Control
					type='password'
					placeholder='name@example.com'
					value={credentials.password}
					onChange={handleCredentialsChange}
				/>
			</FloatingLabel>

			<Button
				id='login-button'
				type='submit'
				disabled={isDisabled}
				variant={isDisabled ? 'secondary' : 'success'}
			>
				Login
			</Button>
		</form>
	);
};

export default Login;
