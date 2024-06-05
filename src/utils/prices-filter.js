export const pricesFilter = ({ prices, payload }) => {
	// Возвращаем исходный массив, если payload не передан
	if (!payload || !prices) {
		return [];
	}

	const { carGroupId, wheelSizeId, serviceTypeName, serviceId } = payload;

	// Функция, проверяющая соответствие элемента фильтру
	const isFiltered = (price) => {
		let filtered = true; // Изначально считаем, что элемент подходит под фильтр

		// Проверяем каждый фильтр и изменяем значение filtered при необходимости
		if (
			serviceId !== undefined &&
			carGroupId !== undefined &&
			wheelSizeId !== undefined
		) {
			filtered =
				filtered &&
				[Number(serviceId), 0].includes(price.serviceId) &&
				[Number(carGroupId), 0].includes(price.carGroupId) &&
				[Number(wheelSizeId), 0].includes(price.wheelSizeId);
		}

		if (carGroupId !== undefined && wheelSizeId !== undefined) {
			filtered =
				filtered &&
				[Number(carGroupId), 0].includes(price.carGroupId) &&
				[Number(wheelSizeId), 0].includes(price.wheelSizeId);
		}

		if (serviceTypeName !== undefined) {
			filtered = filtered && serviceTypeName === price.serviceTypeName;
		}

		return filtered;
	};

	// Применяем фильтр к массиву цен
	const filteredPrices = prices.filter(isFiltered);

	// Если после фильтрации массив пустой, возвращаем массив с одним элементом, содержащим нулевую цену
	if (filteredPrices.length === 0) {
		return [{ price: 0 }];
	}

	return filteredPrices;
};
