import { ACTION_TYPE } from "../actions";

const servicesInitialState = [
	{ serviceId: null, serviceName: null, isSelect: null },
];

export const servicesReducer = (
	state = servicesInitialState,
	{ type, payload },
) => {
	switch (type) {
		case ACTION_TYPE.SET_SERVICES:
			return payload;
		case ACTION_TYPE.SET_SERVICES_IS_SELECT:
			return state.map((service) =>
				service.serviceId === Number(payload.serviceId)
					? { ...service, ...payload }
					: service,
			);

		default:
			return state;
	}
};
