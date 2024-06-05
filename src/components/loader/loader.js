import styles from "./loader.module.css";

export const Loader = () => {
	return (
		<div className={styles.loaderСontainer}>
			<div className={styles.cercle}>
				<span className={styles.loader}></span>
			</div>
		</div>
	);
};
