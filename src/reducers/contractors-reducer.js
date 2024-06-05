import { ACTION_TYPE } from "../actions";

const contractorsInitialState = [
	{
		contractorId: null, //передается в id contractorName чтобы выбирать по группе
		contractorName: null,
		priceGroupId: null,
		isSelect: null,
	},
];

export const contractorsReducer = (
	state = contractorsInitialState,
	{ type, payload },
) => {
	switch (type) {
		case ACTION_TYPE.SET_CONTRACTORS:
			return payload;
		case ACTION_TYPE.SET_CONTRACTORS_IS_SELECT:
			return state.map((contractor) =>
				contractor.contractorName === payload.contractorName
					? { ...contractor, ...payload }
					: { ...contractor, isSelect: false },
			);

		default:
			return state;
	}
};
