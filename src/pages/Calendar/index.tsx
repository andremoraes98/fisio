import React, {useState, type FC} from 'react';
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Calendar.css';
import {useNavigate} from 'react-router-dom';

const Calendar: FC = () => {
	const navigate = useNavigate();

	const [dates, setDates] = useState<Date[]>([]);
	const [selectedDate, setSelectDate] = useState<Date | undefined>(undefined);
	const [totalValue, setTotalValue] = useState<string>('R$ 0,00');
	const [costPerClass, setCostPerClass] = useState<string>('');

	const handleAddButtonClick = () => {
		if (selectedDate) {
			setDates(prevState => [...prevState, selectedDate]);
		}
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

	const formatDate = (date: Date): string => {
		if (!date) {
			const day = (new Date()).getDate() <= 9 ? `0${(new Date()).getDate()}` : (new Date()).getDate();
			const month = (new Date()).getMonth() <= 9 ? `0${(new Date()).getMonth() + 1}` : (new Date()).getMonth() + 1;
			const year = (new Date()).getFullYear() <= 9 ? `0${(new Date()).getFullYear()}` : (new Date()).getFullYear();
			return `${day}/${month}/${year}`;
		}

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
			<div className='flex-column-start'>
				<DatePicker
					id='class-date'
					selected={selectedDate}
					onChange={(date: Date) => {
						setSelectDate(date);
					}}
					dateFormat='dd/MM/yyyy'
					isClearable
					placeholderText='Data da aula'
				/>
			</div>

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
					variant='warning'
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

			<input
				id='cost-per-class'
				className='mt-5'
				type='text'
				placeholder='Valor/aula'
				value={costPerClass}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					setCostPerClass(e.target.value);
				}}
			/>

			<Button
				variant='primary'
				onClick={handleCalculateButtonClick}
				className='mt-2 mb-5'
			>
				Calcular
			</Button>

			<h2>Valor total: {totalValue}</h2>

			<Button
				variant='secondary'
				onClick={() => {
					navigate('/home');
				}}
				className='mt-2 mb-5'
			>
				Home
			</Button>
		</section>
	);
};

export default Calendar;
