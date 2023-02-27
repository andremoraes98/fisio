import React, {type FC} from 'react';
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';
import './Home.css';

const Home: FC = () => {
	const navigate = useNavigate();

	const execLogoffActions = () => {
		localStorage.removeItem('token');
		navigate('/login');
	};

	return (
		<section className='main-container flex-column-center'>
			<div className='flex-center-evenly flex-wrap'>
				<div className='large-button'>
					<Button
						onClick={() => {
							navigate('/manage-customer');
						}}
					>
						Gerenciar aluno
					</Button>
				</div>

				<div className='large-button'>
					<Button
						onClick={() => {
							navigate('/manage-class');
						}}
					>
						Gerenciar exercícios
					</Button>
				</div>
			</div>

			<div className='large-button'>
				<Button
					variant='danger'
					onClick={execLogoffActions}
				>
					Logoff
				</Button>
			</div>
		</section>
	);
};

export default Home;
