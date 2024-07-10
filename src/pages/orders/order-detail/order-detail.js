import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate, Link, Navigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
	ACTION_TYPE,
	deleteOrderAsync,
	getOderDetailAsync,
} from "../../../actions";
import styles from "./order-detail.module.css";
import {
	selectCarGroups,
	selectCars,
	selectOrderDetail,
	selectServices,
	selectUser,
	selectWheelSizes,
} from "../../../selectors";
import { CarGroupSelector, ServiceSelectorList } from "../../../components";
import { ROLE } from "../../../constants/role";

export const OrdersDetail = () => {
	const [isEditing, setIsEditing] = useState(false);
	const order = useSelector(selectOrderDetail);
	const cars = useSelector(selectCars);
	const services = useSelector(selectServices);
	const carGroups = useSelector(selectCarGroups);
	const wheelSizes = useSelector(selectWheelSizes);
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	const params = useParams();
	const navigate = useNavigate();
	useEffect(() => {
		dispatch(getOderDetailAsync(params.orderId));
	}, []);
	const onClickEdit = () => {
		dispatch({
			type: ACTION_TYPE.SET_CAR_GROUPS_IS_SELECT,
			payload: {
				carGroupId: order.carGroupId,
				isSelect: true,
			},
		});
		dispatch({
			type: ACTION_TYPE.SET_WHEEL_SIZES_IS_SELECT,
			payload: {
				wheelSizeId: order.wheelSizeId,
				isSelect: true,
			},
		});
		dispatch({
			type: ACTION_TYPE.SET_CARS_IS_SELECT,
			payload: {
				carId: order.carId,
				isSelect: true,
			},
		});
		setIsEditing(!isEditing);
	};

	const onClickDelete = () => {
		dispatch(deleteOrderAsync(user.userSessionKey, order.orderId)).then(
			(response) => {
				if (response.ok) {
					navigate(`/orders/contractor/${params.contractorId}`);
				}
			},
		);
	};

	const carDetail = useMemo(
		() => cars.find((car) => car.carId === order?.carId),
		[cars, order],
	);
	const carGroupDetail = useMemo(
		() =>
			carGroups.find(
				(carGroup) => carGroup.carGroupId === order?.carGroupId,
			),
		[carGroups, order],
	);
	const wheelSizeDetail = useMemo(
		() =>
			wheelSizes.find(
				(wheelSize) => wheelSize.wheelSizeId === order?.wheelSizeId,
			),
		[wheelSizes, order],
	);
	if (user.userRole === ROLE.GUEST) {
		return <Navigate to="/"></Navigate>;
	}
	return (
		<div className="content-page">
			<p>Акт № {order?.actNumber}</p>
			<p>Заказчик: {order?.contractor}</p>
			<p>Автомобиль: {carDetail?.car}</p>
			<p>Гос. Номер: {carDetail?.carNumber}</p>
			{isEditing ? (
				<>
					<div
						className={styles.left}
						onClick={() => {
							setIsEditing(!isEditing);
						}}
					>
						<i className={`bx bxs-x-circle`}></i>
					</div>
					<CarGroupSelector />{" "}
					<ServiceSelectorList buttonSaveType={"edit"} />
				</>
			) : (
				<div>
					<p>Тип авто: {carGroupDetail?.carGroupName}</p>
					<p>Колеса: {wheelSizeDetail?.wheelSize}</p>
					<div className={styles.orderList}>
						<div className={`${styles.row} ${styles.rowHead}`}>
							<div>№</div>
							<div>Наименование</div>
							<div>кол-во</div>
							<div>Цена, руб</div>
							<div>Сумма, руб.</div>
						</div>
						{order.detail.map((row, index) => (
							<div className={styles.row} key={row.selectorId}>
								<div>{index + 1}</div>
								<div>
									{
										services.find(
											(service) =>
												service.serviceId ===
												row.serviceId,
										)?.serviceName
									}
									{}
								</div>
								<div>{row.value}</div>
								<div>{row.price}</div>
								<div>{row.amount}</div>
							</div>
						))}
					</div>
					<div className={styles.totalSumOrder}>
						Итого {order.orderAmount}
					</div>
					<div className={`${styles.btnContainer}`}>
						<button
							className={`${styles.btn} ${styles.btnAccept}`}
							onClick={() => {
								onClickEdit();
							}}
						>
							<i className="bx bx-edit-alt"></i>
							Изменить
						</button>
						<button
							className={`${styles.btn} ${styles.btnDelete}`}
							onClick={() => {
								onClickDelete();
							}}
						>
							<i className="bx bx-trash"></i>
							Удалить
						</button>
						<Link
							to={`/orders/contractor/${params.contractorId}`}
							className={`${styles.btn} ${styles.btnBack}`}
						>
							<i className="bx bxs-left-arrow-circle "></i>К
							списку заказов
						</Link>
					</div>
				</div>
			)}
		</div>
	);
};
