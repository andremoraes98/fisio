
import React, {type FC} from 'react';
import {FloatingLabel, Form} from 'react-bootstrap';
import './style.css';

type ReactSelectProps = {
	id: string;
	value: string | undefined;
	placeholder: string;
	type: string;
	changeStateFunc: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const BootStrapInput: FC<ReactSelectProps> = ({id, value, placeholder, type, changeStateFunc, ...rest}) => (
	<FloatingLabel
		controlId={id}
		label={placeholder}
		className='input-forms'
		{...rest}
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
