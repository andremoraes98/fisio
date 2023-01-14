import React, {type FC} from 'react';
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';
import './Home.css';

const Home: FC = () => {
	const navigate = useNavigate();
	return (
		<section id='home-content'>
			<div className='flex-center-around flex-wrap'>
				<div className='home-button'>
					<Button
						onClick={() => {
							navigate('/select-customer');
						}}
					>
						Selecionar aluno
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

			<div className='flex-center-around flex-wrap'>
				<div className='home-button'>
					<Button
						onClick={() => {
							navigate('/edit-customer');
						}}
					>
	Editar aluno
					</Button>
				</div>

				<div className='home-button'>
					<Button
						onClick={() => {
							navigate('/calendar');
						}}
					>
					Calcular pagamento
					</Button>
				</div>
			</div>
		</section>
	);
};

export default Home;
