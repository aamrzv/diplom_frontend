import { API_URL, API_METHOD } from "../constants";

export const deleteOrder = async (sessionKey, orderId) => {
	// Выполнение запроса с использованием fetch
	const response = await fetch(
		`${API_URL}${API_METHOD.DELETE_ORDER}${orderId}`,
		{
			method: "DELETE", // Метод запроса
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
