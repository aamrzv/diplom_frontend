import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectPrices } from "../../../selectors";
import { pricesFilter } from "../../../utils";

export const OilСhange = () => {
	const stetePrices = useSelector(selectPrices);
	const [prices, setPrices] = useState([]);

	useEffect(() => {
		const val = pricesFilter({
			prices: stetePrices,
			payload: { serviceTypeName: "Жидкости" },
		});
		setPrices(val);
	}, [stetePrices]);

	return (
		<div className="content-page content-page-height-for-user">
			<h2>Стоимость услуг на замену жидкостей</h2>
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
					{prices.map(
						({ serviceName, serviceId, price, priceId }) => {
							return (
								<tr
									key={`${priceId}${serviceId}`}
									className="table-price__row"
								>
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
			<br></br>
			<p className="table-price__row table-price__footnote"></p>
		</div>
	);
};
