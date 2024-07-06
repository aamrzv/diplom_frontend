import { deleteOrder } from "../api";
import { ACTION_TYPE } from ".";

export const deleteOrderAsync = (userSessionKey, orderId) => (dispatch) => {
	dispatch({ type: ACTION_TYPE.LOADING_START });
	return deleteOrder(userSessionKey, orderId) // Возвращаем промис из createOrder
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
