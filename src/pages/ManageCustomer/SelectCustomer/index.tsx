import React, {useContext, useEffect, useState, type FC} from 'react';
import {Form, Button} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
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
	const [selectValue, setSelectValue] = useState<string>('');

	useEffect(() => {
		getUsers();
	}, []);

	const handleSelectCutomer = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedUser = users.find(({_id}) => _id === e.target.value);
		if (selectedUser) {
			setSelectedUser(selectedUser);
		}

		setSelectValue(e.target.value);
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
			<div id='user-select'>
				<Form.Select
					value={selectValue}
					onChange={handleSelectCutomer}
					disabled={isLoading}
				>
					<option disabled={Boolean(selectValue)}>Selecione um aluno</option>
					{ users.map(({_id, name}) => <option key={_id} value={_id}>{name}</option>)}
				</Form.Select>
			</div>

			<div className='flex-center-evenly flex-wrap'>
				<div className='home-button'>
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

				<div className='home-button'>
					<Button
						onClick={() => {
							navigate('/edit-customer');
						}}
						disabled={!selectValue}
					>
						Editar aluno
					</Button>
				</div>

				<div className='home-button'>
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

			<div className='home-button mx-auto'>
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
