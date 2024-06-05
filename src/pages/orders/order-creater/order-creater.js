import { useState, useEffect, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	ACTION_TYPE,
	readPricesAsync,
	createOrderAsync,
} from "../../../actions";
import { v4 as uuidv4 } from "uuid";
import { pricesFilter } from "../../../utils";
import {
	selectPrices,
	selectWheelSizes,
	selectCarGroups,
	selectServices,
	selectContractors,
	selectCars,
	selectUser,
} from "../../../selectors";
import {
	ServiceSelector,
	CarGroupSelector,
	SelectCustom,
	CarNumberSelector,
} from "../../../components";
import { ROLE } from "../../../constants/role";
import { Navigate } from "react-router-dom";
import styles from "./order-creater.module.css";

export const OrderCreater = () => {
	const [isReset, setIsReset] = useState(false);
	const [ordertype, setOrdertype] = useState("Договор");
	const carGroups = useSelector(selectCarGroups);
	const [selectedCarGroup, setSelectedCarGroup] = useState({});
	const [selectedWheelSize, setSelectedWheelSize] = useState({});
	const wheelSizes = useSelector(selectWheelSizes);

	const [selectorData, setSelectorData] = useState([]);
	const stetePrices = useSelector(selectPrices);
	const stateServices = useSelector(selectServices);
	const stateContractors = useSelector(selectContractors);
	const [selectedContractors, setSelectedContractors] = useState(" ");
	const stateCars = useSelector(selectCars);
	const user = useSelector(selectUser);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(
			readPricesAsync(ACTION_TYPE.SET_PRICES, {
				priceGroupId: stateContractors.find(
					(contractor) => contractor.isSelect,
				)?.priceGroupId,
			}),
		);
	}, [stateContractors, dispatch]);

	useEffect(() => {
		const newSelectedCarGroup =
			carGroups.find((carGroup) => carGroup.isSelect) || {};
		setSelectedCarGroup(newSelectedCarGroup);
	}, [carGroups]);

	useEffect(() => {
		const newSelectedWheelSize =
			wheelSizes.find((wheelSize) => wheelSize.isSelect) || {};
		setSelectedWheelSize(newSelectedWheelSize);
	}, [wheelSizes]);

	useEffect(() => {
		updateSelectorData(
			selectedCarGroup.carGroupId,
			selectedWheelSize.wheelSizeId,
			stateCars.find((stateCar) => stateCar.isSelect)?.carId,
		);
	}, [selectedCarGroup, selectedWheelSize, stateServices, stateCars]);

	useEffect(() => {
		handleAddServiceSelector();
	}, []);

	const updateSelectorData = (newCarGroupId, newWheelSizeId, newCarId) => {
		const updatedData = selectorData.map((data) => {
			let updatedData = { ...data };

			if (newCarGroupId && data.selectorId) {
				updatedData = { ...updatedData, carGroupId: newCarGroupId };
			}

			if (newWheelSizeId && data.selectorId) {
				updatedData = {
					...updatedData,
					wheelSizeId: Number(newWheelSizeId),
				};
			}

			if (newCarId && data.selectorId) {
				updatedData = {
					...updatedData,
					carId: newCarId,
					contractor: selectedContractors,
				};
			} else {
				updatedData = { ...updatedData, carId: 0, contractor: 0 };
			}

			return updatedData;
		});

		const updatedSelectorData = updatedData.map((data) => {
			if (data.carGroupId && data.serviceId && data.wheelSizeId) {
				const newPrice = pricesFilter({
					prices: stetePrices,
					payload: {
						carGroupId: data.carGroupId,
						wheelSizeId: data.wheelSizeId,
						serviceId: data.serviceId,
					},
				})[0];

				return {
					...data,
					price: newPrice?.price ?? 0,
					priceId: newPrice?.priceId ?? 0,
					amount: Number(newPrice?.price) * data.value ?? 0,
				};
			}
			return data;
		});

		setSelectorData(updatedSelectorData);
	};

	const handleSelectService = useCallback(
		(selectorId, serviceId, value) => {
			const newData = selectorData.map((data) =>
				data.selectorId === selectorId
					? {
							...data,
							serviceId: Number(serviceId),
							value,
							amount: Number(data?.price) * value ?? 0,
						}
					: data,
			);
			setSelectorData(newData);
		},
		[selectorData],
	);

	const handleSelectContractor = useCallback(
		(valueName) => {
			setSelectedContractors(valueName);
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

	const handleAddServiceSelector = useCallback(() => {
		const newSelectorId = uuidv4(); // Генерация уникального идентификатора для нового компонента

		setSelectorData((prevData) => [
			...prevData,
			{ selectorId: newSelectorId, serviceId: 0, value: 1 },
		]);
	}, []);

	const handleRemoveServiceSelector = useCallback((selectorId) => {
		setSelectorData((prevData) =>
			prevData.filter((data) => data.selectorId !== selectorId),
		);
	}, []);

	const totalAmount = useMemo(() => {
		return selectorData.reduce(
			(total, item) => total + (item.price ?? 0) * (item.value ?? 0),
			0,
		);
	}, [selectorData]);

	const onIconTypeClik = (selectOrderType) => {
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
			setSelectedContractors("");
		}
	};

	const onClickSave = () => {
		dispatch(createOrderAsync(user.userSessionKey, selectorData)).then(
			(response) => {
				if (response.ok) {
					setIsReset(!isReset);
					setSelectedContractors("");
					setSelectorData([]);
				}
			},
		);
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
								onClick={() => onIconTypeClik("Учет")}
							>
								<i className="bx bx-money-withdraw"></i>
							</div>
							<div
								className={
									ordertype === "Клиент"
										? `${styles.orderTypeIcon} ${styles.orderTypeIconSelect} ${styles.blue}`
										: `${styles.orderTypeIcon}`
								}
								onClick={() => onIconTypeClik("Клиент")}
							>
								<i className="bx bx-id-card"></i>
							</div>
							<div
								className={
									ordertype === "Договор"
										? `${styles.orderTypeIcon} ${styles.orderTypeIconSelect} ${styles.red}`
										: `${styles.orderTypeIcon}`
								}
								onClick={() => onIconTypeClik("Договор")}
							>
								<i className="bx bx-receipt"></i>
							</div>
						</div>
					</div>

					{ordertype === "Договор" ? (
						<SelectCustom
							label={"Выберете котрагента:"}
							reset={isReset}
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
					<CarNumberSelector
						selectedContractor={selectedContractors}
					/>
				) : (
					""
				)}
			</div>
			<CarGroupSelector></CarGroupSelector>
			{selectorData.map((data) => (
				<div className={styles.selectorContainer} key={data.selectorId}>
					<ServiceSelector
						key={data.selectorId} // Установка уникального ключа для каждого компонента
						selectorId={data.selectorId}
						priceValue={data?.price ?? 0}
						onSelect={(serviceId, value) =>
							handleSelectService(
								data.selectorId,
								serviceId,
								value,
							)
						}
						selectedServices={selectorData}
					/>
					<button
						className={styles.deleteBtn}
						onClick={() =>
							handleRemoveServiceSelector(data.selectorId)
						}
					>
						<i className="bx bxs-x-circle"></i>
					</button>
				</div>
			))}
			{selectorData.length > 0 && (
				<div className={styles.total}>
					Итого <span>{totalAmount}</span>
					<button className={styles.saveBtn} onClick={onClickSave}>
						<i className="bx bx-save"></i>
					</button>
				</div>
			)}

			<button
				className={styles.addBtn}
				onClick={handleAddServiceSelector}
			>
				<i className="bx bx-plus-medical"></i>Добавить работы
			</button>
		</div>
	);
};
