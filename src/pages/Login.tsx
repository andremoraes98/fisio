import React, {useState} from 'react';

const Login = () => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = (e: React.FormEvent<HTMLInputElement>) => {
		setLogin(e.currentTarget.value);
	};

	const handlePassword = (e: React.FormEvent<HTMLInputElement>) => {
		setPassword(e.currentTarget.value);
	};

	return (
		<form>
			<input
				type='text'
				value={login}
				onChange={handleLogin}
			/>
			<input
				type='password'
				value={password}
				onChange={handlePassword}
			/>
		</form>
	);
};

export default Login;
