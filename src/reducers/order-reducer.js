import { ACTION_TYPE } from "../actions";
import { v4 as uuidv4 } from "uuid";
const orderInitialState = {
	orderId: undefined,
	orderDate: undefined,
	actNumber: undefined,
	invoiceNumber: undefined,
	contractor: undefined,
	contractorId: undefined,
	clientId: undefined,
	carId: undefined,
	wheelSizeId: 2,
	carGroupId: 1,
	detail: [
		{
			selectorId: uuidv4(),
			serviceId: undefined,
			value: undefined,
			amount: undefined,
			priceId: undefined,
			price: undefined,
		},
	],
};

export const orderReducer = (state = orderInitialState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.RESET_ORDER_STATE:
			return orderInitialState;
		case ACTION_TYPE.SET_ORDER:
			return payload;
		case ACTION_TYPE.UPDATE_ORDER_HEADER:
			return {
				...state,
				//orderId: payload?.orderId || state.orderId,
				//orderDate: payload?.orderDate || state.orderDate,
				//actNumber: payload?.actNumber || state.actNumber,
				//invoiceNumber: payload?.invoiceNumber || state.invoiceNumber,
				contractor: payload?.contractor || state.contractor,
				//contractorId: payload?.contractorId || state.contractorId,
				//clientId: payload?.clientId || state.clientId,
				carId: payload?.carId || state.carId,
				wheelSizeId: payload?.wheelSizeId || state.wheelSizeId,
				carGroupId: payload?.carGroupId || state.carGroupId,
			};
		case ACTION_TYPE.SET_ORDER_DETAIL:
			return { ...state, detail: payload };
		case ACTION_TYPE.UPDATE_SERVICE_IN_ORDER: {
			const newData = state.detail.map((data) =>
				data.selectorId === payload.selectorId
					? {
							...data,
							serviceId: Number(payload.serviceId),
							value: payload.value,
							amount: payload.amount,
							price: payload.price,
							priceId: payload.priceId,
						}
					: data,
			);
			return {
				...state,
				detail: newData,
			};
		}
		case ACTION_TYPE.ADD_SERVICE_IN_ORDER:
			return {
				...state,
				detail: [
					...state.detail,
					{
						selectorId: payload.newSelectorId,
						serviceId: 0,
						value: 1,
						amount: 0,
						priceId: 0,
						price: 0,
					},
				],
			};
		default:
			return state;
	}
};
