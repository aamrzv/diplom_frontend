import { useEffect } from "react";

export const useScrollToElement = (elementRef, trigger) => {
	useEffect(() => {
		const contentPage = document.querySelector(".content-page");
		if (elementRef.current && contentPage && trigger) {
			const elementRect = elementRef.current.getBoundingClientRect();
			contentPage.scrollTo({
				top: contentPage.scrollTop + elementRect.top,
				behavior: "smooth",
			});
		}
	}, [elementRef, trigger]);
};
