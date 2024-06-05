import { useEffect, useState } from "react";
import styles from "./orders.module.css";
import { getOdersGroupListAsync } from "../../../actions";
import { useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";

export const Orders = () => {
	const [orderList, setOrderList] = useState([]);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getOdersGroupListAsync()).then((response) => {
			if (response.ok) {
				response.json().then((parsedResponse) => {
					setOrderList(parsedResponse);
				});
			}
		});
	}, [dispatch]);
	return (
		<div className="content-page">
			<h2>Списки заказов</h2>
			<div className={styles.orderList}>
				<Link to="create" className={styles.createOrderBtn}>
					<i className="bx bx-plus-medical"></i>
					<p>Создать заказ</p>
				</Link>
				{orderList.map((order) => (
					<Link
						to={`contractor/${order.contractorId}`}
						className={styles.optionItem}
						key={order.contractorId}
					>
						<div>
							<i className="bx bx-receipt"></i>
							<p>{order.contractor}</p>
						</div>
						<div>{order.contractorName}</div>
						<div>
							{order.orderAmount > 0
								? `Дебет ${order.orderAmount}`
								: " "}
						</div>
					</Link>
				))}
			</div>
			<Outlet />
		</div>
	);
};
