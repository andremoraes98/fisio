/* eslint-disable @typescript-eslint/ban-types */
import React, {useContext, useEffect, useState, type FC} from 'react';
import {Form, Button} from 'react-bootstrap';
import {MdAdd} from 'react-icons/md';
import {useNavigate} from 'react-router-dom';
import ReactSelect, {type SingleValue} from 'react-select';
import UserContext from '../../../context/User/UserContext';
import './style.css';

const SelectCustomer: FC = () => {
	const {
		users,
		getAllRegistered,
		getUsers,
		isLoading,
		setSelectedUser,
		deleteUser,
		selectedUser: {_id, role},
	} = useContext(UserContext)!;
	const navigate = useNavigate();

	const [selectValue, setSelectValue] = useState<SingleValue<{
		value: string | undefined;
		label: string;
	}> | null>(null);
	const [onlyUser, setOnlyUser] = useState<boolean>(true);

	useEffect(() => {
		getUsers();
	}, []);

	const handleSelectCutomer = (target: SingleValue<{
		value: string | undefined;
		label: string;
	}>) => {
		const selectedUser = users.find(({_id}) => _id === target?.value);
		if (selectedUser) {
			setSelectedUser(selectedUser);
		}

		setSelectValue(target);
	};

	const handleDeleteButtonClick = async () => {
		if (!_id) {
			return;
		}

		const status = await deleteUser(_id);

		if (status !== 204) {
			throw new Error('Algo deu errado');
		}

		window.location.reload();
	};

	const handleOnlyUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const fetchOnlyUser = e.target.checked;

		if (fetchOnlyUser) {
			getUsers();
		} else {
			getAllRegistered();
		}

		setOnlyUser(prevState => !prevState);
		handleSelectCutomer(null);
	};

	return (
		<Form
			className='main-container'
			onSubmit={() => {
				navigate('/calendar');
			}}
		>
			<div className='flex-row-center flex-wrap'>
				<ReactSelect
					isDisabled={isLoading}
					className='rselect-input'
					options={users.map(user => ({label: user.name, value: user._id}))}
					value={selectValue}
					onChange={handleSelectCutomer}
					isClearable
					placeholder='Selecione um aluno...'
				/>

				<div className='icon-button'>
					<Button
						type='button'
						variant='success'
						className='flex-row-center'
						onClick={() => {
							navigate('/create-user');
						}}
					>
						<MdAdd size={20}/>
					</Button>
				</div>
			</div>

			<label className='flex-row-center' htmlFor='user-only'>
				<input
					value='user-only'
					checked={onlyUser}
					onChange={handleOnlyUserInputChange}
					id='user-only'
					type='checkbox'
					style={{
						marginRight: '10px',
					}}
				/>
				Alunos apenas
			</label>

			<div className='flex-row-center flex-wrap'>
				{ role === 'user' && (
					<div className='large-button'>
						<Button
							onClick={() => {
								navigate('/calendar');
							}}
							variant='success'
							disabled={!selectValue}
						>
							Calcular pagamento
						</Button>
					</div>
				)}
				<div className='large-button'>
					<Button
						onClick={() => {
							navigate('/edit-customer');
						}}
						disabled={!selectValue}
					>
						Editar
					</Button>
				</div>

				<div className='large-button'>
					<Button
						type='button'
						onClick={handleDeleteButtonClick}
						variant='danger'
						disabled={!selectValue}
					>
						Excluir
					</Button>
				</div>
			</div>

			<div className='large-button mx-auto'>
				<Button
					type='button'
					variant='secondary'
					onClick={() => {
						navigate(-1);
					}}
				>
					Cancelar
				</Button>
			</div>
		</Form>
	);
};

export default SelectCustomer;
