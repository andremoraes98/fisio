/* eslint-disable @typescript-eslint/ban-types */
import React, {type Dispatch, type SetStateAction, useContext, type FC} from 'react';
import RSelect, {type GroupBase, type OptionsOrGroups} from 'react-select';
import UserContext from '../../context/User/UserContext';

type ReactSelectProps = {
	options: OptionsOrGroups<{
		value: string | undefined;
		label: string;
	}, GroupBase<{
		value: string | undefined;
		label: string;
	}>> | undefined;
	value: {label: string; value: string | undefined} | null;
	setValue: Dispatch<SetStateAction<{label: string; value: string | undefined} | null>>;
	placeholder: string;
	isClearable?: boolean;
};

const Select: FC<ReactSelectProps> = ({options, setValue, value, placeholder, isClearable}) => {
	const {isLoading} = useContext(UserContext)!;

	return (
		<RSelect
			className='login-input'
			isDisabled={isLoading}
			options={options}
			value={value}
			onChange={target => {
				setValue(target);
			}}
			isClearable={isClearable}
			placeholder={placeholder}
			styles={{
				indicatorsContainer: base => ({...base, padding: '10px 0'}),
			}}
		/>
	);
};

export default Select;
