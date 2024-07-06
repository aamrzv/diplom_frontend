import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectPrices } from "../../../selectors";
import { pricesFilter } from "../../../utils";

export const BrakePads = () => {
	const statePrices = useSelector(selectPrices);
	const [prices, setPrices] = useState([]);

	useEffect(() => {
		const filteredPrices = pricesFilter({
			prices: statePrices,
			payload: { serviceTypeName: "Колодки" },
		});
		const mergedPrices = mergeCells(filteredPrices, "serviceName");
		setPrices(mergedPrices);
	}, [statePrices]);
	const mergeCells = (data, key) => {
		const result = [];
		let lastValue = null;
		let spanCount = 0;

		data.forEach((item, index) => {
			if (item[key] === lastValue) {
				spanCount++;
			} else {
				if (spanCount > 0) {
					result[result.length - spanCount - 1].rowSpan =
						spanCount + 1;
				}
				lastValue = item[key];
				spanCount = 0;
			}
			result.push({ ...item, rowSpan: 1 });
		});

		if (spanCount > 0) {
			result[result.length - spanCount - 1].rowSpan = spanCount + 1;
		}

		return result;
	};

	return (
		<div className="content-page content-page-height-for-user">
			<h2>Стоимость услуг по замене тормозных колодок</h2>
			<table className="table-price__prices-container">
				<tbody>
					{prices.length !== 0 ? (
						<tr className="table-price__column-name">
							<td className="table-price__service-val">
								Вид услуги
							</td>
							<td className="table-price__service-val">
								Тип автомобиля
							</td>
							<td className="table-price__head-val">Стоимость</td>
						</tr>
					) : (
						""
					)}
					{prices.map(
						({
							carGroupName,
							carGroupId,
							serviceName,
							serviceId,
							price,
							priceId,
							rowSpan,
						}) => {
							if (!carGroupId) {
								return null; // Пропуск элементов с неподходящим carGroupId
							}
							return (
								<tr
									key={`${priceId}${serviceId}${carGroupId}`}
									className="table-price__row"
								>
									{rowSpan > 1 && (
										<td
											rowSpan={rowSpan}
											className="table-price__service-val"
										>
											{serviceName}
										</td>
									)}

									<td className="table-price__service-val">
										{carGroupName}
									</td>
									<td className="table-price__price-val">
										{price}
									</td>
								</tr>
							);
						},
					)}
					{prices.map(
						({
							carGroupId,
							serviceName,
							serviceId,
							price,
							priceId,
						}) => {
							if (!carGroupId) {
								return (
									<tr
										key={`${priceId}${serviceId}`}
										className="table-price__row"
									>
										<td
											colSpan="2"
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
							}
						},
					)}
				</tbody>
			</table>
			<br />
			<p className="table-price__row table-price__footnote">
				*Стоимость замены колодок на автомобилях премиум класса
				договорная.
			</p>
		</div>
	);
};
