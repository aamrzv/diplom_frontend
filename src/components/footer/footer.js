import styles from "./footer.module.css";
export const Footer = () => {
	return (
		<div id={styles.footer}>
			<div id="ramb"></div>
			<div id="g">
				<a
					title="2gis"
					href="http://2gis.ru/rostov/firm/3378228001977062/center/39.739142%2C47.221319/zoom/18"
					className={styles.g2page}
				></a>
			</div>
			<div id="g">
				<a
					title="ya"
					href="https://yandex.ru/maps/org/khoroshiy_shinomontazh/1088676536/reviews/?ll=39.738078%2C47.221711&z=10"
					className={styles.ypage}
				></a>
			</div>
			<div id="g">
				<a
					title="vk"
					href="https://www.vk.com/goodshin"
					className={styles.vpage}
				></a>
			</div>
			<div id="g">
				<a
					title="wa"
					href="https://wa.link/jxvhrq"
					className={styles.WhatsApp}
				></a>
			</div>
			<div id="g">
				<a
					title="tg"
					href="https://t.me/horoshiyshinomontazh"
					className={styles.Telegram}
				></a>
			</div>
			<h3> © 2015 GOOD-SHIN.RU </h3>
			<p>
				*Цены представлены в рублях.
				<br />
				*Наш сайт не является публичной офертой, определяемой
				положениями Статьи 437 (2) ГК РФ, а носит информационный
				характер.
			</p>
		</div>
	);
};
