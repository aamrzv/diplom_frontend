import { API_URL, API_METHOD } from "../constants";

export const checkUserSession = async (sessionKey) => {
	// Выполнение запроса с использованием fetch
	const response = await fetch(`${API_URL}${API_METHOD.CHECK_USER_SESSION}`, {
		method: "GET", // Метод запроса
		headers: {
			"Content-Type": "application/json", // Устанавливаем тип содержимого как JSON
			Authorization: sessionKey, // Передача ключа сессии в заголовке запроса
		},
	});

	// Обработка ответа
	//return response.json(); // Парсим ответ в формате JSON
	return response;
};
