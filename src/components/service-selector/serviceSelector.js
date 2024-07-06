import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ACTION_TYPE } from "../../actions";
import { selectServices } from "../../selectors";
import styles from "./serviceSelector.module.css";

export const ServiceSelector = ({
	data,
	selectorId,
	priceValue,
	onSelect,
	selectedServices,
}) => {
	const [selectedServiceId, setSelectedServiceId] = useState();
	const [availableServices, setAvailableServices] = useState([]);
	const [value, setValue] = useState(1);
	const services = useSelector(selectServices);
	const dispatch = useDispatch();
	//console.log("data", data);
	//console.log("selectorId", selectorId);
	//console.log("priceValue", priceValue);
	//console.log("onSelect", onSelect);
	//console.log("selectedServices", selectedServices);
	useEffect(() => {
		const updatedFilteredServices = services.filter(
			(service) =>
				!selectedServices.some(
					(item1) =>
						item1.serviceId === service.serviceId &&
						item1.selectorId !== selectorId,
				),
		);
		setAvailableServices(updatedFilteredServices);
		//console.log(data);
		setValue(data?.value || value);
		setSelectedServiceId(data?.serviceId);
	}, [services, selectedServices, selectorId, data]);

	const handleChange = (event) => {
		dispatch({
			type: ACTION_TYPE.SET_SERVICES_IS_SELECT,
			payload: { serviceId: selectedServiceId, isSelect: false },
		});
		setSelectedServiceId(event.target.value);
		onSelect(event.target.value, value);
		dispatch({
			type: ACTION_TYPE.SET_SERVICES_IS_SELECT,
			payload: { serviceId: Number(event.target.value), isSelect: true },
		});
	};
	const onDownVal = () => {
		if (value > 1) {
			setValue(value - 1);
			onSelect(selectedServiceId, value - 1);
		}
	};
	const onUpVal = () => {
		setValue(value + 1);
		onSelect(selectedServiceId, value + 1);
	};

	return (
		<div className={styles.content}>
			<select
				className={styles.customSelect}
				value={selectedServiceId}
				onChange={handleChange}
				id={selectorId}
			>
				<option value=""> - </option>
				{availableServices.map(
					({ serviceId, serviceName, isSelect }) => (
						<option key={serviceId} value={serviceId}>
							{serviceName}
						</option>
					),
				)}
			</select>
			<div className={styles.amount}>
				<i className="bx bxs-minus-square" onClick={onDownVal}></i>
				<div className={styles.setVal}>{value}</div>
				<i className="bx bxs-plus-square" onClick={onUpVal}></i>
			</div>
			<div className={styles.priceVal}>{priceValue * value}</div>
		</div>
	);
};
