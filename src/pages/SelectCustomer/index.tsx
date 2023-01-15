import React, {useState, type FC} from 'react';
import {Form, Button} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

const SelectCustomer: FC = () => {
	const navigate = useNavigate();
	const [selectValue, setSelectValue] = useState<string>('');

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
			>
				<option disabled={Boolean(selectValue)}>Selecione um aluno</option>
				<option value='André'>André</option>
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
