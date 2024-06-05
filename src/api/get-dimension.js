import { handleError, handleResponse } from "../utils";
import { API_URL, API_METHOD } from "../constants";
export const getDimension = (dimensionName) => {
	let url = `${API_URL}${API_METHOD.DIMENSIONS}${dimensionName}`;
	let options = {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	};
	return fetch(url, options).then(handleResponse).catch(handleError);
};
