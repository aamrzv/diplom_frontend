import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { thunk } from "redux-thunk";
import {
	wheelSizesReducer,
	appReducer,
	carGroupsReducer,
	servicesReducer,
	pricesReducer,
	contractorsReducer,
	carsReducer,
	userReducer,
	orderReducer,
} from "./reducers";

const reducer = combineReducers({
	user: userReducer,
	cars: carsReducer,
	prices: pricesReducer,
	services: servicesReducer,
	contractors: contractorsReducer,
	carGroups: carGroupsReducer,
	wheelSizes: wheelSizesReducer,
	orderDetail: orderReducer,
	appOptions: appReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
	reducer,
	composeEnhancers(applyMiddleware(thunk)),
);
