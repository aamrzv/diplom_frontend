import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectWheelSizes, selectCarGroups } from "../../selectors";
import { ACTION_TYPE } from "../../actions";
import styles from "./car-group-selector.module.css";

// Импортируем SVG-компоненты
import Car1SVG from "../../assets/images/cars/1.svg";
import Car2SVG from "../../assets/images/cars/2.svg";
import Car3SVG from "../../assets/images/cars/3.svg";
import Car4SVG from "../../assets/images/cars/4.svg";

// Создаем объект, в котором ключами являются car_group_id,
// а значениями соответствующие SVG-компоненты
const carSVG = {
	1: Car1SVG,
	2: Car2SVG,
	3: Car3SVG,
	4: Car4SVG,
	// Добавьте другие SVG-компоненты по мере необходимости
};

export const CarGroupSelector = () => {
	const carGroups = useSelector(selectCarGroups);
	const [selectedCar, setSelectedCar] = useState(
		carGroups.find((carGroup) => carGroup.isSelect) || {},
	);
	const wheelSizes = useSelector(selectWheelSizes);
	const [selectedWheelSizes, setSelectedWheelSizes] = useState("");
	const dispatch = useDispatch();
	useEffect(() => {
		setSelectedWheelSizes(
			wheelSizes.find((item) => item.isSelect)?.wheelSizeId || "",
		);
	}, [wheelSizes]);
	const handleCarSelect = (carGroupId, carGroupName, carGroupDescription) => {
		setSelectedCar({ carGroupId, carGroupName, carGroupDescription });
		dispatch({
			type: ACTION_TYPE.SET_CAR_GROUPS_IS_SELECT,
			payload: {
				carGroupId,
				carGroupName,
				carGroupDescription,
				isSelect: true,
			},
		});
	};

	const handleChange = (event) => {
		setSelectedWheelSizes(event.target.value);
		dispatch({
			type: ACTION_TYPE.SET_WHEEL_SIZES_IS_SELECT,
			payload: {
				wheelSizeId: Number(event.target.value),
				isSelect: true,
			},
		});
	};

	return (
		<div className={styles.content}>
			<h4>Выберите тип автомобиля:</h4>
			<div className={styles.carSelector}>
				{carGroups.map(
					({ carGroupId, carGroupName, carGroupDescription }) => {
						return (
							<div
								key={carGroupId}
								className={
									selectedCar.carGroupId === carGroupId
										? `${styles.carOption} ${styles.carOptionSelected}`
										: styles.carOption
								}
								onClick={() =>
									handleCarSelect(
										carGroupId,
										carGroupName,
										carGroupDescription,
									)
								}
							>
								<img
									src={carSVG[carGroupId]} // Используем значение URL в качестве src
									alt={carGroupName}
								/>
								<p className={styles.groupName}>
									{carGroupName}
								</p>
							</div>
						);
					},
				)}
			</div>
			<div className={styles.wrapper}>
				{selectedCar && (
					<div className={styles.carDescriptionContainer}>
						<input
							type="checkbox"
							id="expandCheckbox"
							className={styles.expandCheckbox}
						/>
						<label
							htmlFor="expandCheckbox"
							className={styles.iconDropdown}
						>
							<i className="bx bxs-caret-down-circle"></i>
						</label>
						<div className={styles.carDescription}>
							{selectedCar.carGroupDescription}{" "}
						</div>
					</div>
				)}
				<div className={styles.selectContainer}>
					<h4 className={styles.nameSelector}>
						Выберите диаметр колеса:
					</h4>
					<select
						className={styles.customSelect}
						value={selectedWheelSizes}
						onChange={handleChange}
					>
						<option value=""> - </option>
						{wheelSizes.map(({ wheelSizeId, wheelSize }) => (
							<option key={wheelSizeId} value={wheelSizeId}>
								{wheelSize}
							</option>
						))}
					</select>
				</div>
			</div>
		</div>
	);
};
