import { getUserLogin } from "../api";
import { ACTION_TYPE } from ".";
export const readUserAsync = (actionType, payload) => (dispatch) => {
	dispatch({ type: ACTION_TYPE.LOADING_START });
	return getUserLogin(payload)
		.then((loadedData) => {
			localStorage.setItem("userLogin", loadedData.userLogin);
			localStorage.setItem("userRole", loadedData.userRole);
			localStorage.setItem("userSessionKey", loadedData.userSessionKey);

			dispatch({ type: actionType, payload: loadedData });
		})
		.finally(() => dispatch({ type: ACTION_TYPE.LOADING_END }));
};
