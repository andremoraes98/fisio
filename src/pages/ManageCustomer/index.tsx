import React, {type FC} from 'react';
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';

const ManageCustomer: FC = () => {
	const navigate = useNavigate();
	return (
		<section className='main-container flex-column-center'>
			<div className='flex-center-evenly flex-wrap'>
				<div className='home-button'>
					<Button
						onClick={() => {
							navigate('/select-customer');
						}}
					>
          Escolher aluno
					</Button>
				</div>

				<div className='home-button'>
					<Button
						onClick={() => {
							navigate('/create-customer');
						}}
					>
          Cadastrar aluno
					</Button>
				</div>
			</div>

			<div className='home-button'>
				<Button
					type='submit'
					variant='secondary'
					onClick={() => {
						navigate(-1);
					}}
				>
					Cancelar
				</Button>
			</div>
		</section>
	);
};

export default ManageCustomer;
