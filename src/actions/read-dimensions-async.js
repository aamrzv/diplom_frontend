import { getDimension } from "../api";
import { ACTION_TYPE } from ".";

export const readDimensionsAsync =
	(dimensionName, actionType) => (dispatch) => {
		dispatch({ type: ACTION_TYPE.LOADING_START });

		return getDimension(dimensionName)
			.then((loadedData) => {
				dispatch({ type: actionType, payload: loadedData });
			})
			.finally(() => dispatch({ type: ACTION_TYPE.LOADING_END }));
	};
