import { createSelector } from "reselect";

export const selectIsLoading = ({ appOptions }) => appOptions.isLoading;

export const selectIsServerError = ({ appOptions }) => appOptions.isServerError;

export const selectCarGroups = ({ carGroups }) => carGroups;

export const selectWheelSizes = ({ wheelSizes }) => wheelSizes;

export const selectServices = ({ services }) => services;

export const selectContractors = ({ contractors }) => contractors;

export const selectPrices = ({ prices }) => prices;

export const selectCars = ({ cars }) => cars;

export const selectUser = ({ user }) => user;

export const selectOrderDetail = ({ orderDetail }) => orderDetail;

//селектор которые испольщуют find возвращают новый объект каждый раз, когда он вызывается, потому что каждый вызов find создает новый объект в памяти, даже если состояние Redux не изменилось.
//Это приводит к повторным рендерам компонентов. Поэтому я кеширую состояние
export const selectSelectedCarGroup = createSelector(
	(state) => state.carGroups,
	(carGroups) => carGroups.find((carGroup) => carGroup.isSelect) || {},
);

export const selectSelectedWheelSize = createSelector(
	(state) => state.wheelSizes,
	(wheelSizes) => wheelSizes.find((wheelSize) => wheelSize.isSelect) || {},
);

export const selectSelectedContractor = createSelector(
	(state) => state.contractors,
	(contractors) =>
		contractors.find((contractor) => contractor.isSelect) || {},
);

export const selectSelectedCar = createSelector(
	(state) => state.cars,
	(cars) => cars.find((car) => car.isSelect) || {},
);
