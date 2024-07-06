import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ButtonPagination } from "../../../components";
import { getOdersListAsync } from "../../../actions";
import styles from "./orders-list.module.css";

export const OrdersList = () => {
	const [orderList, setOrderList] = useState([]);
	const [page, setPage] = useState(0);
	const [isListEnd, setIslistEnd] = useState(false);
	const dispatch = useDispatch();
	const params = useParams();

	useEffect(() => {
		dispatch(getOdersListAsync(params.contractorId, page)).then(
			(response) => {
				if (response.ok) {
					response.json().then((parsedResponse) => {
						if (orderList.length > 0) {
							setOrderList([...orderList, ...parsedResponse]);
						} else setOrderList(parsedResponse);
						if (parsedResponse.length === 0) {
							setIslistEnd(true);
						}
					});
				}
			},
		);
	}, [page]);
	return (
		<div className="content-page">
			<p>Список заказов {orderList[0]?.contractorName}</p>
			<div className={styles.orderList}>
				<div className={`${styles.row} ${styles.rowHead}`}>
					<div>Дата</div>
					<div>Акт</div>
					<div>Автомобиль</div>
					<div>Сумма</div>
					<div>Оплачен</div>
					<div></div>
				</div>
				{orderList.map((order) => (
					<div className={styles.row} key={order.orderId}>
						<div>{order.orderDate}</div>
						<div>{order.actNumber}</div>
						<div>
							<span>{order.carNamber}</span>
							<span>{order.car}</span>
						</div>
						<div>{order.orderAmount}</div>
						<div>
							{order.isPayid === 0 ? (
								<i
									className={`bx bx-x-circle ${styles.isPayidNo}`}
								/>
							) : order.isPayid === 1 ? (
								<i
									className={`bx bx-check-circle ${styles.isPayidYes}`}
								/>
							) : null}
						</div>
						<Link
							to={`${order.orderId}`}
							className="bx bx-edit"
						></Link>
					</div>
				))}
			</div>
			<ButtonPagination
				text={isListEnd ? "Конец списка" : "Загрузить еще"}
				onClick={() => setPage(page + 10)}
				disabled={isListEnd}
			></ButtonPagination>
		</div>
	);
};
