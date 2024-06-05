import React, { useState } from "react";
import styles from "./dropdown-contact.module.css";

const ContactInfo = () => {
	return (
		<div className={styles.contactInfo}>
			<div className={styles.wrapper}>Шиномонтаж:</div>
			<div className={styles.wrapper}>
				<a href="tel:+78632796587">
					<p>+7 (863) 279-65-87</p>
				</a>
			</div>
			<div className={styles.wrapper}>
				<a href="tel:+79525661144">
					<p>+7 (952)566-11-44</p>
				</a>
			</div>
			<div className={styles.wrapper}>
				Сервис: <br />
			</div>
			<a href="tel:+79525661133">
				<p>+7 (952)566-11-33 </p>
			</a>
		</div>
	);
};

const MsgInfo = () => {
	return (
		<div className={styles.contactInfo}>
			<div className={styles.wrapper}>Мессенджеры:</div>
			<div className={styles.wrapper}>
				<a
					title="wa"
					rel="noreferrer"
					target="_blank"
					href="https://wa.link/jxvhrq"
				>
					<i className="bx bxl-whatsapp"></i>
					<p>WhatsApp</p>
				</a>
				<a
					title="tg"
					rel="noreferrer"
					target="_blank"
					href="https://t.me/horoshiyshinomontazh"
				>
					<i className="bx bxl-telegram"></i>
					<p>Telegram</p>
				</a>
			</div>
		</div>
	);
};

const AddressInfo = () => {
	return (
		<div className={styles.contactInfo}>
			<div className={styles.wrapper}>Адрес:</div>
			<div className={styles.wrapper}>
				<a
					href="https://2gis.ru/rostov/firm/3378228001977062"
					rel="noreferrer"
					target="_blank"
				>
					<p>Ростов-на-Дону Красных Зорь 110/15</p>
				</a>
			</div>
		</div>
	);
};

export const DropdownContact = ({ className, children, info }) => {
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const handleHover = () => {
		setIsPopupOpen(true);
	};

	const handleLeave = () => {
		setIsPopupOpen(false);
	};

	const handleClick = () => {
		setIsPopupOpen(!isPopupOpen);
	};

	return (
		<div
			className={styles.contact}
			onMouseEnter={handleHover}
			onMouseLeave={handleLeave}
			onClick={handleClick}
		>
			<div className={styles.icon}>
				<i className={className}></i>
			</div>
			<div style={{ cursor: "pointer" }}>{children}</div>
			{isPopupOpen && info === "tel" ? (
				<ContactInfo />
			) : isPopupOpen && info === "msg" ? (
				<MsgInfo />
			) : (
				isPopupOpen && <AddressInfo />
			)}
		</div>
	);
};
