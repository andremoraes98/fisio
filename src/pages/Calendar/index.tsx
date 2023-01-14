import React, {useState, type FC} from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Calendar.css';

const Calendar: FC = () => {
	const [dates, setDates] = useState<Date[]>([]);
	const [selectedDate, setSelectDate] = useState<Date>(new Date());
	const [totalValue, setTotalValue] = useState<string>('R$ 0,00');
	const [costPerClass, setCostPerClass] = useState<string>('');

	const handleDateChange = (date: Date) => {
		setSelectDate(date);
	};

	const handleAddButtonClick = () => {
		setDates(prevState => [...prevState, selectedDate]);
	};

	const handleClearButtonClick = () => {
		setDates([]);
	};

	const handleCalculateButtonClick = () => {
		if (costPerClass) {
			const payment = dates.length * Number(costPerClass);
			setTotalValue(`R$ ${payment.toFixed(2)}`.replace('.', ','));
		} else {
			setTotalValue('R$ 0,00');
		}
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
		<section
			id='calendar-content'
			className='flex-column-center'
		>

			<label
				htmlFor='class-date'
				className='flex-column-start'
			>
			Data da aula:
				<DatePicker
					id='class-date'
					selected={selectedDate}
					onChange={handleDateChange}
					dateFormat='dd/MM/yyyy'
				/>
			</label>

			<div>
				<Button
					onClick={handleAddButtonClick}
					variant='success'
					className='m-2'
				>
					Adicionar
				</Button>

				<Button
					onClick={handleClearButtonClick}
					variant='secondary'
					className='m-2'
				>
					Limpar
				</Button>
			</div>

			<ul
				id='dates'
				className='m-0 w-50'
			>
				{
					dates.map((date, index) => (
						<li
							key={index}
							className='flex-center-around m-1'
						>
							{formatDate(date)}
							<div id='calendar-delete-button'>
								<Button
									variant='danger'
									onClick={() => {
										removeDateFromState(index);
									}}
								>
								X
								</Button>
							</div>
						</li>
					))
				}
			</ul>

			<label
				htmlFor='cost-per-class'
				className='flex-column-start mt-5'
			>
				Valor/aula:
				<input
					id='cost-per-class'
					type='text'
					value={costPerClass}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setCostPerClass(e.target.value);
					}}
				/>
			</label>

			<Button
				variant='primary'
				onClick={handleCalculateButtonClick}
				className='mt-2 mb-5'
			>
				Calcular
			</Button>

			<h2>Valor total: {totalValue}</h2>
		</section>
	);
};

export default Calendar;
