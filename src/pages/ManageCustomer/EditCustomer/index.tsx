import React, {useContext, useState, type FC} from 'react';
import {Button, FloatingLabel, Form} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import UserContext, {type InterUser} from '../../../context/UserContext';

const EditCustomer: FC = () => {
	const navigate = useNavigate();
	const {
		selectedUser: {
			_id,
			name: selectedName,
			email: selectedEmail,
			role: selectedRole,
		},
		editUser,
	} = useContext(UserContext)!;
	const [formInfos, setFormInfos] = useState<InterUser>({
		name: selectedName,
		email: selectedEmail,
		role: selectedRole,
	});

	const {name, email, role} = formInfos;

	const handleInputFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {id, value} = e.target;
		setFormInfos(prevState => ({...prevState, [id]: value}));
	};

	const handleSelectFormChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const {id, value} = e.target;
		setFormInfos(prevState => ({...prevState, [id]: value}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		if (!_id) {
			return;
		}

		e.preventDefault();
		const status = await editUser(_id, formInfos);

		if (status !== 204) {
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

			<div className='flex-row-center flex-wrap'>
				<div>
					<Button
						variant='success'
						type='submit'
						className='small-button'
					>
            Editar
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

export default EditCustomer;
