import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CarGroupSelector } from "../../../components";
import {
	selectCarGroups,
	selectPrices,
	selectWheelSizes,
} from "../../../selectors";
import { ACTION_TYPE, readPricesAsync } from "../../../actions";

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
		<div className="content-page content-page-height-for-user">
			<h2>Стоимость услуг на шиномонтажные работы</h2>
			<CarGroupSelector />
			<table className="table-price__prices-container">
				<tbody>
					{prices.lengtd !== 0 ? (
						<tr className="table-price__column-name">
							<td className="table-price__service-val">
								Вид услуги
							</td>
							<td className="table-price__head-val">Стоимость</td>
						</tr>
					) : (
						""
					)}
					{sumPrices([1, 2, 3, 4]) === 0 ? (
						""
					) : (
						<>
							<tr className="table-price__row">
								<td className="table-price__service-val">
									Комплекс 1: Сезонная замена шин.
								</td>
								<td className="table-price__price-val">
									{sumPrices([1, 2, 3, 4])}
								</td>
							</tr>
							<tr className="table-price__row">
								<td className="table-price__service-val">
									Комплекс 2: Смена колес в сборе.
								</td>
								<td className="table-price__price-val">
									{sumPrices([1, 4])}
								</td>
							</tr>
						</>
					)}
					{prices.map(
						({ serviceName, serviceId, price, priceId }) => {
							return (
								<tr key={priceId} className="table-price__row">
									<td
										key={serviceId}
										className="table-price__service-val"
									>
										{serviceName}
									</td>
									<td
										key={priceId}
										className="table-price__price-val"
									>
										{price}
									</td>
								</tr>
							);
						},
					)}
				</tbody>
			</table>
		</div>
	);
};
