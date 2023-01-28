import React, {useContext, useEffect, useState, type FC} from 'react';
import {Form, Button} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import UserContext from '../../context/UserContext';

const SelectCustomer: FC = () => {
	const {users, getUsers, isLoading} = useContext(UserContext)!;
	const navigate = useNavigate();
	const [selectValue, setSelectValue] = useState<string>('');

	useEffect(() => {
		getUsers();
	}, []);

	return (
		<Form
			onSubmit={() => {
				navigate('/calendar');
			}}
		>
			<Form.Select
				value={selectValue}
				onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
					setSelectValue(e.target.value);
				}}
				disabled={isLoading}
			>
				<option disabled={Boolean(selectValue)}>Selecione um aluno</option>
				{ users.map(({email, name}) => <option key={email} value={name}>{name}</option>)}

			</Form.Select>

			<Button
				type='submit'
				className='m-3'
			>
        Selecionar
			</Button>

			<Button
				type='submit'
				variant='secondary'
				className='m-3'
				onClick={() => {
					navigate('/home');
				}}
			>
        Cancelar
			</Button>
		</Form>
	);
};

export default SelectCustomer;
