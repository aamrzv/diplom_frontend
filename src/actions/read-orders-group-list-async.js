import { getOdersGroupList } from "../api";
import { ACTION_TYPE } from ".";

export const getOdersGroupListAsync = () => (dispatch) => {
	dispatch({ type: ACTION_TYPE.LOADING_START });
	return getOdersGroupList(localStorage.getItem("userSessionKey"))
		.then((response) => {
			if (!response.ok) {
				response.json().then((parsedResponse) => {
					// Если статус не в диапазоне 200-299, считаем это ошибкой
					dispatch({
						type: ACTION_TYPE.SET_SERVER_ERROR,
						payload: `Ошибка: ${parsedResponse.error}`,
					});
				});
				return response;
			}

			return response; // Возвращаем ответ как результат успешного выполнения
		})
		.finally(() => dispatch({ type: ACTION_TYPE.LOADING_END }));
};
