import { useState, useEffect } from "react";

export const useScreenType = () => {
	const [isMobile, setIsMobile] = useState(false);
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth <= 600) {
				setIsMobile(true);
			} else {
				setIsMobile(false);
			}
		};
		handleResize();
		window.addEventListener("resize", handleResize);

		// Удаляем слушатель события при размонтировании компонента
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return isMobile;
};
