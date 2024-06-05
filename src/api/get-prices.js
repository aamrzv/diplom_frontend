import { handleError, handleResponse } from "../utils";
import { API_URL, API_METHOD } from "../constants";

export const getPrices = (payload) => {
	const { carGroupId, wheelSizeId, wheelTypeId, priceGroupId } = payload;

	let url = `${API_URL}${API_METHOD.PRICES}`;
	if (carGroupId) {
		url += `car_group_id=${carGroupId}&`;
	}
	if (wheelSizeId) {
		url += `wheel_size_id=${wheelSizeId}&`;
	}
	if (wheelTypeId) {
		url += `wheel_type_id=${wheelTypeId}&`;
	}
	if (priceGroupId) {
		url += `price_group_id=${priceGroupId}&`;
	}
	let options = {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	};
	return fetch(url, options).then(handleResponse).catch(handleError);
};
