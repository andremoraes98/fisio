import React, {useState, type FC} from 'react';
import {Button, FloatingLabel, Form} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

type FormInfos = {
	name: string;
	email: string;
	password: string;
};

const CreateCustomer: FC = () => {
	const navigate = useNavigate();
	const [formInfos, setFormInfos] = useState<FormInfos>({
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
					>
            Cancelar
					</Button>
				</div>
			</div>
		</Form>
	);
};

export default CreateCustomer;
