import { API_URL, API_METHOD } from "../constants";

export const editOrder = async (sessionKey, data = {}) => {
	// Выполнение запроса с использованием fetch
	const response = await fetch(`${API_URL}${API_METHOD.UPDATE_ORDER}`, {
		method: "PUT", // Метод запроса
		headers: {
			"Content-Type": "application/json", // Устанавливаем тип содержимого как JSON
			Authorization: sessionKey, // Передача ключа сессии в заголовке запроса
		},
		body: JSON.stringify(data), // Преобразуем данные в JSON-строку
	});

	// Обработка ответа
	//return response.json(); // Парсим ответ в формате JSON
	return response;
};
