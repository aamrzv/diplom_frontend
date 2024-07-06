import { getOderDetail } from "../api";
import { ACTION_TYPE } from ".";

export const getOderDetailAsync = (orderId) => (dispatch) => {
	dispatch({ type: ACTION_TYPE.LOADING_START });
	return getOderDetail(localStorage.getItem("userSessionKey"), orderId)
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
			} else {
				response.json().then((parsedResponse) => {
					dispatch({
						type: ACTION_TYPE.SET_ORDER,
						payload: parsedResponse,
					});
				});
			}
			//return response; // Возвращаем ответ как результат успешного выполнения
		})
		.finally(() => dispatch({ type: ACTION_TYPE.LOADING_END }));
};
