import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ACTION_TYPE, readPricesAsync } from "../../../actions";
import {
	selectContractors,
	selectCars,
	selectUser,
	selectSelectedContractor,
} from "../../../selectors";
import {
	CarGroupSelector,
	SelectCustom,
	CarNumberSelector,
	ServiceSelectorList,
} from "../../../components";
import { ROLE } from "../../../constants/role";
import { Navigate, useNavigate } from "react-router-dom";
import styles from "./order-creater.module.css";

export const OrderCreater = () => {
	const [ordertype, setOrdertype] = useState("Договор");
	const [selectorData, setSelectorData] = useState([]);
	const stateContractors = useSelector(selectContractors);
	const selectedContractors = useSelector(selectSelectedContractor);
	const stateCars = useSelector(selectCars);
	const user = useSelector(selectUser);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(
			readPricesAsync(ACTION_TYPE.SET_PRICES, {
				priceGroupId: selectedContractors?.priceGroupId,
			}),
		);
	}, [stateContractors, dispatch]);

	const handleSelectContractor = useCallback(
		(valueName) => {
			dispatch({
				type: ACTION_TYPE.SET_CONTRACTORS_IS_SELECT,
				payload: {
					contractorName: valueName,
					isSelect: true,
				},
			});

			dispatch({
				type: ACTION_TYPE.SET_CARS_IS_SELECT,
				payload: {
					carId: stateCars.find((carGroup) => carGroup.isSelect)
						?.carId,
					isSelect: false,
				},
			});
			const newData = selectorData.map((data) => ({
				...data,
				contractor: valueName,
			}));
			setSelectorData(newData);
		},
		[selectorData],
	);

	const onIconOrderTypeClick = (selectOrderType) => {
		setOrdertype(selectOrderType);
		if (selectOrderType === "Клиент" && ordertype === "Договор") {
			dispatch({
				type: ACTION_TYPE.SET_CONTRACTORS_IS_SELECT,
				payload: {
					contractorName: 1,
					isSelect: false,
				},
			});
			dispatch({
				type: ACTION_TYPE.SET_CARS_IS_SELECT,
				payload: {
					carId: 1,
					isSelect: false,
				},
			});
		}
	};

	if (user.userRole === ROLE.GUEST) {
		return <Navigate to="/"></Navigate>;
	}

	return (
		<div className={styles.content}>
			<div className={styles.wrapper}>
				<div>
					<div>
						<h4 className={styles.lablelOrderType}>
							Тип заказа: {ordertype}
						</h4>
						<div className={styles.orderTypeIconWrapper}>
							<div
								className={
									ordertype === "Учет"
										? `${styles.orderTypeIcon} ${styles.orderTypeIconSelect} ${styles.green}`
										: `${styles.orderTypeIcon}`
								}
								onClick={() => onIconOrderTypeClick("Учет")}
							>
								<i className="bx bx-money-withdraw"></i>
							</div>
							<div
								className={
									ordertype === "Клиент"
										? `${styles.orderTypeIcon} ${styles.orderTypeIconSelect} ${styles.blue}`
										: `${styles.orderTypeIcon}`
								}
								onClick={() => onIconOrderTypeClick("Клиент")}
							>
								<i className="bx bx-id-card"></i>
							</div>
							<div
								className={
									ordertype === "Договор"
										? `${styles.orderTypeIcon} ${styles.orderTypeIconSelect} ${styles.red}`
										: `${styles.orderTypeIcon}`
								}
								onClick={() => onIconOrderTypeClick("Договор")}
							>
								<i className="bx bx-receipt"></i>
							</div>
						</div>
					</div>

					{ordertype === "Договор" ? (
						<SelectCustom
							label={"Выберете котрагента:"}
							reset={selectedContractors?.contractorName}
							options={stateContractors.map(
								({ contractorId, contractorName }) => ({
									id: contractorId, // переименовываем в id
									name: contractorName, // переименовываем в name
								}),
							)}
							onSelectCallBack={(valueName) =>
								handleSelectContractor(valueName)
							}
						/>
					) : (
						""
					)}
				</div>
				{ordertype === "Договор" || ordertype === "Клиент" ? (
					<CarNumberSelector />
				) : (
					""
				)}
			</div>
			<CarGroupSelector></CarGroupSelector>
			<ServiceSelectorList buttonSaveType={"create"} />
		</div>
	);
};
