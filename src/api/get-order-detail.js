import { API_URL, API_METHOD } from "../constants";

export const getOderDetail = async (sessionKey, orderId) => {
	// Выполнение запроса с использованием fetch
	const response = await fetch(
		`${API_URL}${API_METHOD.GET_ORDER_DETAIL}${orderId}`,
		{
			method: "GET", // Метод запроса
			headers: {
				"Content-Type": "application/json", // Устанавливаем тип содержимого как JSON
				Authorization: sessionKey, // Передача ключа сессии в заголовке запроса
			},
		},
	);
	// Обработка ответа
	//return response.json(); // Парсим ответ в формате JSON
	return response;
};
