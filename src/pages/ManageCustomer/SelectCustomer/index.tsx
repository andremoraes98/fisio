/* eslint-disable @typescript-eslint/ban-types */
import React, {useContext, useEffect, useState, type FC} from 'react';
import {Form, Button} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import ReactSelect, {type SingleValue} from 'react-select';
import UserContext from '../../../context/UserContext';
import './style.css';

const SelectCustomer: FC = () => {
	const {
		users,
		getUsers,
		isLoading,
		setSelectedUser,
		deleteUser,
		selectedUser: {_id},
	} = useContext(UserContext)!;
	const navigate = useNavigate();

	const [selectValue, setSelectValue] = useState<SingleValue<{
		value: string | undefined;
		label: string;
	}> | null>(null);

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

	return (
		<Form
			className='main-container'
			onSubmit={() => {
				navigate('/calendar');
			}}
		>
			<ReactSelect
				isDisabled={isLoading}
				className='login-input'
				options={users.map(user => ({label: user.name, value: user._id}))}
				value={selectValue}
				onChange={handleSelectCutomer}
				isClearable
				placeholder='Selecione um aluno...'
			/>

			<div className='flex-center-evenly flex-wrap'>
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

				<div className='large-button'>
					<Button
						onClick={() => {
							navigate('/edit-customer');
						}}
						disabled={!selectValue}
					>
						Editar aluno
					</Button>
				</div>

				<div className='large-button'>
					<Button
						type='button'
						onClick={handleDeleteButtonClick}
						variant='danger'
						disabled={!selectValue}
					>
						Excluir aluno
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
