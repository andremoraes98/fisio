import React, {useContext, useEffect, type FC} from 'react';
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';
import UserContext from '../../../context/User/UserContext';

const Training: FC = () => {
	const {checkPermission} = useContext(UserContext)!;
	const navigate = useNavigate();

	useEffect(() => {
		checkPermission(navigate, 'user');
	}, []);
	return (
		<main className='main-container flex-column-center'>
			<div className='flex-column-center' style={{border: '1px solid black', padding: '32px 16px', borderRadius: '32px'}}>
				<h3>Nome do exercício</h3>
				<p>Repetições: 3x12</p>
				<iframe
					width='560'
					height='315'
					src='https://www.youtube.com/embed/fG_03xSzT2s'
					title='YouTube video player'
					frameBorder='0'
					allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
					allowFullScreen
				/>
			</div>
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
