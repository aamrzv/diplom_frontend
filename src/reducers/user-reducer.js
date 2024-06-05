import { ACTION_TYPE } from "../actions";
import { ROLE } from "../constants/role";

const userInitialState = {
	userLogin: null,
	userRole: ROLE.GUEST,
	userSessionKey: null,
};

export const userReducer = (state = userInitialState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.SET_USER:
			return payload;
		case ACTION_TYPE.RESET_USER:
			return userInitialState;
		default:
			return state;
	}
};
