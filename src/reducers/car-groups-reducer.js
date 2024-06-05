import { ACTION_TYPE } from "../actions";

const carGroupsInitialState = [
	{
		carGroupId: null,
		carGroupName: null,
		carGroupDescription: null,
		isSelect: null,
	},
];

export const carGroupsReducer = (
	state = carGroupsInitialState,
	{ type, payload },
) => {
	switch (type) {
		case ACTION_TYPE.SET_CAR_GROUPS:
			return payload;
		case ACTION_TYPE.SET_CAR_GROUPS_IS_SELECT:
			return state.map((carGroup) =>
				carGroup.carGroupId === Number(payload.carGroupId)
					? { ...carGroup, ...payload }
					: { ...carGroup, isSelect: false },
			);
		default:
			return state;
	}
};
