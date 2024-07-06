import { useEffect, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { ServiceSelector } from "./serviceSelector";
import {
	selectOrderDetail,
	selectPrices,
	selectSelectedCar,
	selectSelectedCarGroup,
	selectSelectedContractor,
	selectSelectedWheelSize,
	selectUser,
} from "../../selectors";
import styles from "./service-selector-list.module.css";
import { ACTION_TYPE, createOrderAsync, editOrderAsync } from "../../actions";
import { pricesFilter } from "../../utils";

export const ServiceSelectorList = ({ buttonSaveType }) => {
	const selectorData = useSelector(selectOrderDetail);
	const selectedCarGroup = useSelector(selectSelectedCarGroup);
	const selectedWheelSize = useSelector(selectSelectedWheelSize);
	const selectedCar = useSelector(selectSelectedCar);
	const selectedContractors = useSelector(selectSelectedContractor);
	const statePrices = useSelector(selectPrices);
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const updateOrderHeader = useCallback(() => {
		dispatch({
			type: ACTION_TYPE.UPDATE_ORDER_HEADER,
			payload: {
				carGroupId: selectedCarGroup.carGroupId,
				wheelSizeId: selectedWheelSize.wheelSizeId
					? Number(selectedWheelSize.wheelSizeId)
					: undefined,
				carId: selectedCar.carId,
				contractor: selectedContractors.contractorName,
			},
		});
	}, [
		dispatch,
		selectedCarGroup,
		selectedWheelSize,
		selectedCar,
		selectedContractors,
	]);

	const updateSelectorData = useCallback(() => {
		const updatedSelectorData = selectorData.detail.map((data) => {
			const newPrice = pricesFilter({
				prices: statePrices,
				payload: {
					carGroupId: selectedCarGroup.carGroupId,
					wheelSizeId: selectedWheelSize.wheelSizeId
						? Number(selectedWheelSize.wheelSizeId)
						: undefined,
					serviceId: data.serviceId,
				},
			});

			return {
				...data,
				price: newPrice?.price ?? 0,
				priceId: newPrice?.priceId ?? 0,
				amount: Number(newPrice?.price) * data.value ?? 0,
			};
		});

		dispatch({
			type: ACTION_TYPE.SET_ORDER_DETAIL,
			payload: updatedSelectorData,
		});
	}, [dispatch, statePrices, selectedCarGroup, selectedWheelSize]);

	useEffect(() => {
		updateOrderHeader();
		updateSelectorData();
	}, [updateOrderHeader, updateSelectorData]);

	const handleSelectService = useCallback(
		(selectorId, serviceId, value) => {
			const newPrice = pricesFilter({
				prices: statePrices,
				payload: {
					carGroupId: selectedCarGroup.carGroupId,
					wheelSizeId: selectedWheelSize.wheelSizeId,
					serviceId: Number(serviceId),
				},
			});
			dispatch({
				type: ACTION_TYPE.UPDATE_SERVICE_IN_ORDER,
				payload: {
					selectorId,
					serviceId,
					value,
					price: newPrice?.price ?? 0,
					priceId: newPrice?.priceId ?? 0,
					amount: Number(newPrice?.price) * value ?? 0,
				},
			});
			updateOrderHeader();
		},
		[dispatch, statePrices, selectedCarGroup, updateOrderHeader],
	);

	const handleAddServiceSelector = useCallback(() => {
		const newSelectorId = uuidv4(); // Генерация уникального идентификатора для нового компонента
		dispatch({
			type: ACTION_TYPE.ADD_SERVICE_IN_ORDER,
			payload: { newSelectorId },
		});
	}, [dispatch]);

	const handleRemoveServiceSelector = useCallback(
		(selectorId) => {
			const newSelectorData = selectorData.detail.filter(
				(data) => data.selectorId !== selectorId,
			);
			dispatch({
				type: ACTION_TYPE.SET_ORDER_DETAIL,
				payload: newSelectorData,
			});
		},
		[dispatch, selectorData.detail],
	);

	const totalAmount = useMemo(() => {
		return selectorData.detail.reduce(
			(total, item) => total + (item.price ?? 0) * (item.value ?? 0),
			0,
		);
	}, [selectorData.detail]);

	const onClickSave = () => {
		if (buttonSaveType === "create") {
			dispatch(createOrderAsync(user.userSessionKey, selectorData)).then(
				(response) => {
					if (response.ok) {
						response.json().then((parsedResponse) => {
							navigate(
								`/orders/contractor/${parsedResponse.contractorId}/${parsedResponse.orderId}`,
							);
						});
					}
				},
			);
		} else if (buttonSaveType === "edit") {
			dispatch(editOrderAsync(user.userSessionKey, selectorData)).then(
				(response) => {
					if (response.ok) {
						response.json().then((parsedResponse) => {
							navigate(
								`/orders/contractor/${parsedResponse.contractorId}`,
							);
						});
					}
				},
			);
		}
	};

	return (
		<>
			{selectorData.detail.map((data) => (
				<div className={styles.selectorContainer} key={data.selectorId}>
					<ServiceSelector
						key={data.selectorId} // Установка уникального ключа для каждого компонента
						data={data}
						selectorId={data.selectorId}
						priceValue={data?.price ?? 0}
						onSelect={(serviceId, value) =>
							handleSelectService(
								data.selectorId,
								serviceId,
								value,
							)
						}
						selectedServices={selectorData.detail}
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
			{selectorData.detail.length > 0 && (
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
		</>
	);
};
