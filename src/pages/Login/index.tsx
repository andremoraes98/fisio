import React, {useContext, useState, type FC} from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';
import UserContext, {type InterCredentials} from '../../context/User/UserContext';
import './Login.css';

const Login: FC = () => {
	const navigate = useNavigate();
	const {checkLoginCredentials} = useContext(UserContext)!;
	const [credentials, setCredentials] = useState<InterCredentials>({email: '', password: ''});
	const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

	const isDisabled = credentials.email.length < 10 || credentials.password.length < 5;

	const handleCredentialsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {target: {id, value}} = e;
		setCredentials(prevState => ({
			...prevState,
			[id]: value,
		}));
		setErrorMessage(undefined);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const response = (await checkLoginCredentials(credentials))!;

		if (response.status !== 200) {
			const {message} = await response.json() as {message: string};
			setErrorMessage(message);
			return;
		}

		const {token} = await response.json() as {token: string};
		localStorage.setItem('token', token);
		navigate('/admin');
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
