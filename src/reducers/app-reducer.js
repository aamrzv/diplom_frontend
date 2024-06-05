import { ACTION_TYPE } from "../actions";

const optionsInitialState = {
	isServerError: false,
	isLoading: true,
};

export const appReducer = (state = optionsInitialState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.LOADING_START:
			return {
				...state,
				isLoading: true,
			};
		case ACTION_TYPE.LOADING_END:
			return {
				...state,
				isLoading: false,
			};
		case ACTION_TYPE.SET_SERVER_ERROR:
			return {
				...state,
				isServerError: payload,
			};
		default:
			return state;
	}
};
