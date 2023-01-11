import React, {useState, type FC} from 'react';
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Calendar: FC = () => {
	const [dates, setDates] = useState<Date[]>([]);
	const [selectedDate, setSelectDate] = useState<Date>(new Date());

	const handleChangeDate = (date: Date) => {
		console.log(date);
		setSelectDate(date);
	};

	const handleAddButtonClick = () => {
		setDates(prevState => [...prevState, selectedDate]);
	};

	const formatDate = (date: Date) => {
		const day = date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate();
		const month = date.getMonth() <= 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
		const year = date.getFullYear() <= 9 ? `0${date.getFullYear()}` : date.getFullYear();
		return `${day}/${month}/${year}`;
	};

	return (
		<main>
			<ul>
				{
					dates.map(date => (
						<li key={date.getMilliseconds()}>{formatDate(date)}</li>
					))
				}
			</ul>
			<DatePicker
				selected={selectedDate}
				onChange={handleChangeDate}
				dateFormat='dd/MM/yyyy'
			/>
			<Button
				onClick={handleAddButtonClick}
			>
        Adicionar
			</Button>
		</main>
	);
};

export default Calendar;
