import { useScreenType } from "../../hooks";
import styles from "./map.module.css";

export const Map = () => {
	const isMobile = useScreenType();
	return (
		<div className={styles.map}>
			<a
				className={styles.mapLink}
				href="https://2gis.ru/rostov/firm/3378228001977062"
				rel="noreferrer"
				target="_blank"
			>
				Мы в 2GIS
			</a>
			<iframe
				className={styles.map}
				title="Map"
				src={`https://static.maps.2gis.com/1.0?s=${isMobile ? "360" : "920"}x280&c=47.22169,39.73824&z=18&pt=47.22172,39.73822`}
			/>
		</div>
	);
};
