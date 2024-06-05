import React, { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "./components/loader/loader";
import { readDimensionsAsync, readPricesAsync, ACTION_TYPE } from "./actions";
import { DIMENSIONS_NAME } from "./constants";
import { Routes, Route } from "react-router-dom";
import {
	Main,
	Shinomontazh,
	Orders,
	OrderCreater,
	OrdersList,
	Authorization,
} from "./pages";
import { Header, Menu, Footer, Modal } from "./components";
import styles from "./App.module.css";
import { checkUserSessionAsync } from "./actions/check-user-session-async";
import { selectIsLoading } from "./selectors";

export const App = () => {
	const isLoading = useSelector(selectIsLoading);
	const dispatch = useDispatch();
	useLayoutEffect(() => {
		dispatch(checkUserSessionAsync());
	}, [dispatch]);

	useEffect(() => {
		const dimensionsToLoad = [
			{
				name: DIMENSIONS_NAME.CAR_GROUPS,
				actionType: ACTION_TYPE.SET_CAR_GROUPS,
			},
			{
				name: DIMENSIONS_NAME.WHEEL_SIZES,
				actionType: ACTION_TYPE.SET_WHEEL_SIZES,
			},
			{
				name: DIMENSIONS_NAME.SETVICES,
				actionType: ACTION_TYPE.SET_SERVICES,
			},
			{
				name: DIMENSIONS_NAME.CONTRACTORS,
				actionType: ACTION_TYPE.SET_CONTRACTORS,
			},
			{
				name: DIMENSIONS_NAME.CAR,
				actionType: ACTION_TYPE.SET_CARS,
			},
		];
		// Диспетчеризация асинхронных вызовов для каждого измерения
		dimensionsToLoad.forEach(({ name, actionType }) => {
			dispatch(readDimensionsAsync(name, actionType));
		});
		dispatch(readPricesAsync(ACTION_TYPE.SET_PRICES, ""));
	}, [dispatch]);
	return (
		<div className={styles.App}>
			{isLoading && <Loader />}
			<Header></Header>
			<Routes>
				<Route path="/" element={<Main />}></Route>
				<Route path="/orders" element={<Orders />}></Route>
				<Route path="/orders/create" element={<OrderCreater />} />
				<Route
					path="/orders/contractor/:contractorId"
					element={<OrdersList />}
				></Route>
				<Route
					path="/authorization"
					element={<Authorization />}
				></Route>
				<Route path="/tyre_service" element={<Shinomontazh />}></Route>
				<Route
					path="/oil_сhange"
					element={<Loader> Замена масла</Loader>}
				></Route>
				<Route
					path="/brake_pads"
					element={<div> Замена колодок</div>}
				></Route>
				<Route
					path="/rim_repair"
					element={<div> Ремонт дисков</div>}
				></Route>
				<Route
					path="/chassis_repair"
					element={<div>Ремонт ходовой</div>}
				></Route>
			</Routes>
			<Menu />
			<Footer />
			<Modal />
		</div>
	);
};
