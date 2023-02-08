import React, {type FC} from 'react';
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';
import './Home.css';

const Home: FC = () => {
	const navigate = useNavigate();
	return (
		<section className='main-container'>
			<div className='flex-center-around flex-wrap'>
				<div className='home-button'>
					<Button
						onClick={() => {
							navigate('/manage-customer');
						}}
					>
						Gerenciar aluno
					</Button>
				</div>

				<div className='home-button'>
					<Button
						onClick={() => {
							navigate('/manage-class');
						}}
					>
						Gerenciar aulas
					</Button>
				</div>
			</div>
		</section>
	);
};

export default Home;
