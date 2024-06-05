import { ACTION_TYPE } from "../actions";

const carsInitialState = [
	{
		carId: null,
		carNumber: null,
		contractor: null,
		clientId: null,
		car: null,
		isSelect: null,
	},
];

export const carsReducer = (state = carsInitialState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.SET_CARS:
			return payload;
		case ACTION_TYPE.SET_CARS_IS_SELECT:
			return state.map((car) =>
				car.carId === Number(payload.carId)
					? { ...car, ...payload }
					: { ...car, isSelect: false },
			);

		default:
			return state;
	}
};
