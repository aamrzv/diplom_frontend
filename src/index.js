import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "./assets/boxicons-2.1.4/css/boxicons.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
);
