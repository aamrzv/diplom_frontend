import { ACTION_TYPE } from ".";

export const resetUser = () => (dispatch) => {
	dispatch({ type: ACTION_TYPE.RESET_USER });
	localStorage.removeItem("userLogin");
	localStorage.removeItem("userRole");
	localStorage.removeItem("userSessionKey");
};
