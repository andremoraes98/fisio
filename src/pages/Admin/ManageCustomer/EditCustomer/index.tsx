import React, {useContext, useEffect, useState, type FC} from 'react';
import {Button, FloatingLabel, Form} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import ReactSelect, {type SingleValue} from 'react-select';
import UserContext, {type InterUser} from '../../../../context/User/UserContext';

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
		roleOptions,
		checkPermission,
	} = useContext(UserContext)!;
	const [formInfos, setFormInfos] = useState<InterUser>({
		name: selectedName,
		email: selectedEmail,
		role: selectedRole,
		password: '',
		classes: new Map(),
	});
	const [selectRole, setSelectRole] = useState<SingleValue<{
		value: string | undefined;
		label: string;
	}> | undefined>(roleOptions.find(({value}) => value === selectedRole));

	const {name, email, role, password} = formInfos;

	const handleInputFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

	const handleSelectRole = (target: SingleValue<{
		value: string | undefined;
		label: string;
	}>) => {
		setSelectRole(target);

		if (!target) {
			return;
		}

		setFormInfos(prevState => ({...prevState, role: target.value as 'admin' | 'user'}));
	};

	useEffect(() => {
		checkPermission(navigate, 'admin');
	}, []);

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

			<ReactSelect
				className='login-input'
				options={roleOptions}
				value={selectRole}
				onChange={handleSelectRole}
				placeholder='Selecione um cargo...'
				isSearchable={false}
				styles={{
					indicatorsContainer: base => ({...base, padding: '10px 0'}),
				}}
			/>

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
