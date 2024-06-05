export const handleResponse = (response) => {
	if (!response.ok) {
		// Если статус не в диапазоне 200-299, считаем это ошибкой
		console.error("Ошибка получения данных:", response.status);
		// Возвращаем пустой массив или другое значение, которое сигнализирует об ошибке
		return [];
	}
	// Преобразуем ответ в JSON и возвращаем его
	return response.json();
};

export const handleError = (error) => {
	// Обрабатываем ошибки сети и ошибки соединения
	console.error("Ошибка сети:", error);
	// Возвращаем пустой массив или другое значение, которое сигнализирует об ошибке
	return [];
};
