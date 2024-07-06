import { API_URL, API_METHOD } from "../constants";

export const createUser = async (data = {}) => {
	// Выполнение запроса с использованием fetch
	const response = await fetch(`${API_URL}${API_METHOD.USER_REGISTER}`, {
		method: "POST", // Метод запроса
		headers: {
			"Content-Type": "application/json", // Устанавливаем тип содержимого как JSON
		},
		body: JSON.stringify(data), // Преобразуем данные в JSON-строку
	});

	// Обработка ответа
	return response.json(); // Парсим ответ в формате JSON
};
