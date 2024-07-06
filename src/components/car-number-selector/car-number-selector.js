import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ACTION_TYPE } from "../../actions";
import {
	selectCars,
	selectSelectedCar,
	selectSelectedContractor,
} from "../../selectors";
import styles from "./car-number-selector.module.css";

export const CarNumberSelector = ({ contractorId }) => {
	const [isSelectCarNumber, setIsSelectCarNumber] = useState(false);
	const dispatch = useDispatch();
	const stateCars = useSelector(selectCars);
	const [cars, setCars] = useState([]);
	const [filteredCars, setFilteredCars] = useState([]);
	const [searchInput, setSearchInput] = useState("");
	const selectedContractor = useSelector(selectSelectedContractor);
	const selectedCar = useSelector(selectSelectedCar);

	useEffect(() => {
		if (selectedCar) {
			setIsSelectCarNumber(true);
		}
	}, []);

	useEffect(() => {
		setIsSelectCarNumber(false);
	}, [selectedContractor, contractorId]);

	useEffect(() => {
		if (selectedContractor) {
			setCars(
				stateCars.filter(
					(stateCar) =>
						stateCar.contractor ===
						selectedContractor.contractorName,
				) || [
					{
						carNumber: "Выберете контрагента",
						carId: null,
						isSelect: false,
					},
				],
			);
		} else if (contractorId) {
			setCars(
				stateCars.filter(
					(stateCar) => stateCar.contractorId === contractorId,
				) || [
					{
						carNumber: "Выберете контрагента",
						carId: null,
						isSelect: false,
					},
				],
			);
		} else {
			setIsSelectCarNumber(false);
			setCars(
				stateCars.filter((stateCar) => stateCar.clientId !== 0) || [
					{
						carNumber: "нет номеров",
						carId: null,
						isSelect: false,
					},
				],
			);
		}
	}, [stateCars, selectedContractor, contractorId]);

	useEffect(() => {
		if (searchInput.trim() === "") {
			setFilteredCars(cars);
		} else {
			const filtered = cars.filter((car) =>
				car.carNumber.toLowerCase().includes(searchInput.toLowerCase()),
			);
			setFilteredCars(filtered);
		}
	}, [cars, searchInput]);

	// Фильтрация списка автомобилей на основе введенного пользователем текста
	useEffect(() => {
		if (searchInput.trim() === "") {
			setFilteredCars(cars);
		} else {
			const filtered = cars.filter((car) =>
				car.carNumber.toLowerCase().includes(searchInput.toLowerCase()),
			);
			setFilteredCars(filtered);
		}
	}, [cars, searchInput]);

	// Обработчик выбора автомобиля
	const handleCarNumberClik = (carId) => {
		setIsSelectCarNumber(!isSelectCarNumber);
		dispatch({
			type: ACTION_TYPE.SET_CARS_IS_SELECT,
			payload: {
				carId: carId,
				isSelect: !isSelectCarNumber,
			},
		});
	};

	return (
		<div className={styles.content}>
			<div className={styles.selectContainer}>
				<h4 className={styles.nameSelector}>Гос. Номер:</h4>
				{isSelectCarNumber ? (
					<div
						className={`${styles.optionItem} ${styles.optionSelectedItem}`}
						onClick={() => handleCarNumberClik(1)}
					>
						{stateCars.find((carGroup) => carGroup.isSelect)
							?.carNumber ?? "номер не выбран"}
					</div>
				) : (
					<div>
						<input
							className={styles.searchNumber}
							type="number"
							placeholder="Введите номер..."
							value={searchInput}
							onChange={(e) => setSearchInput(e.target.value)}
						/>
						<div className={styles.selectWrapper}>
							{filteredCars.map((car) => (
								<div
									className={
										car.isSelect
											? `${styles.optionItem} ${styles.optionSelectedItem}`
											: `${styles.optionItem}`
									}
									key={car.carId}
									onClick={() =>
										handleCarNumberClik(car.carId)
									}
								>
									{car.carNumber}
								</div>
							))}
						</div>
					</div>
				)}
			</div>
			{isSelectCarNumber ? (
				<div className={styles.nameCar}>
					<h4 className={styles.nameSelector}>Автомобиль:</h4>
					{stateCars.find((carGroup) => carGroup.isSelect)?.car ??
						"номер не выбран"}
				</div>
			) : (
				""
			)}
		</div>
	);
};
