import { ACTION_TYPE } from "../actions";

const pricesInitialState = [{ test: "нихерашечки" }];

export const pricesReducer = (
	state = pricesInitialState,
	{ type, payload },
) => {
	switch (type) {
		case ACTION_TYPE.SET_PRICES:
			return payload;
		default:
			return state;
	}
};
