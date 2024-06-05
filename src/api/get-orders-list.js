import { API_URL, API_METHOD } from "../constants";

export const getOdersList = async (sessionKey, contractorId, offset) => {
	// Выполнение запроса с использованием fetch
	const response = await fetch(`${API_URL}${API_METHOD.GET_ORDERS_LIST}`, {
		method: "POST", // Метод запроса
		headers: {
			"Content-Type": "application/json", // Устанавливаем тип содержимого как JSON
			Authorization: sessionKey, // Передача ключа сессии в заголовке запроса
		},
		body: JSON.stringify({ contractorId, offset }), // Преобразуем данные в JSON-строку
	});

	// Обработка ответа
	//return response.json(); // Парсим ответ в формате JSON
	return response;
};
