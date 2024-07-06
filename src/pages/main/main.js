import { Map } from "../../components/map/map";
import { DropdownContact } from "../../components/dropdown-contact/dropdown-contact";
import styles from "./main.module.css";
export const Main = () => {
	return (
		<div className={styles.content}>
			<div className="info">
				<p>
					Мы предлагаем широкий спектр услуг по шиномонтажу и ремонту
					автомобилей. Наши опытные специалисты готовы выполнить
					работу любой сложности качественно и в срок. Почему выбирают
					нас?
					<li>Современное оборудование.</li>
					<li>Качественные запчасти и расходные материалы.</li>
					<li>Гарантия на все виды работ.</li>
					Мы работаем с автомобилями любых марок и моделей. <br />
					Будем рады видеть вас в числе наших клиентов!
				</p>
				<div className={styles.wraper}>
					<iframe
						title="YaRating"
						className={styles.frame}
						src="https://yandex.ru/sprav/widget/rating-badge/1088676536?type=rating"
					/>
					<DropdownContact
						className={"bx bx-phone-call"}
						info={"tel"}
					>
						{" "}
						Позвонить нам
					</DropdownContact>
					<DropdownContact
						className={"bx bx-message-dots"}
						info={"msg"}
					>
						{" "}
						Написать нам
					</DropdownContact>
					<DropdownContact className={"bx bx-map"} info={"address"}>
						{" "}
						Наш адрес
					</DropdownContact>
				</div>
				<Map />
			</div>
		</div>
	);
};
