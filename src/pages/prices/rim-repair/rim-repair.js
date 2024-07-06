import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectPrices } from "../../../selectors";
import { pricesFilter } from "../../../utils";

export const RimRepair = () => {
	const stetePrices = useSelector(selectPrices);
	const [prices, setPrices] = useState([]);

	useEffect(() => {
		const val = pricesFilter({
			prices: stetePrices,
			payload: { serviceTypeName: "Диски" },
		});
		setPrices(val);
	}, [stetePrices]);

	return (
		<div className="content-page content-page-height-for-user">
			<h2>Стоимость услуг на ремонт дисков</h2>
			<table className="table-price__prices-container">
				<tbody>
					{prices.length !== 0 ? (
						<tr className="table-price__column-name">
							<td className="table-price__service-val">Тип</td>
							<td className="table-price__service-val">Радиус</td>
							<td className="table-price__head-val">Цена</td>
						</tr>
					) : (
						""
					)}

					{prices.map(
						({
							wheelTypeName,
							wheelSize,
							wheelSizeId,
							price,
							priceId,
						}) => {
							return (
								<tr
									key={`${priceId}${wheelSizeId}`}
									className="table-price__row"
								>
									<td
										key={wheelTypeName}
										className="table-price__service-val"
									>
										{wheelTypeName}
									</td>
									<td
										key={wheelSizeId}
										className="table-price__service-val"
									>
										{wheelSize}
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
			<p className="table-price__row table-price__footnote">
				*Стоимость услуг по ремонту дисков представлена без учета
				шиномонтажных работ (снятие колеса с автомобиля, демонтаж и
				монтаж покрышки, балансировка колеса).
			</p>
		</div>
	);
};
