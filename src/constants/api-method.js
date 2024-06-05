//export const API_URL = "http://192.168.0.5:5000";
export const API_URL = "http://aamrzv.ru:5000";

export const API_METHOD = {
	PRICES: "/get_prices?",
	DIMENSIONS: "/get?dimension=",
	CREATE_ORDER: "/insert_order",
	USER_LOGIN: "/login",
	CHECK_USER_SESSION: "/check_user_session",
	GET_ORDERS_GROUP_LIST: "/get_orders_group_list",
	GET_ORDERS_LIST: "/get_orders_list",
	GET_ORDER_DETAIL: "/get_order_detail",
};

export const DIMENSIONS_NAME = {
	SETVICES: "services",
	WHEEL_SIZES: "wheel_sizes",
	CAR_GROUPS: "car_groups",
	CAR: "cars",
	CONTRACTORS: "contractors",
};
