import { useState, useEffect } from "react";
import styles from "./select-custom.module.css";

export const SelectCustom = ({
	label,
	options,
	onSelectCallBack,
	isMultiple,
	reset,
}) => {
	const [selectValue, setSelectValue] = useState("");
	useEffect(() => {
		setSelectValue("");
	}, [reset]);
	const handleChange = (event) => {
		const newValue = event.target.value;
		setSelectValue(newValue);
		if (onSelectCallBack) {
			onSelectCallBack(newValue);
		}
	};

	return (
		<div className={styles.selectContainer}>
			<h4 className={styles.nameSelector}>{label}</h4>
			<select
				className={styles.customSelect}
				multiple={isMultiple}
				value={selectValue}
				onChange={handleChange}
				id={label}
			>
				<option value=""> - </option>
				{options.map(({ id, name }) => (
					<option key={id} value={id}>
						{name}
					</option>
				))}
			</select>
		</div>
	);
};

SelectCustom.defaultProps = {
	isMultiple: false,
};
