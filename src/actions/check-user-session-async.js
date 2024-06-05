import { checkUserSession } from "../api";
import { ACTION_TYPE, resetUser } from ".";

export const checkUserSessionAsync = () => (dispatch) => {
	const userlocalStorage = {
		userLogin: localStorage.getItem("userLogin"),
		userRole: localStorage.getItem("userRole"),
		userSessionKey: localStorage.getItem("userSessionKey"),
	};
	return checkUserSession(userlocalStorage.userSessionKey).then(
		(response) => {
			if (response.ok) {
				dispatch({
					type: ACTION_TYPE.SET_USER,
					payload: userlocalStorage,
				});
			} else {
				resetUser();
			}
		},
	);
};
