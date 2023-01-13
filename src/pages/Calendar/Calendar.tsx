import React, {useState, type FC} from 'react';
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Calendar: FC = () => {
	const [dates, setDates] = useState<Date[]>([]);
	const [selectedDate, setSelectDate] = useState<Date>(new Date());

	const handleDateChange = (date: Date) => {
		setSelectDate(date);
	};

	const handleAddButtonClick = () => {
		setDates(prevState => [...prevState, selectedDate]);
	};

	const handleCelarButtonClick = () => {
		setDates([]);
	};

	const formatDate = (date: Date) => {
		const day = date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate();
		const month = date.getMonth() <= 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
		const year = date.getFullYear() <= 9 ? `0${date.getFullYear()}` : date.getFullYear();
		return `${day}/${month}/${year}`;
	};

	const removeDateFromState = (index: number) => {
		const newDates = dates.filter((_date, hofIndex) => index !== hofIndex);
		setDates(newDates);
	};

	return (
		<section className='mx-auto'>
			<ul className='m-0'>
				{
					dates.map((date, index) => (
						<li key={index}>
							{formatDate(date)}
							<Button
								variant='danger'
								onClick={() => {
									removeDateFromState(index);
								}}
							>
								X
							</Button>
						</li>
					))
				}
			</ul>

			<DatePicker
				selected={selectedDate}
				onChange={handleDateChange}
				dateFormat='dd/MM/yyyy'
			/>

			<input
				type='number'
			/>

			<Button
				onClick={handleAddButtonClick}
				variant='success'
				className='m-2'
			>
        Adicionar
			</Button>

			<Button
				onClick={handleCelarButtonClick}
				variant='secondary'
				className='m-2'
			>
        Limpar
			</Button>
		</section>
	);
};

export default Calendar;
