import styles from "./buttonPagination.module.css";
export const ButtonPagination = ({ text, onClick, disabled }) => {
	return (
		<button className={styles.button} onClick={onClick} disabled={disabled}>
			{text}
		</button>
	);
};
