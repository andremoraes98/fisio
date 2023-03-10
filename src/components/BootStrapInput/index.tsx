
import React, {type Dispatch, type SetStateAction, type FC} from 'react';
import {FloatingLabel, Form} from 'react-bootstrap';

type ReactSelectProps = {
	id: string;
	value: string | undefined;
	placeholder: string;
	type: string;
	changeStateFunc: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const BootStrapInput: FC<ReactSelectProps> = ({id, value, placeholder, type, changeStateFunc}) => (
	<FloatingLabel
		controlId={id}
		label={placeholder}
		className='login-input'
	>
		<Form.Control
			type={type}
			value={value}
			placeholder={placeholder}
			onChange={changeStateFunc}
		/>
	</FloatingLabel>
);

export default BootStrapInput;
