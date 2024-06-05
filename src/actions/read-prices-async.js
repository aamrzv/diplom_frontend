import { getPrices } from "../api";
import { ACTION_TYPE } from ".";

export const readPricesAsync = (actionType, payload) => (dispatch) => {
	dispatch({ type: ACTION_TYPE.LOADING_START });
	return getPrices(payload)
		.then((loadedData) => {
			dispatch({ type: actionType, payload: loadedData });
		})
		.finally(() => dispatch({ type: ACTION_TYPE.LOADING_END }));
};
