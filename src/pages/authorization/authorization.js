import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { ACTION_TYPE } from "../../actions";
import { getUserLogin } from "../../api/get-user";
import styles from "./authorization.module.css";
import { useState } from "react";

const authFormSchema = yup.object().shape({
	login: yup
		.string()
		.required("Заполните логин")
		.matches(
			/^\w+$/,
			"Неверно заполнен логин. Допускаются только буквы и цифры",
		)
		.min(3, "Неверно заполнен логин. Минимум 3 символа")
		.max(15, "Неверно заполнен логин. Максимум 15 символов"),
	password: yup
		.string()
		.required("Заполните пароль")
		.matches(
			/[!@#$%^&*]/,
			"Неверно заполнен пароль. Необходимо наличие специального символа !@#$%^&*",
		)
		.min(6, "Неверно заполнен пароль. Минимум 3 символа")
		.max(30, "Неверно заполнен пароль. Максимум 30 символов"),
});
export const Authorization = () => {
	const [serverError, setServerError] = useState(null);
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: { login: "", password: "" },
		resolver: yupResolver(authFormSchema),
		mode: "all",
	});

	const onSubmit = (data) => {
		// Обработка отправки данных формы
		dispatch({ type: ACTION_TYPE.LOADING_START });
		getUserLogin(data)
			.then((response) => {
				if (!response) {
					// Если статус не в диапазоне 200-299, считаем это ошибкой
					setServerError(`Ошибка: ${response.error}`);
					return;
				}
				localStorage.setItem("userLogin", response.userLogin);
				localStorage.setItem("userRole", response.userRole);
				localStorage.setItem("userSessionKey", response.userSessionKey);
				dispatch({ type: ACTION_TYPE.SET_USER, payload: response });
			})
			.catch((error) => {
				setServerError(`Ошибка: ${error}`);
			})
			.finally(() => dispatch({ type: ACTION_TYPE.LOADING_END }));
	};
	const errorMassege = errors.login?.message || serverError;
	return (
		<div className={styles.content}>
			<div className={styles.wrapper}>
				<h2 className={styles.nameForm}>Авторизация</h2>
				<form
					className={styles.authForm}
					onSubmit={handleSubmit(onSubmit)}
				>
					<div>
						<label>Логин:</label>
						<div className={styles.authInput}>
							<i className="bx bx-user"></i>
							<input
								type="text"
								placeholder="Логин..."
								{...register("login")}
								onChange={() => setServerError(null)}
							/>
						</div>
						<div className={styles.formErr}>
							{errorMassege && errorMassege}
						</div>
					</div>
					<div>
						<label>Пароль:</label>
						<div className={styles.authInput}>
							<i className="bx bx-lock-alt"></i>
							<input
								type="password"
								placeholder="Пароль..."
								{...register("password")}
								onChange={() => setServerError(null)}
							/>
						</div>
						<div className={styles.formErr}>
							{errors.password?.message}
						</div>
					</div>
					<button className={styles.btn} type="submit">
						Войти
					</button>
				</form>
			</div>
			<Link to="/registration" className={styles.optionIcon}>
				регистрация
			</Link>
		</div>
	);
};
