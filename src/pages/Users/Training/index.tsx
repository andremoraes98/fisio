import React, {useContext, useEffect, type FC} from 'react';
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';
import ExerciseContext from '../../../context/Exercise/ExerciseContext';
import UserContext from '../../../context/User/UserContext';

const Training: FC = () => {
	const {checkPermission} = useContext(UserContext)!;
	const {exercises} = useContext(ExerciseContext)!;
	const navigate = useNavigate();

	useEffect(() => {
		checkPermission(navigate, 'user');
	}, []);

	return (
		<main className='flex-column-center'>
			<h1>Treino A</h1>
			{exercises.map(({name, link}, index) => (
				<div key={index} className='flex-column-center' style={{border: '1px solid black', padding: '32px 16px', borderRadius: '32px', margin: '32px 16px'}}>
					<h3>{name}</h3>
					<p>Repetições: 3x12</p>
					<iframe
						width='560'
						height='315'
						src={link}
						title='YouTube video player'
						frameBorder='0'
						allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
						allowFullScreen
					/>
				</div>
			))}

			<div className='large-button'>
				<Button
					variant='secondary'
					onClick={() => {
						navigate(-1);
					}}
					className='mt-2 mb-5'
				>
        Voltar
				</Button>
			</div>
		</main>
	);
};

export default Training;
