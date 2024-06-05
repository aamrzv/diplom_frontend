import { ACTION_TYPE } from "../actions";

const wheelSizesInitialState = [
	{ wheelSizeId: null, wheelSize: null, isSelect: null },
];

export const wheelSizesReducer = (
	state = wheelSizesInitialState,
	{ type, payload },
) => {
	switch (type) {
		case ACTION_TYPE.SET_WHEEL_SIZES:
			return payload;
		case ACTION_TYPE.SET_WHEEL_SIZES_IS_SELECT:
			return state.map((wheelSize) =>
				wheelSize.wheelSizeId === Number(payload.wheelSizeId)
					? { ...wheelSize, ...payload }
					: { ...wheelSize, isSelect: false },
			);
		default:
			return state;
	}
};
