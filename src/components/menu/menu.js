import { Link } from "react-router-dom";
import { useScreenType } from "../../hooks";
import { ReactComponent as Chassis } from "../../assets/images/button-logo/chassis_repair.svg";
import { ReactComponent as Oil } from "../../assets/images/button-logo/oilСhange.svg";
import { ReactComponent as Tire } from "../../assets/images/button-logo/tire.svg";
import { ReactComponent as Brake } from "../../assets/images/button-logo/brake_pad.svg";
import { ReactComponent as Wheel } from "../../assets/images/button-logo/wheel.svg";
import { ReactComponent as Home } from "../../assets/images/button-logo/home.svg";
import styles from "./menu.module.css";

export const Menu = () => {
	const isMobile = useScreenType();
	return (
		<div className={styles.menu}>
			<svg
				className={styles.svgContainer}
				id="menuDiv"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 600.67 114.3"
				preserveAspectRatio="none"
				fill="#ea6565"
			>
				<path d="m587.85.01c1.98-.15,5.28.88,5.62,4.96l7.19,103.71c.15,1.98-.88,5.28-4.96,5.62H4.98c-4.08-.34-5.11-3.64-4.96-5.62L7.94,4.98C8.28.89,11.58-.14,13.56.01h574.29Z" />
			</svg>

			<Link to="/" className={styles.bnt}>
				<Home className={styles.svg} />
				Главная
			</Link>

			<Link to="/tyre_service" className={styles.bnt}>
				<Tire className={styles.svg} />
				{isMobile ? <p>Шино-монтаж</p> : <p>Шиномонтаж</p>}
			</Link>

			<Link to="/oil_сhange" className={styles.bnt}>
				<Oil className={styles.svg} />
				<p>Замена масла</p>
			</Link>
			<Link to="/brake_pads" className={styles.bnt}>
				<Brake className={styles.svg} />
				<p>Замена колодок</p>
			</Link>
			<Link to="/rim_repair" className={styles.bnt}>
				<Wheel className={styles.svg} />
				<p>Ремонт дисков</p>
			</Link>
			<Link to="/chassis_repair" className={styles.bnt}>
				<Chassis className={styles.svg} />
				<p>Ремонт Ходовой</p>
			</Link>
		</div>
	);
};
