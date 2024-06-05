import { createOrder } from "../api";
import { ACTION_TYPE } from ".";

export const createOrderAsync = (userSessionKey, payload) => (dispatch) => {
	dispatch({ type: ACTION_TYPE.LOADING_START });
	return createOrder(userSessionKey, payload) // Возвращаем промис из createOrder
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

			dispatch({
				type: ACTION_TYPE.SET_CONTRACTORS_IS_SELECT,
				payload: {
					contractorName: 1,
					isSelect: false,
				},
			});

			return response; // Возвращаем ответ как результат успешного выполнения
		})
		.finally(() => dispatch({ type: ACTION_TYPE.LOADING_END }));
};
