import React, {type FC} from 'react';
import {Button, Modal} from 'react-bootstrap';

type ConfirmModalProps = {
	show: boolean;
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
	deleteTraining: () => void;
};

const ConfirModal: FC<ConfirmModalProps> = ({show, setShow, deleteTraining}) => {
	const handleDelete = () => {
		deleteTraining();
		setShow(false);
	};

	return (
		<Modal
			show={show}
			onHide={() => {
				setShow(false);
			}}
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title>Confirme sua decisão</Modal.Title>
			</Modal.Header>
			<Modal.Body>Você deseja excluir o exercício?</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={() => {
					setShow(false);
				}}>
            Cancelar
				</Button>
				<Button variant='danger' onClick={handleDelete}>
            Deletar
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ConfirModal;
