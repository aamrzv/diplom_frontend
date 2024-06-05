import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CarGroupSelector } from "../../components";
import {
	selectCarGroups,
	selectPrices,
	selectWheelSizes,
} from "../../selectors";
import { ACTION_TYPE, readPricesAsync } from "../../actions";
import styles from "./shinomontazh.module.css";

export const Shinomontazh = () => {
	const stetePrices = useSelector(selectPrices);
	const [prices, setPrices] = useState([]);

	const carGroups = useSelector(selectCarGroups);

	const wheelSizes = useSelector(selectWheelSizes);

	const dispatch = useDispatch();

	useEffect(() => {
		if (stetePrices.find((price) => price.priceGroupId !== 1)) {
			dispatch(readPricesAsync(ACTION_TYPE.SET_PRICES, ""));
		}
	}, [dispatch, stetePrices]);

	useEffect(() => {
		const selectedCarGroup =
			carGroups.find((carGroup) => carGroup.isSelect) || {};
		const selectedWheelSize =
			wheelSizes.find((wheelSize) => wheelSize.isSelect) || {};
		if (selectedCarGroup?.isSelect && Number(selectedWheelSize?.isSelect)) {
			const filteredPrices = stetePrices.filter((price) => {
				return (
					[Number(selectedCarGroup?.carGroupId), 0].includes(
						price.carGroupId,
					) &&
					[Number(selectedWheelSize?.wheelSizeId), 0].includes(
						price.wheelSizeId,
					)
				);
			});
			setPrices(filteredPrices);
		}
	}, [carGroups, wheelSizes, stetePrices]);

	const sumPrices = (serviceIds) => {
		// Фильтруем цены по переданным serviceIds
		const filteredPrices = prices.filter((price) =>
			serviceIds.includes(price.serviceId),
		);

		// Суммируем цены
		const totalPrices = filteredPrices.reduce(
			(total, price) => total + price.price,
			0,
		);

		// Умножаем сумму на 4
		const multipliedTotalPrices = totalPrices * 4;

		// Возвращаем умноженную сумму
		return multipliedTotalPrices;
	};
	return (
		<div className="content-page">
			<h2>Стоимость услуг на шиномонтажные работы</h2>
			<CarGroupSelector />
			<div className={styles.pricesContainer}>
				{prices.length !== 0 ? (
					<div className={styles.columnName}>
						<div>Вид услуги</div>
						<div>Стоимость</div>
					</div>
				) : (
					""
				)}
				{sumPrices([1, 2, 3, 4]) === 0 ? (
					""
				) : (
					<div>
						<div className={styles.row}>
							<div className={styles.serviceVal}>
								Комплекс 1: Сезонная замена шин.
							</div>
							<div className={styles.priceVal}>
								{sumPrices([1, 2, 3, 4])}
							</div>
						</div>
						<div className={styles.row}>
							<div className={styles.serviceVal}>
								Комплекс 2: Смена колес в сборе.
							</div>
							<div className={styles.priceVal}>
								{sumPrices([1, 4])}
							</div>
						</div>
					</div>
				)}
				{prices.map(({ serviceName, serviceId, price, priceId }) => {
					return (
						<div key={priceId} className={styles.row}>
							<div key={serviceId} className={styles.serviceVal}>
								{serviceName}
							</div>
							<div key={priceId} className={styles.priceVal}>
								{price}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
