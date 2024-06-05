import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../selectors";
import { ReactComponent as Logo } from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";
import { resetUser } from "../../actions";
import styles from "./header.module.css";
import { useScreenType } from "../../hooks";

export const Header = () => {
	const user = useSelector(selectUser);
	const [menuIsActive, setMenuIsActive] = useState(false);
	useEffect(() => {}, [user]);
	const isMobile = useScreenType();
	const dispatch = useDispatch();

	const onLogoutClick = () => {
		setMenuIsActive(!menuIsActive);
		dispatch(resetUser());
	};

	const handleLeave = () => {
		if (isMobile) {
			setMenuIsActive(false);
		}
	};

	return (
		<div className={styles.header}>
			<svg
				className={styles.svgContainer}
				id="menuDiv"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 600.67 114.3"
				preserveAspectRatio="none"
				fill="#ea6565"
			>
				<path d="m12.82,114.29c-1.98.15-5.28-.88-5.62-4.96L.01,5.62C-.14,3.64.89.34,4.98,0h590.72c4.08.34,5.11,3.64,4.96,5.62l-7.93,103.71c-.34,4.08-3.64,5.11-5.62,4.96H12.82Z" />{" "}
			</svg>
			<div>
				<Logo className={styles.logo}></Logo>
			</div>
			<div className={styles.wrapper}>
				<h1>Хороший шиномонтаж</h1>
				<h3>станция технического обслуживания</h3>
			</div>
			{!user.userLogin ? (
				<Link to="/authorization" className={styles.optionIcon}>
					<i className="bx bx-log-in-circle"></i> <div>Войти</div>
				</Link>
			) : (
				<div>
					<div
						className={
							menuIsActive
								? `${styles.menuIcon} ${styles.menuIconActive}`
								: `${styles.menuIcon}`
						}
						onMouseLeave={() => handleLeave()}
						onClick={() => {
							setMenuIsActive(!menuIsActive);
						}}
					>
						<span></span>
						<span></span>
						<span></span>
					</div>
				</div>
			)}

			<div
				className={
					menuIsActive
						? `${styles.controlPanel} ${styles.controlPanelActive}`
						: `${styles.controlPanel}`
				}
				onMouseLeave={() => {
					setMenuIsActive(false);
				}}
			>
				<div>
					<i className="bx bx-user-circle"></i>
					<p>{user.userLogin}</p>
				</div>
				<Link
					to="/"
					onClick={() => {
						onLogoutClick();
					}}
				>
					<i className="bx bx-log-out-circle"></i> <p>выход</p>
				</Link>
				<Link to="/orders">
					<i className="bx bx-receipt"></i> <p>заказы</p>
				</Link>
				<div>
					<i className="bx bx-food-menu"></i>
					<p>прайсы</p>
				</div>
				<div>
					<i className="bx bxs-contact"></i> <p>контрагенты</p>
				</div>
			</div>
		</div>
	);
};
